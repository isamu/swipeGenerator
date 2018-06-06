# SwipeGenerator to generate Swipe contents from Photoshop


# What is Swipe Contents?

Swipe Contents created by Swipe, a domain-specific, declarative language for non-developers written in JSON format to create media-rich/animated documents that contains photos, videos, images, vector graphics, animations, voices, music and sound effects.  Swipe Engine, an open-source, multi-media presentation language that presents Swipe files is available in various format, such as iOS, javascript and Android.  

- https://github.com/swipe-org/swipe (iOS)
- https://github.com/swipe-org/android (androin)
- https://github.com/isamu/swipejs (javascript)

You can create Swipe contents file by using Swipe Studio of iOS version, web version or by creating directly by JSON.

- https://studio.swipe.net/studio/#0 (Swipe Studio on Web)
- https://itunes.apple.com/us/app/swipe-studio/id1148461767 (Swipe Studio app)

## What is Generator of Photoshop
Generator of Photoshop is an environment for developers to expand Photoshop. Developers can add functions for Photoshop by programming. Precisely, by events, event, such as users’ action that activate the program written by node, by that program, read Photoshop data to generate files, This Generator is available from Photoshop version 14.1 and after.

# What is SwipeGenerator

SwipeGenerator is a function to generate Swipe file using Photoshop Generator. Using Photoshop layer, to create a page by layer group, assign each layer images as an element to generate Swipe file.

### Install
You can download Swipe Generator from below link:

https://github.com/isamu/swipeGenerator/archive/master.zip

Once you download the file, decompress it and to place that in the plugin directory of Photoshop.

In case of Mac,  /Applications/Adobe Photoshop CC 2018/Plug-ins/Generator.
Place decompressed SwipeGenerator folder in this folder. 
 
This is the end of the installation. 

![plugin directory](https://camo.qiitausercontent.com/d72907c16c232ccc144e45e9b7b8b5b8f327bf33/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f34616466326432612d643633632d333632372d386464632d3861376566623730616137302e706e67 "plugin directory")


## How to use 
Launch Photoshop. If you successfully install SwipeGenerator, 
You can find “Generator swipe” in the section of File -> Generate ->  
 
![Generator swipe](https://camo.qiitausercontent.com/c8348202623b8b3e53582606ef76e3fca3339805/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f66643362396162662d666236312d666137322d336531312d6535653662643063616263652e706e67 "Generator swipe")

Integrate multiple layers that contain images into one layer group. For this example, you can see each page layer group at pages group.
 
![layer example](https://camo.qiitausercontent.com/4d592140fd3ba99c5c6764e5141f27e1ffc46f3f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f35613333633438622d376665352d613931352d326366322d3538303730656431656535642e706e67 "layer example")


Select “Generate swipe” among the previous menu. Once you select it, Swipe file shall be generated immediately. You can find the same name folder with Photoshop file name on the desktop/home directory of your computer.

Among that, main.swipe is the swipe file. Once you open index.html on your browser, you can see the Swipe file contents. index.html is designed to read javascript version Swipe Engine, you can use that as your contents if you upload it to your HomePage or whatever. 
Place the generated contents on the web. 
http://to-kyo.to/~isamu/swipe_test/#0



# Create animation with Photoshop and SwipeGenerator 

##  Animate, enlarge and reduce images
With SwipeGenerator, you can animate, zoom-in/out and appear/hide images on the page to place the images in the inside of 2 layer groups. Please see below Swipe sample: 
http://to-kyo.to/~isamu/swipe_sample_move/

## Configuration of the layer
Below is the configuration of the layer for this Swipe. 

![Configuration of the layer](https://camo.qiitausercontent.com/82c6a9d4413de25dcf00c253d88a4e04f23c97eb/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f64626134346462622d383933642d636633652d626333642d3838656133356235623834352e706e67)


The first layer group is to collect pages, the second layer group is the each page. Each page contains images as a smart objects. 

## Image layout on the each page
The image layout of each page is as below. To explain simply, the background is in blue while that is actually transparent.

### 1
![layer 1](https://camo.qiitausercontent.com/cc51f2c03c5505e2f391f39a99017f6ce3936541/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f64613333306263302d353438362d336466332d613761632d6637396436376631363461312e6a706567)

### 2
![layer 1](https://camo.qiitausercontent.com/ea2c02065f14d0bdfecac0c229496c1c8733607d/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f35303735616237362d633532632d633365322d366466652d3863616634346263623239622e6a706567)

### 3
![layer 1](https://camo.qiitausercontent.com/ee1e864b19d286a9f21e33d9a06b4dfcc1605e50/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f65366130653137342d323862332d353263642d303933322d6137313164336138663737642e6a706567)

### 4 
![layer 1](https://camo.qiitausercontent.com/3e8c2db8c42920a28de9e08587e56481e44717a5/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f64646235373639342d373265352d656532342d653533392d3761633537663263363761622e6a706567)


Each images are placed as a smart object format. The smart objects on the same group page, if the id were the same, that is treated as the same images on the next page. Accordingly, the images may animate, zoom-in/out and appear/hide with changing the position, size at Swipe. For this purpose, for the above example, place the images on page 1. Then copy by the layer group to page 2 as to animate, resize on the page 2.


# Create animation with Photoshop and SwipeGenerator 2


## Swipe Property
Now you can assign Swipe property to page and the layer of images. Thanks to this, you may add animation, such as wiggle, make the image semitransparent. You may add effects during page transition with assign page property. 

Assign an image layer name as: 
```
loop:style:wiggle:count:3 opacity:0.9 repeat:false
```
Assign a page layer group name as:
```
transition:fadeIn play:scroll duration:0.2 repeat:true vibration:false
```

Then, that shall be reflected on the generating swipe file. Each element connected by : and property is separated by half size space. 

##Image (material) property 

### loop
To assign repeat animation- please see below:
loop:style:{style name }:count:{number}:{options_key}:{options_value} 

 - vibrate: vibrate it in right and left. You may set the length by setting delta. 

```
loop:style:vibrate:count:5:delta:10
```
- blink: To blink

```
 loop:style:blink:count:10
```

- wiggle: To swing. You may set the angle by setting delta.

```
 loop:style:blink:count:10:delta:30
```

- spin: To spin.

```
loop:syle:spin
```

- shift: To move to one direction. Select the direction among "n"(north – up), "s"(south-down), "e"(east-right) or "w"(west-left), the default is "s"）
```

```
 loop:style:shift:direction:e
```

### bc
Setting the background color.

```
bc:#33aaca
```

### opacity
Setting the opacity 0 – 1.

```
opacity:0.3
```

repeat
Setting repeat.

```
repeat:true
```

## Page property

### transition
Setting page transition.

 - scroll: Scroll to the new page.
 - fadeIn: To fade in
 - replace: Replace the page

### play
play: to set the action timing of animation. 

 - auto: animation starts once the page appears. 
 - pause: No animation works. 
 - always: Animation works once the page appears. This “always” to animate both move forward and backward of page transition. 
 - scroll: Animation works during the page scrolling.

### bc
Assign background color.

```
 bc:#33aaca
```

### duration
Setting animation working duration. Standard time is 0.2 seconds. 

### repeat
Assign Animation either repeat or not. Default is false.

##  Sample
Below are the actual layer name samples.

![layers sample](https://camo.qiitausercontent.com/6c8eab965bd65ce35867fd29f65b6c32f9e8b5ef/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f32353037312f62393037303466312d326232332d383332362d363361662d3963303837346638303365332e706e67) 

Below is the actually generated sample (second part):
http://to-kyo.to/~isamu/swipe_sample_movie2/#0



