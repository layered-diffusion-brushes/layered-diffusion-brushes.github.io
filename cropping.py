from PIL import Image
name = "lake.png"
image = Image.open("./static/images/"+name)
cropped = image.crop((0,0,180,512))
cropped.save("./static/demo/"+name)

name = "tower.png"
image = Image.open("./static/images/"+name)
cropped = image.crop((0,0,200,512))
cropped.save("./static/demo/"+name)



name = "palm4.png"
image = Image.open("./static/images/"+name)
cropped = image.crop((360,0,512,512))
cropped.save("./static/demo/"+name)