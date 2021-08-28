---
title: Generate images with text in nodejs
description: Generate images with text in NodeJS using canvas
created: 2021-08-26
tags:
  - 'JS'
  - 'NodeJS'
---

Sometimes, you may want to make cards with a nice background and some text on it. It may be for generating [Open Graph](https://ogp.me/) images, displaying some quotes, etc.

For example, there is an empty card (1200x630), a png image created in Inkscape.

<img  src="/images/demo-card-empty.png" alt="empty card" />

And “to be or not to be” is generated on it.

<img  src="/images/demo-card-with-text.png" alt="card with text" />

Before diving into nodejs, we can make it work first in the browser, with live updates. It would be a much better experience. For this we’ll be using [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

So, first let’s scaffold `index.html`, then inside the body tag add the following snippets.

```html
<canvas id="myCanvas" width="1200" height="630"> </canvas>
```

Ok, now we have a canvas with width 1200px and height 630px.

To make our background, we had to load an empty card image and draw it. The image has the same dimensions as the canvas, 1200x630.

```html
<canvas id="myCanvas" width="1200" height="630"> </canvas>
<div style="display: none"><img id="source" src="card.png" /></div>

<script>
  const width = 1200
  const height = 630

  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  const image = document.getElementById('source')

  image.addEventListener('load', (e) => {
    ctx.drawImage(image, 0, 0, width, height)
  })
</script>
```

Before we draw out text we have to set properties.

```js
ctx.textAlign = 'center'
ctx.textBaseline = 'top'
```

And choose the font family available in your machine.

```js
ctx.font = 'bold 60pt Nimbus Mono PS'
```

We could simply paint text in monotone color.

```js
ctx.fillStyle = 'hsla(298, 100%, 75%, 1)'
```

Or make it gradient like so.

```js
const gradient = ctx.createLinearGradient(0, 0, width, 0)
gradient.addColorStop('.33', 'hsla(200, 100%, 75%, 1)')
gradient.addColorStop('.66', 'hsla(300, 100%, 75%, 1)')
ctx.fillStyle = gradient
```

We can't directly set line breaks, so we will split out text in lines and display them one by one, from top to bottom, using [fillText](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText). First and last lines will contain only asterisks, and between them the text. Line height should be greater than font-size.

```js
const text = '*** /To be /or /not to be /***'

const lines = text.split(' /')

const paddingTop = 60
const lineHeight = 90

lines.forEach((line, i) => {
  ctx.fillText(line, midWidth, paddingTop + lineHeight * i)
})
```

The final touch, we add a small section, at the center bottom, with a URL.

```js
ctx.fillStyle = 'hsla(3, 100%, 75%, .75)'
ctx.font = 'bold 30pt monospace'
ctx.fillText('*** www.example.com ***', midWidth, height - 100)
```

At the end we have.

```html
<canvas id="myCanvas" width="1200" height="630"> </canvas>
<div style="display: none"><img id="source" src="card.png"</div>

<script>
  const width = 1200
  const height = 630

  const midWidth = width / 2

  const canvas = document.getElementById('myCanvas')
  const ctx = canvas.getContext('2d')

  const image = document.getElementById('source')

  image.addEventListener('load', (e) => {
    ctx.drawImage(image, 0, 0, width, height)

    ctx.font = 'bold 60pt Nimbus Mono PS'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0.33, 'hsla(200, 100%, 75%, 1)')
    gradient.addColorStop(0.66, 'hsla(300, 100%, 75%, 1)')
    ctx.fillStyle = gradient

    const text = '*** /To be /or /not to be /***'
    const lines = text.split(' /')

    const paddingTop = 60
    const lineHeight = 90

    lines.forEach((line, i) => {
      ctx.fillText(line, midWidth, paddingTop + lineHeight * i)
    })

    ctx.fillStyle = 'hsla(300, 100%, 75%, .75)'
    ctx.font = 'bold 30pt monospace'
    ctx.fillText('*** www.example.com ***', midWidth, height - 100)
  })
</script>
```

---

For nodejs, we need to install [canvas](https://www.npmjs.com/package/canvas).

```shell
npm i canvas
```

Let's create a make.js file and do little adjustments.

```js
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const width = 1200
const height = 630
const midWidth = width / 2

const canvas = createCanvas(width, height)
const ctx = canvas.getContext('2d')

loadImage('./card-empty.png').then((image) => {
  ctx.drawImage(image, 0, 0, width, height)

  ctx.font = 'bold 60pt Nimbus Mono PS'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  const gradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0.33, 'hsla(200, 100%, 75%, 1)')
  gradient.addColorStop(0.66, 'hsla(300, 100%, 75%, 1)')
  ctx.fillStyle = gradient

  const paddingTop = 60
  const lineHeight = 90

  const text = '*** /To be /or /not to be /***'
  const lines = text.split(' /')

  lines.forEach((line, i) => {
    ctx.fillText(line, midWidth, paddingTop + lineHeight * i)
  })

  ctx.fillStyle = 'hsla(300, 100%, 75%, .75)'
  ctx.font = 'bold 30pt monospace'
  ctx.fillText('*** www.example.com ***', midWidth, height - 100)

  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('card-with-text.png', buffer)
})
```

Then run.

```shell
node make.js
```

Now we have `card-with-text.png`.

Cone [Repo](https://github.com/diogenesofweb/text-in-image).
