window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function () {

	var options = {
		slidesToScroll: 1,
		slidesToShow: 2,
		loop: true,
		infinite: false,
		autoplay: true,
		autoplaySpeed: 8000,
	}

	var options2 = {
		slidesToScroll: 1,
		slidesToShow: 1,
		loop: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
	}

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
var originalGenImage
let canvasList = [];
function addBackroundLayer() {
	createLayer("Layer 0");
}
function createThumbnail(index, layerno) {
	const layerThumbnail = document.createElement('div');
	layerThumbnail.id = 'layerThumbnail' + index;
	layerThumbnail.className = 'layerThumbnail';
	let thumbnailContent2 = document.getElementById(index + "Image");
	if (thumbnailContent2 == null || index == "Layer0") {
		thumbnailContent2 = document.getElementById("image-container-gen-image");
	}
	else if (thumbnailContent2.src == "") {
		thumbnailContent2 = document.getElementById("image-container-gen-image");
	}

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	canvas.width = 50;
	canvas.height = 50;
	const image = new Image();
	image.src = thumbnailContent2.src;
	context.drawImage(image, 0, 0, 50, 50);
	layerThumbnail.innerHTML = `<img src="${canvas.toDataURL()}" width="50" height="50" alt="Thumbnail">`;
	layerThumbnailList[index] = layerThumbnail;
	return layerThumbnail;
}


function createRegenParams(panel) {

	index = panel.id;

	table = document.getElementById(index + "Table");
	if (table == null) {
		if (index == 'Layer1') {
			table = table1backup;
		}
		else if (index == 'Layer2') {
			table = table2backup;
		}
		else if (index == 'Layer3') {
			table = table3backup;
		}
	}
	table.style.display = 'flex';
	container = table;
	panel.appendChild(container);

}

function hideLayer(panelId) {
	const layerList = document.getElementById("layerList").children;
	tempLayerList = Array.from(layerList)
	newtemplist = layers.slice()
	button = document.getElementById("hideLayer" + panelId + "Square");
	if (button.innerHTML === '<i id="eyeIcon" class="fa-regular fa-eye-slash"></i>') {
		button.innerHTML = '<i id="eyeIcon" class="fa-regular fa-eye"></i>';

	}
	else {
		button.innerHTML = '<i id="eyeIcon" class="fa-regular fa-eye-slash"></i>';
	}
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active") {
			selectedLayer = tempLayerList[i].id;
			selectLayerSqare = selectedLayer + "Square"
			lastLayer = newtemplist[Object.keys(newtemplist)[1]].id

			break
		}
	}
	image = document.getElementById(panelId + "Image");

	if (button.innerHTML === '<i id="eyeIcon" class="fa-regular fa-eye-slash"></i>') {
		image.style.display = 'none'

	}
	else {
		image.style.display = 'block'
	}

}

function handleLayer0Down() {
	imagecont = document.getElementById('image-container');
	layer1 = document.getElementById("Layer1Image");
	layer2 = document.getElementById("Layer2Image");
	layer3 = document.getElementById("Layer3Image");
	layer1.style.display = 'none'
	layer2.style.display = 'none'
	layer3.style.display = 'none'

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
			if (sectionId == "Layer1" && cellList[sectionId] == null) {
				showPopUp('selectAPromptPopUp');
			}
			panel.style.maxHeight = panel.scrollHeight + "px";
			acc.classList.add('regenerate-animation');
			imageContainer = document.getElementById("image-container");
			if (sectionId == "Layer1") {
				canvas = document.getElementById("canvas1");
			}
			else if (sectionId == "Layer2") {
				canvas = document.getElementById("canvas2");
			}
			else if (sectionId == "Layer3") {
				canvas = document.getElementById("canvas3");
			}
			mask = document.getElementById("mask");

			image = document.getElementById("image-container-gen-image");

			imageContainer.insertBefore(mask, imageContainer.firstChild);
			mask.src = canvas.src;
			mask.width = image.width;
			mask.height = image.height;
			mask.style.display = 'block';
			mask.style.position = 'absolute';
			mask.style.zIndex = '1';
			mask.style.opacity = "0.5";
			mask.style.width = image.style.width;
			mask.style.height = image.style.height;

		}
	}
	const layerList = document.getElementById("layerList").children;
	tempLayerList = Array.from(layerList)
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active") {
			selectedLayer = tempLayerList[i].id;
			selectLayerSqare = selectedLayer + "Square"
			document.getElementById(selectLayerSqare).classList.add('regenerate-animation');
			break
		}

	}
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active" && tempLayerList[i].id != selectedLayer) {
			anime = document.getElementById(tempLayerList[i].id + 'Square')
			anime.classList.remove('regenerate-animation');

		};

	}

	imageContainer = document.getElementById("image-container");
	if (selectedLayer == "Layer1") {
		canvas = document.getElementById("canvas1");
	}
	else if (selectedLayer == "Layer2") {
		canvas = document.getElementById("canvas2");
	}
	else if (selectedLayer == "Layer3") {
		canvas = document.getElementById("canvas3");
	}
	mask = document.getElementById("mask");

	image = document.getElementById("image-container-gen-image");

	imageContainer.insertBefore(mask, imageContainer.firstChild);
	mask.src = canvas.src;
	mask.width = image.width;
	mask.height = image.height;

	mask.style.display = 'block';
	mask.style.position = 'absolute';
	mask.style.zIndex = '1';
	mask.style.opacity = "0.5";
	mask.style.width = image.style.width;
	mask.style.height = image.style.height;


}
function handleLayer0Up(imageElement) {

	imagecont = document.getElementById('image-container');
	layer1 = document.getElementById("Layer1Image");
	layer2 = document.getElementById("Layer2Image");
	layer3 = document.getElementById("Layer3Image");
	layer1.style.display = 'block'
	layer2.style.display = 'block'
	layer3.style.display = 'block'

}




function setupScrollOnImage(canvas, layerid) {
	if (!canvas) {
		console.error('Image element is null or undefined.');
		return;
	}

	let seed = document.getElementById("regenSeed" + layerid);


	handleWheelListener = event => handleWheel(event, seed, layerid);

	document.addEventListener('wheel', handleWheelListener, { passive: false });
	canvas.addEventListener('mouseenter', handleMouseEnter);
	canvas.addEventListener('mouseleave', handleMouseLeave);
}
let handleWheelListener;
function handleMouseEnter() {
	isOverImage = true;
	document.body.style.overflow = 'hidden';
	document.addEventListener('wheel', handleWheelListener, { passive: false });
}
function handleMouseLeave() {
	isOverImage = false;
	document.body.style.overflow = 'auto';
	document.removeEventListener('wheel', handleWheelListener);
}
let isOverImage = false;
let wheelTimeout = null;
cellList = []
function handleWheel(event) {

	if (isOverImage) {
		event.preventDefault();

		clearTimeout(wheelTimeout);
		const updateSeedValue = () => {
			const layerList = document.getElementById("layerList").children;
			tempLayerList = Array.from(layerList)
			for (var i = 0; i < tempLayerList.length; i++) {
				if (tempLayerList[i].classList == "panel active") {
					selectedLayer = tempLayerList[i].id;
					break
				}
			}
			seed = document.getElementById(selectedLayer + "Seed")
			var currentValue = parseInt(seed.value, 10);

			var delta = event.deltaY > 0 ? 1 : -1;
			var newValue = currentValue + delta;

			if (newValue > 4) {
				seed.value = 1;
			} else if (newValue < 1) {
				seed.value = 4;
			} else {
				seed.value = newValue;
			}

			var inputEvent = new Event('input');
			seed.dispatchEvent(inputEvent);
		}
		wheelTimeout = setTimeout(updateSeedValue, 100);
		cell = cellList[selectedLayer];
		if (cell == null) return
		editImage(cell);
	}
}

function increaseNumberOnSwipe() {
	imageElement = document.getElementById("image-container");
	let startX;

	imageElement.addEventListener('touchstart', function (event) {
		event.preventDefault();
		startX = event.touches[0].clientX;
	});

	imageElement.addEventListener('touchend', function (event) {
		clearTimeout(wheelTimeout);
		const updateSeedValue = () => {
			const layerList = document.getElementById("layerList").children;
			tempLayerList = Array.from(layerList)
			for (var i = 0; i < tempLayerList.length; i++) {
				if (tempLayerList[i].classList == "panel active") {
					selectedLayer = tempLayerList[i].id;
					break
				}
			}
			const endX = event.changedTouches[0].clientX;

			const deltaX = endX - startX;
			seed = document.getElementById(selectedLayer + "Seed")
			var currentValue = parseInt(seed.value, 10);
			var delta;
			if (deltaX > 50) {
				delta = 1;
			}
			else if (deltaX < -50) {
				delta = - 1;
			}
			else {
				return
			}
			var newValue = currentValue + delta;

			if (newValue > 4) {
				seed.value = 1;
			} else if (newValue < 1) {
				seed.value = 4;
			} else {
				seed.value = newValue;
			}
			var inputEvent = new Event('input');
			seed.dispatchEvent(inputEvent);
		}
		wheelTimeout = setTimeout(updateSeedValue, 100);
		cell = cellList[selectedLayer];
		if (cell == null) return
		editImage(cell);
	});
}




function updateLayerList() {
	const layerList = document.getElementById('layerList');
	layerList.innerHTML = '';

	layers.forEach((layer, index) => {
		layerList.appendChild(layer);
	});
}
function deleteLayer(index, panelId) {
	layerName = panelId.replace("Square", "");
	layers.splice(index, 2);
	layerimage = document.getElementById(layerName + "Image");
	layerimage.src = "";
	layerimage.style.display = 'none';

	table = document.getElementById(layerName + "Table");
	if (layerName == "Layer1") {
		table1backup = table.cloneNode(true);
	}
	else if (layerName == "Layer2") {
		table2backup = table.cloneNode(true);
	}
	else if (layerName == "Layer3") {
		table3backup = table.cloneNode(true);
	}

	updateLayerList();

	const layerList = document.getElementById("layerList").children;
	tempLayerList = Array.from(layerList)
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active") {
			selectedLayer = tempLayerList[i].id;
			selectLayerSqare = selectedLayer + "Square"
			document.getElementById(selectLayerSqare).classList.add('regenerate-animation');
			break
		}

	}
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active" && tempLayerList[i].id != selectedLayer) {
			anime = document.getElementById(tempLayerList[i].id + 'Square')
			anime.classList.remove('regenerate-animation');

		};

	}

	imageContainer = document.getElementById("image-container");
	if (selectedLayer == "Layer1") {
		canvas = document.getElementById("canvas1");
	}
	else if (selectedLayer == "Layer2") {
		canvas = document.getElementById("canvas2");
	}
	else if (selectedLayer == "Layer3") {
		canvas = document.getElementById("canvas3");
	}
	mask = document.getElementById("mask");

	image = document.getElementById("image-container-gen-image");

	imageContainer.insertBefore(mask, imageContainer.firstChild);
	mask.src = canvas.src;
	mask.width = image.width;
	mask.height = image.height;

	mask.style.display = 'block';

	mask.style.position = 'absolute';
	mask.style.zIndex = '1';
	mask.style.opacity = "0.5";
	mask.style.width = image.style.width;
	mask.style.height = image.style.height;

}
function seedChanged() {
	const layerList = document.getElementById("layerList").children;
	tempLayerList = Array.from(layerList)
	for (var i = 0; i < tempLayerList.length; i++) {
		if (tempLayerList[i].classList == "panel active") {
			selectedLayer = tempLayerList[i].id;
			break
		}
	}
	seed = document.getElementById(selectedLayer + "Seed")

	var currentValue = parseInt(seed.value, 10);

	if (currentValue > 4) {
		seed.value = 1;
	} else if (currentValue < 1) {
		seed.value = 4;
	} else {
		seed.value = currentValue;
	}

	var inputEvent = new Event('input');
	seed.dispatchEvent(inputEvent);

	cell = cellList[selectedLayer];
	if (cell == null) return
	editImage(cell);
}
function createLayer(name = "") {
	beforeStarContainer = document.getElementById("beforeStarContainer");
	beforeStarContainer.style.display = 'none'
	const layerSquare = document.createElement("button");
	const imageContainer = document.getElementById("image-container");

	layerSquare.className = "accordion";
	layerSquare.className = "button-d"
	const panelDiv = document.createElement("div");
	panelDiv.className = "panel";



	alllayersCount += 1;
	if (alllayersCount > 3) {
		alert("In this demo, we only support up to 3 layers.")
		return
	}

	if (alllayersCount == 0) {
		addBackroundLayer();

	}

	layerSquare.cursor = 'pointer';
	layerSquare.style.display = 'flex';
	layerSquare.style.justifyContent = 'space-between';

	const layerNumber = document.createElement('div');
	layerNumber.className = 'layerNumber';

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
			seed = document.getElementById(panelDiv.id + "Seed");
			seed.addEventListener('change', seedChanged);
		};
	}

	layerSquare.style.width = '-webkit-fill-available';
	layerSquare.style.width = '-moz-available';
	layerSquare.style.height = '60px';
	layerSquare.style.marginTop = '7px';
	layerSquare.style.transition = 'all 0.1s ease';
	layerSquare.style.alignItems = 'center';
	layerSquare.id = 'Layer' + layerno + "Square";
	layerThumbnail = createThumbnail(panelDiv.id, layerno);
	panelDiv.style.marginBottom = 'auto';

	const hideButton = createButtonPanel('<i id="eyeIcon" class="fa-regular fa-eye"></i>', 'hideLayer', layerSquare)
	hideButton.style.marginTop = '12px';
	hideButton.style.paddingRight = '10px';

	hideButton.onclick = function () {
		toggleAccordion(panelDiv.id);
		hideLayer(panelDiv.id);

	}
	const deleteButton = createButtonPanel('<i class="fa-duotone fa-trash aria-hidden="true">', 'deleteLayer', layerSquare)
	deleteButton.onclick = function () {
		const indexToDelete = layers.indexOf(layerSquare);
		deleteLayer(indexToDelete, layerSquare.id);
	};

	wrapper = document.createElement('div');
	if (layerSquare.id != 'Layer0Square') {
		wrapper.appendChild(hideButton);
	}
	else {
		layerThumbnail.style.marginLeft = "35px";
	}
	wrapper.appendChild(layerThumbnail);
	wrapper.style.display = 'flex';
	layerSquare.appendChild(wrapper);
	layerNumber.style.marginLeft = '-55px';
	layerSquare.appendChild(layerNumber);
	layerSquare.appendChild(deleteButton);
	if (layerSquare.id != 'Layer0Square') {
		createRegenParams(panelDiv);
	}
	layers.unshift(panelDiv);
	layers.unshift(layerSquare);


	updateLayerList();
	if (layerno == 1) {
		originalGenImage = document.getElementById("image-container-gen-image");
		buttonElement = document.getElementById("Layer0Square");
		buttonElement.addEventListener("mousedown", handleLayer0Down);
		buttonElement.addEventListener("touchstart", handleLayer0Down);
		buttonElement.addEventListener("mouseup", handleLayer0Up);
		buttonElement.addEventListener("touchend", handleLayer0Up);
		showPopUp("openLayer1PopUp");

	}
	if (layers.length > 2) {
		lastLayer = layers[layers.length - 3].id;
	}
	inputImage = document.getElementById("image-container-gen-image");
	imageContainer.addEventListener('mouseenter', handleMouseEnter);
	imageContainer.addEventListener('mouseleave', handleMouseLeave);
	handleWheelListener = event => handleWheel(event);
	increaseNumberOnSwipe();


	document.addEventListener('wheel', handleWheelListener, { passive: false });

}
firstEdit = true;
function editImage(cell) {
	if (firstEdit) {
		showPopUp('scrollPopup');
		firstEdit = false;
	}
	if (cell == null) return
	layerid = cell.id.replace("P", "");
	cell.classList.add("clickedcell");
	if (cellList[layerid] != cell) {
		if (cellList[layerid] != null) {
			cellList[layerid].classList.remove("clickedcell");
		}
		cell.classList.add("clickedcell");
	}

	cellList[layerid] = cell;
	imageContainer = document.getElementById("image-container");
	image = document.getElementById(layerid.substring(0, 6) + "Image");

	seed = document.getElementById(layerid + "Seed").value;
	imageName = cell.innerText + seed + ".png";
	orgImage = document.getElementById("image-container-gen-image");
	image.src = "static/demo/" + imageName;
	image.style.display = "block";
	image.style.position = "absolute";
	mask = document.getElementById("mask");
	mask.style.display = "none";
	updateThumbnail(layerid);
}
function updateThumbnail(index) {
	layerThumbnail = document.getElementById('layerThumbnail' + index);
	let thumbnailContent2 = document.getElementById(index + "Image");
	if (thumbnailContent2 == null || index == "Layer0") {
		thumbnailContent2 = document.getElementById("image-container-gen-image");
	}
	else if (thumbnailContent2.src == "") {
		thumbnailContent2 = document.getElementById("image-container-gen-image");
	}

	image2 = document.getElementById('mask')
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	canvas.width = 50;
	canvas.height = 50;

	const image = new Image();
	image.src = thumbnailContent2.src;
	image.onload = function () {
		if (index == "Layer1") {
			context.drawImage(image, 200 * 50 / 512, 0, 160 * 50 / 512, 50);
		}
		else if (index == "Layer2") {
			context.drawImage(image, 0, 0, 200 * 50 / 512, 50);
		}
		else if (index == "Layer3") {
			context.drawImage(image, 360 * 50 / 512, 0, 152 * 50 / 512, 50);
		}

		context.globalCompositeOperation = 'destination-in';
		context.drawImage(mask, 0, 0, 50, 50);
		context.drawImage(image2, 0, 0, 50, 50);
		layerThumbnail.innerHTML = `<img src="${canvas.toDataURL()}" width="50" height="50" alt="Thumbnail">`;
		layerThumbnailList[index] = layerThumbnail;
	}
}

function createButtonPanel(text, id, layerSquare) {
	const deleteButton = document.createElement('div');
	deleteButton.className = id;
	deleteButton.innerHTML = text; // Bin icon
	deleteButton.style.fontSize = '1.3rem';
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
let table1backup
let table2backup
let table3backup
function deleteAllLayers() {
	canvasList = [];
	layers = [];
	firstEdit = true;
	for (cell in cellList) {
		cellList[cell].classList.remove("clickedcell");
	}
	cellList = [];
	alllayersCount = -1;
	table1 = document.getElementById("Layer1Table");
	if (table1 != null) {
		table1backup = table1.cloneNode(true);
	}

	table2 = document.getElementById("Layer2Table");
	if (table2 != null) {
		table2backup = table2.cloneNode(true);
	}

	table3 = document.getElementById("Layer3Table");
	if (table3 != null) {
		table3backup = table3.cloneNode(true);
	}
	mask = document.getElementById("mask");
	mask.style.display = 'none';
	const layerList = document.getElementById('layerList');
	layerList.innerHTML = '';

	layers.forEach((layer, index) => {
		layerList.appendChild(layer);
	});

	layer1 = document.getElementById("Layer1Image");
	layer2 = document.getElementById("Layer2Image");
	layer3 = document.getElementById("Layer3Image");
	layer1.src = "";
	layer2.src = "";
	layer3.src = "";
	layer1.style.display = 'none';
	layer2.style.display = 'none';
	layer3.style.display = 'none';
}
function showPopUp(popupname) {

	const popup = document.getElementById(popupname);

	// Show popup
	setTimeout(function () {
		popup.classList.add('active');
	}, 500);

	// Stop flashing after 5 seconds
	setTimeout(function () {
		popup.classList.remove('active');
	}, 5000); //
}