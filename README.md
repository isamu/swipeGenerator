# Swipe Generation Plug-in for Generator

This repository contains a plug-in for Adobe Photoshop CC's Generator extensibility layer.
This plug-in makes it easier for users to create [Swipe](https://github.com/swipe-org/swipe) contents from their Photoshop files.

# Swipe

Swipe is a domain-specific, declarative language for non-developers (such as designers, animators, illustrators, musicians, videographers and comic writers) to create media-rich/animated documents that contain photos, videos, images, vector graphics, animations, voices, musics and sound effects, which will be consumed on touch-enabled devices such as smartphones, tablets and touch-enabled set-top-boxes (such as iPhone and Apple TV).

The Swipe Engine that play Swipe media is available in web (javascript), iOS, android.
https://github.com/swipe-org/swipe (iOS)
https://github.com/swipe-org/android (androin)
https://github.com/isamu/swipejs (javascript)

# Swipe Generator

SwipeGenerator is generator of Photoshop, that generate Swipe media file. Each layers or layer groups on photoshop convert each elements or each pages on Swipe media. SwipeGenerator also generate html file, you can play Swipe on you web browser.

# Install Swipe Generator

Download generator from  https://github.com/isamu/swipeGenerator and extract.

You can put swipeGenerator to your Photoshop Plug-ins Generator directory.

# Usege
Run photoshop and open you file, select File > Generate > Generate Swipe.
Then new folder named your PDS file name will be generate you Desktop or home Directory.
In the filder there are some files.

index.html  ( Swipe media player for PC)
touch.html  (Swipe media player for mobile)
main.swipe ( Swipe media file)
main.js (Swipe media file, javascript callback style)


## Development

build

```
$ npm run watch
```

## test

```
$ npm test
```

## run

Get generator-core from githug

```
$ git clone https://github.com/adobe-photoshop/generator-core
```

into generator-core, run app.js

```
$ node app.js -f    ../swipeGenerator/
```

### Document

https://qiita.com/isamua/items/4d328b587434d111e495 (in Japanese)
https://qiita.com/isamua/items/ef9b7bafdb7422ebbcc9 (in Japanese)
https://qiita.com/isamua/items/c6cf8d41d14f20e98001 (in Japanese)

## License

MIT License

copyright (c) 2018 isamu. All rights reserved.

