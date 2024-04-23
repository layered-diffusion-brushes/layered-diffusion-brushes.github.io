window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 2,
			loop: true,
			infinite: false,
			autoplay: true,
			autoplaySpeed: 5000,
    }
	
    var options2 = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
}

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

	var carousels2 = bulmaCarousel.attach('.carousel2', options2);
	
    bulmaSlider.attach();

})

let layers = [];
let displayImageList = [];
layerThumbnailList = [];
let alllayersCount = -1;
var selectedLayer = "Layer0";
var lastLayer = "Layer0";
let displayImageList2 = [];
var originalGenImage
function addBackroundLayer() {
	createLayer("Layer 0");
}
function createThumbnail(index, layerno) {
	const layerThumbnail = document.createElement('div');
	layerThumbnail.id = 'layerThumbnail'+index;
	layerThumbnail.className = 'layerThumbnail';
	const thumbnailContent = document.getElementById("image-container-gen-image");

	// Create a temporary canvas for resizing the image
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	// Set the canvas dimensions to the desired thumbnail size
	canvas.width = 50;
	canvas.height = 50;

	// Create an image object with the thumbnail content
	const image = new Image();
	image.src = thumbnailContent.src;
	// displayImageList[index] = image;

	// Draw and resize the image on the canvas
	context.drawImage(image, 0, 0, 50, 50);
	// Set the layerThumbnail content to be the resized image
	layerThumbnail.innerHTML = `<img src="${canvas.toDataURL()}" width="50" height="50" alt="Thumbnail">`;
	layerThumbnailList[index] = layerThumbnail;
	return layerThumbnail;
}

function createDisplayImage(index) {
	const layerThumbnail = document.createElement('div');
	const thumbnailContent = document.getElementById("image-container-gen-image");

	// Create a temporary canvas for resizing the image
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	// Set the canvas dimensions to the desired thumbnail size
	canvas.width = thumbnailContent.width;
	canvas.height = thumbnailContent.height;

	// Create an image object with the thumbnail content
	const image = new Image();
	image.src = thumbnailContent.src;
	// displayImageList[index] = image;

	// Draw and resize the image on the canvas
	context.drawImage(image, 0, 0);
	// Set the layerThumbnail content to be the resized image
	layerThumbnail.innerHTML = `<img src="${canvas.toDataURL()}">`;
	// displayImageList2[index] = new Image();
	displayImageList2[index]= canvas.toDataURL();
	return layerThumbnail;
}
function createRegenParams(panel) {

	index = panel.id;
	// Create the main container div
	const container = document.createElement('div');
	container.className = 'box';
	container.style = 'display: flex; flex-direction: column;';
	const regenSeedContainer = document.createElement('div');
	regenSeedContainer.id = 'regenSeedContainer' + index;
	regenSeedContainer.style = 'display: flex; flex-direction: row; align-items: center;';

	const regenGuidanceContainer = document.createElement('div');
	regenGuidanceContainer.id = 'regenGuidanceContainer' + index;
	regenGuidanceContainer.style = 'display: flex; flex-direction: row; align-items: center;';
	const regenStrengthContainer = document.createElement('div');
	regenStrengthContainer.id = 'regenStrengthContainer' + index;
	regenStrengthContainer.style = 'display: flex; flex-direction: row; align-items: center;';
	const radiusContainer = document.createElement('div');
	radiusContainer.id = 'radiusContainer' + index;
	radiusContainer.style = 'display: flex; flex-direction: row; align-items: center;';
	const regenPromptContainer = document.createElement('div');
	regenPromptContainer.id = 'regenPromptContainer' + index;
	regenPromptContainer.style = 'display: flex; flex-direction: row; align-items: center;';
	const maskContainer = document.createElement('div');
	maskContainer.id = 'maskContainer' + index;
	maskContainer.style = 'display: flex; flex-direction: row; align-items: center;';

	rsvalue = 8;
	// Array of input details
	const inputDetails = [
		{ label: 'Regen Prompt', type: 'text', id: 'regenPrompt', placeholder: 'Regen prompt' },
		{ label: 'Negative Prompt', type: 'text', id: 'negativePrompt', placeholder: 'Negative prompt' },
		{ label: 'Regen Seed', type: 'number', id: 'regenSeed', value: '-1'},
		{ label: 'Regen Steps', type: 'number', id: 'regenSteps', value: rsvalue },
		{ label: 'Guidance Scale', type: 'range', id: 'regenGuidanceScale', min: '0', max: '10', step: '0.01', value: '6.0' },
		{ label: '', type: 'number', id: 'regenGuidanceValue', min: '0', max: '10', step: '0.01', value: '6.0' },
		{ label: 'Brush Hardness', type: 'range', id: 'regenStrengthScale', min: '0', max: '100.0', step: '0.01', value: '50' },
		{ label: '', type: 'number', id: 'regenStrengthValue', step: '0.01', min: '0', max: '100.0', value: '50' },
		{ label: 'Brush Size', type: 'range', id: 'radiusScale', min: '0', max: '300', step: '1', value: '64' },
		{ label: '', type: 'number', id: 'radiusValue', step: '1', min: '0', max: '150', value: '64' },
		{ label: 'Use Custom Mask', type: 'checkbox', id: 'useCostumeMask' },
		{ label: 'Regen Use Attention', type: 'checkbox', id: 'regenUseAttention' }
	];

	// Iterate through inputDetails and create corresponding HTML elements
	// Iterate through inputDetails and create corresponding HTML elements
	inputDetails.forEach(({ label, type, id, min, max, step, value, placeholder }) => {
		const inputContainer = document.createElement('div');
		// inputContainer.className = 'box';

		// Set display to flex with row direction
		inputContainer.style = 'display: flex; flex-direction: row; align-items: center;';

		const inputLabel = document.createElement('label');
		inputLabel.setAttribute('for', `${id}${index}`);
		// Check if the label is for "Negative Prompt"
		if (label === 'Negative Prompt') {
			const icon = document.createElement('i');
			icon.classList.add('fa-regular', 'fa-message-minus', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
		}
		else if (label === 'Regen Prompt') {
			const icon = document.createElement('i');
			icon.classList.add('fa-regular', 'fa-message-plus', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
		}
		else if (label === 'Regen Seed') {
			const icon = document.createElement('i');
			icon.classList.add('fa-regular', 'fa-seedling', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
			inputLabel.style.width = "auto";
		}
		else if (label === 'Regen Steps') {
			const icon = document.createElement('i');
			icon.classList.add('fa-regular', 'fa-rotate-right', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
			inputLabel.style.float = 'left';
		}
		else if (label === 'Guidance Scale') {
			const icon = document.createElement('i');
			icon.classList.add('fa-regular', 'fa-scale-unbalanced', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
		}
		else if (label === 'Brush Hardness') {
			const icon = document.createElement('i');
			icon.classList.add('fa-regular', 'fa-weight-scale', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
		}
		else if (label === 'Brush Size') {
			const icon = document.createElement('i');
			icon.classList.add('fa-solid', 'fa-circle', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
		}
		else if (label === 'Use Custom Mask') {
			const icon = document.createElement('i');
			icon.classList.add('fa-regular', 'fa-mask', 'fa-lg');
			icon.style = 'margin-right: 5px;';
			inputLabel.appendChild(icon);
			inputLabel.appendChild(document.createTextNode(' '));
		}

// Set the label text
inputLabel.appendChild(document.createTextNode(label));

		const inputElement = document.createElement(type === 'checkbox' ? 'input' : 'input');
		inputElement.type = type;
		inputElement.id = `${id}${index}`;
		if (id == 'regenUseAttention') {
			inputContainer.style.display = 'none';
		}
		if (type !== 'checkbox') {
			// if (id !=="regenSeed"){
			inputElement.min = min;
			inputElement.max = max;
			inputElement.step = step;
			inputElement.placeholder = placeholder;
			// }
			if (type != 'text') {
				inputElement.value = value;
			}
			
			if (type === 'range') {
				inputElement.oninput = function () {
					updateSliderValue(this.value, this.id);
				};
			} else if (type === 'number') {
				inputElement.oninput = function () {
					updateSlider(this.value, `${id}${index}`);
				};
			}
			if (id == "radiusScale") {
				inputElement.oninput = function () {
					updateSliderValue(this.value, this.id);
					circle.style.width = this.value + "px";
					circle.style.height = this.value + "px";
					circle_slider = updateCircleSlider(this.value);
					circle_slider.style.width = this.value + "px";
					circle_slider.style.height =  this.value + "px";
					clearTimeout(timeout);
					timeout = setTimeout(function () {
					circle_slider.style.display = "none";
				}, 500);
				};
				// inputElement.onblur = function () {
				// // Hide the slider when the input is done (on blur)
				// circle_slider = document.querySelector(".circle_slider");
				// circle_slider.style.display = 'none';
				// };

			}
		}
		else {
			if (id === 'regenUseAttention') {
				inputElement.style.visibility = 'hidden';
			inputLabel.style.visibility = 'hidden';
			}
			else{
				inputElement.onchange = function () {
					id = inputElement.id.replace("useCostumeMask", "");
					if (inputElement.checked) {
						inputElement.value = "true";
						addCanvas(id);
					}
					else {
						inputElement.value = "false";
						removeCanvas(id);
						// canvas.removeEventListener('mouseenter', handleMouseEnter);
						// canvas.removeEventListener('mouseleave', handleMouseLeave);

	
					}
				};
			}
			
		}
		if (id === 'negativePrompt' || id === 'regenPrompt') {
			inputElement.style = 'float: left';
		}
		// Append the label and input to the inputContainer
		inputContainer.appendChild(inputLabel);
		inputContainer.appendChild(inputElement);
		// Append the inputContainer to the main container
		if (id === 'regenSeed' || id === 'regenPrompt') {
			// Append Regen Seed and Number of Regen Steps to the special container
			if (id === 'regenSeed') {
				inputElement.style = 'padding-right: 2px; padding-left: 1em;';
			}
			if (id === 'regenPrompt') {
			inputContainer.style = 'margin-right: auto; float: left;';
			}
			else{
				reuseButton = createLayersButton("reuseButton", index, reuseSeed, "regenSeed", "fa fa-recycle");
				reuseButton.style.marginRight = "0.7em";
				// reuseButton = createReuseButton(index)
				// randomizeButton = createRandomizeButton(index)
				randomizeButton = createLayersButton("Randomize", index, randomizeSeedRegen, "regenSeed", "fa-duotone fa-dice fa-lg");
				// reuseSeed = inputContainer.children[1];

				inputContainer.appendChild(reuseButton);
				inputContainer.appendChild(randomizeButton);
				// inputContainer.insertBefore(reuseButton, inputContainer.children[1]);
				// inputContainer.insertBefore(randomizeButton, inputContainer.children[1])
				// inputContainer.children[3].style.width = "8.6em";
				inputContainer.style = "margin-left:auto; float:right; padding:0em";
				
			}

			regenSeedContainer.appendChild(inputContainer);
			// regenSeedContainer.style = "padding-top: 0.5em;"
		}
		else if (id === 'regenGuidanceScale' || id === 'regenGuidanceValue') {
			if (id == "regenGuidanceValue") {
				inputContainer.removeChild(inputLabel);
				inputContainer.style = 'padding-left: 15px; margin-left: auto;'
			}
			else {
				inputContainer.style = 'margin-right: auto;'
			}
			regenGuidanceContainer.appendChild(inputContainer);
		}
		else if (id === 'regenStrengthScale' || id === 'regenStrengthValue') {
			if (id == "regenStrengthValue") {
				inputContainer.removeChild(inputLabel);
				inputContainer.style = 'padding-left: 15px; margin-left: auto;'
			}
			else {
				inputContainer.style = 'margin-right: auto;'
			}
			
			regenStrengthContainer.appendChild(inputContainer);
		}
		else if (id === 'radiusScale' || id === 'radiusValue') {
			if (id == "radiusValue") {
				inputContainer.removeChild(inputLabel);
				inputContainer.style = 'padding-left: 15px;margin-left: auto;'
				// sqaureButton= createLayersButton("squareButton", index, selectMaskShape, "regenSeed", "fa-regular fa-square");
				// circleButton = createLayersButton("circleButton", index, selectMaskShape, "regenSeed", "fa-regular fa-circle");
				// // reuseSeed = inputContainer.children[1];

				// inputContainer.appendChild(sqaureButton);
				// inputContainer.appendChild(circleButton);
			}
			else {
				inputContainer.style = 'margin-right: auto;'
			}
			radiusContainer.appendChild(inputContainer);
			
		}
		else if (id === 'regenSteps' || id === 'negativePrompt') {
			if (id == "negativePrompt") {
				inputContainer.style = 'margin-right: auto; float: left;';
			}
		else if (id == "regenSteps") {
				inputContainer.style = 'margin-left: auto; float: right; padding = 0em';
			}

			// regenPromptContainer.style = 'display: flex; flex-direction: row; align-items: center; margin-top: 10px;';
			regenPromptContainer.appendChild(inputContainer);
		}
		else {
			if (id != "useCostumeMask") {
				container.appendChild(inputContainer);
			}
			else {
				maskContainer.appendChild(inputContainer);
			}

		}
	});
	// regenPromptContainer.style = "margin-bottom: 0.5em;";
	// regenGuidanceContainer.style = "margin-top: 0.5em;";
	regenSeedContainer.firstChild.style.width = "55%";
	regenPromptContainer.firstChild.style.width = "55%";
	regenSeedContainer.lastChild.style.width = "45%";
	regenPromptContainer.lastChild.style.width = "45%";


	container.appendChild(regenSeedContainer);
	container.appendChild(regenPromptContainer);
	container.appendChild(regenGuidanceContainer);
	container.appendChild(regenStrengthContainer);
	container.appendChild(radiusContainer);
	// container.appendChild(reuseButton);
	container.appendChild(maskContainer);

	// Append the main container to the body or another parent element
	panel.appendChild(container);

}
function handleLayer0Down() {
	imagecont = document.getElementById('image-container');
	originalCanvas = imagecont.querySelector("canvas");
//             if (originalCanvas != null) {
//                 clonedCanvas = originalCanvas.cloneNode(true);
//             if (originalCanvas.getContext) {
//                 var originalContext = originalCanvas.getContext('2d');
//                 var clonedContext = clonedCanvas.getContext('2d');
//                 // Copy the state of the context
//                 clonedContext.drawImage(originalCanvas, 0, 0);
// }
	// }

	imageElement = document.getElementById('image-container-gen-image');
	imageElement.src = originalGenImage.src;
}
function toggleAccordion(sectionId) {
	var panel = document.getElementById(sectionId);
	var acc = document.getElementById(sectionId + "Square");
	if (panel.childNodes.length > 0) {
		panel.classList.toggle("active");
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
			acc.classList.remove('regenerate-animation');
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
			acc.classList.add('regenerate-animation');
		}
		circle.style.width = document.querySelector("#radiusScale" + panel.id).value + "px";
		circle.style.height = document.querySelector("#radiusScale" + panel.id).value + "px";
		// acc.classList.add('regenerate-animation');
	}
	const layerList = document.getElementById("layerList").children;
	tempLayerList = Array.from(layerList)
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active") {
			selectedLayer = tempLayerList[i].id;
			selectLayerSqare = selectedLayer + "Square"
			document.getElementById(selectLayerSqare).classList.add('regenerate-animation');
			maskCheck = document.getElementById("useCostumeMask" + selectedLayer);
			
			if (Object.keys(canvasList).length > 0 )
			{
				selectedLayerCanvas = document.getElementById("canvas"+selectedLayer);
				if (maskCheck.checked) {
					
					addCanvas(selectedLayer, toggle = true);
				}
				else{
					console.log("here")
					// imgContainer = document.getElementById("image-container");
					// canv = imgContainer.querySelector("canvas");
					// imgContainer.removeChild(canv);


					removeCanvas(selectedLayer, toggle = true);
				}
			}
			break
		}

	}
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active" && tempLayerList[i].id != selectedLayer) {
			anime = document.getElementById(tempLayerList[i].id + 'Square')
			anime.classList.remove('regenerate-animation');

		};

		}

	

}
function handleLayer0Up(imageElement) {

	// If the canvas has a context, clone it as well
	imagecont = document.getElementById('image-container');
	imageElement = document.getElementById('image-container-gen-image');
	imageElement.src = currentImage;
	// canvas = imagecont.querySelector("canvas");
	// if (canvas != null) {
	//     imagecont.removeChild(canvas);
	//     imagecont.insertBefore(clonedCanvas,imagecont.firstChild);
	// }
	// Append the cloned canvas to the container

}
function reuseSeed(id = "seed")
{
// Send the parameters to the WebSocket server
message = {
	type: "reuseSeed",
	id: id
}
if (isOpen(socket)) {
	socket.send(JSON.stringify(message));
}
else {
	console.log("socket not open")
}
console.log("reuse seed sent.")
}

function randomizeSeed(id){
	seedID = id.replace("Randomize", "");
	seed = document.getElementById(seedID);
	seed.value = -1;
	seed.innerHTML = -1;
}
function randomizeSeedRegen(id){
	// seedID = id.replace("Randomize", "");
	// seed = document.getElementById(seedID);
	// seed.value = -1;
	// seed.innerHTML = -1;
	message = {
	type: "randomizeRegenSeed",
	id: id
}
if (isOpen(socket)) {
	socket.send(JSON.stringify(message));
}
else {
	console.log("socket not open")
}
console.log("randomize seed sent.")

}

function createLayersButton(name, id, fToRun, inputTarget, iconName) {
	// Create button element
var button = document.createElement("button");
button.id = name+id;
button.className = "button-c";
button.style.float = "right";
button.style.marginRight = "0.1em";
button.style.width = "2.5em";
button.style.height = "2.5em";
button.style.textAlign = "center";
button.style.padding = "0px";
button.style.marginLeft = "0.5em";
button.onclick = function () {fToRun(inputTarget + id)};

// Create icon element
var icon = document.createElement("i");
icon.className = iconName;

// Append icon to button
button.appendChild(icon);
return button
}


function updateLayerList() {
	const layerList = document.getElementById('layerList');
	layerList.innerHTML = '';

	layers.forEach((layer, index) => {
		layerList.appendChild(layer);
	});
}
function createLayer(name = "") {
	
	
	const layerSquare = document.createElement("button");

	const imageContainer = document.getElementById("image-container");
	// canvas = imageContainer.querySelector("canvas");
	// if (canvas != null) {
	//     canvas.style.display = 'none';
	// }
	

	layerSquare.className = "accordion";
	layerSquare.className = "button-d"
	// layerSquare.textContent = "Section 1";
	// Create panel div
	const panelDiv = document.createElement("div");
	panelDiv.className = "panel";

	
	// Append paragraph to panel div


	alllayersCount += 1;
	if (alllayersCount == 0) {
		addBackroundLayer()
		// layer0Square = document.getElementById("Layer0Square");

	}

	layerSquare.cursor = 'pointer';
	layerSquare.style.display = 'flex';
	layerSquare.style.justifyContent = 'space-between';

	const layerNumber = document.createElement('div');
	layerNumber.className = 'layerNumber';
	// layers.length
	// layerNumber.innerText = ` ${layers.length + 1}`;

	// const layerText = document.createElement('div');
	if (layers.length == 0) {
		layerno = 0;
	}
	else {
		layerno = alllayersCount;
	}
	if (name == "") {
		layerNumber.innerText = `Layer ${layerno}`;
	}
	else {
		layerNumber.innerText = name;
	}
	panelDiv.id = "Layer" + layerno;
	if (panelDiv.id != 'Layer0') {
		layerSquare.onclick = function () {
		toggleAccordion(panelDiv.id);
	};
	}

	layerSquare.style.width = '-webkit-fill-available';
	layerSquare.style.width = '-moz-available';
	layerSquare.style.height = '60px';
	// layerSquare.style.marginBottom = '5px';
	layerSquare.style.marginTop = '7px';
	layerSquare.style.transition = 'all 0.1s ease';
	layerSquare.style.alignItems = 'center';
	layerSquare.id = 'Layer' + layerno + "Square";
	layerThumbnail = createThumbnail(panelDiv.id, layerno);
	createDisplayImage(selectedLayer);


	const hideButton = createButtonPanel('<i id="eyeIcon" class="fa-regular fa-eye"></i>', 'hideLayer', layerSquare)
	// hideButton.classList.add('fa-eye');
	hideButton.style.marginRight = '3px';
	hideButton.onclick = function () {
		if (hideButton.innerHTML === '<i id="eyeIcon" class="fa-regular fa-eye"></i>') {
			createDisplayImage(panelDiv.id);
		}
		toggleAccordion(panelDiv.id);
		hideLayer(panelDiv.id);
		
	}
	const deleteButton = createButtonPanel('<i class="fa-duotone fa-trash aria-hidden="true">', 'deleteLayer', layerSquare)
	deleteButton.onclick = function () {
		const indexToDelete = layers.indexOf(layerSquare);
		deleteLayer(indexToDelete, layerSquare.id);
		// event.stopPropagation(); // Prevent the layerSquare click event from firing
		// deleteLayer(currentLayerIndex);
	};


	// layerSquare.appendChild(layerText);
	wrapper = document.createElement('div');
	wrapper.appendChild(hideButton);
	wrapper.appendChild(layerThumbnail);
	wrapper.style.display = 'flex';
	layerSquare.appendChild(wrapper);
	// layerSquare.appendChild(hideButton);
	// layerSquare.appendChild(layerThumbnail);
	layerSquare.appendChild(layerNumber);
	// layerSquare.appendChild(accordion);
	layerSquare.appendChild(deleteButton);
	// layerSquare.appendChild(panelDiv);
	if (layerSquare.id != 'Layer0Square') {
		createRegenParams(panelDiv);
	}

	// panelDiv.appendChild(paragraph);
	// layerSquare.appendChild(button1)

	// layerSquare.onclick = function() {
	//     selectLayer(currentLayerIndex);
	//     // toggleAccordion(currentLayerIndex);
	// };
	layers.unshift(panelDiv);
	layers.unshift(layerSquare);


	updateLayerList();
	if (layerno == 1) {
		originalGenImage = document.getElementById("image-container-gen-image");
		buttonElement = document.getElementById("Layer0Square");
		buttonElement.addEventListener("mousedown", handleLayer0Down);
		buttonElement.addEventListener("mouseup", handleLayer0Up);
		// buttonElement.addEventListener("mouseout", handleLayer0Up);

	}
	if (layers.length > 2){
		lastLayer = layers[layers.length - 3].id;
	}
	

}
function createButtonPanel(text, id, layerSquare){
	const deleteButton = document.createElement('div');
	deleteButton.className = id;
	deleteButton.innerHTML = text; // Bin icon
	deleteButton.style.fontSize = '1.5rem';
	deleteButton.cursor = 'pointer';
	deleteButton.id = id + layerSquare.id;

	deleteButton.addEventListener("mouseover", function () {
		layerSquare.disabled = true;
	});
	deleteButton.addEventListener("mouseout", function () {
		layerSquare.disabled = false;
	});
	return deleteButton

}
