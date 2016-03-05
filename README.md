# Canvas

A better API

So, why did I build canvas.js? Well, the interface for the canvas element absolutely stinks. It gives you a lot of power, but is needlessly verbose, and doesn't have any of that chainable goodness I've come to love. So when I found myself doing more with canvas, I decided it was time for a change and built a library that makes it a pleasure to work with.


```javascript
// drawing a line
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
ctx.beginPath();
ctx.strokeStyle = 'yellow';
ctx.lineWidth = 1;
ctx.moveTo(100, 100);
ctx.lineTo(300, 300);
ctx.closePath();
ctx.stroke();
// ... are you kidding?
```

Here's what that same code looks like with canvas.js...

```javascript
Canvas()
.line(100, 100).line(300, 300)
.width(1).stroke('yellow');
```

Welp, at least there's room for improvement. Let's take a look at all the shiny features!

## new Canvas([options])

Ah, the constructor. It works just fine without any options, but here are the ones that are available to you:
- `options.canvas` lets you explicitly tell what canvas you want to draw on. Without this option, it will either use one from the last Canvas instance, or go searching for a canvas in your document.
- `options.width` sets the width of the canvas.
- `options.height` does the same thing. But for height. Surprise.

## .width(Number)

Set the width of your shape with this method. It will remember your setting until it's changed, so if you're drawing tons of rectangles with the same dimensions, you only need to set them once.

## .height(Number)

Same behavior as [`.width`](#widthnumber).

## .size(Object/x, y)

Set the width and height at once by passing an object with `width` and/or `height` properties, or pass the width and height values as parameters.

## .rect(Object/x, y)

We're starting with the basics. `.rect`, as you might guess, draws a rectangle onto the canvas. It can either take `x` and `y` as arguments, or as an object.

## .square(Object/x, y)

Using `.square` simply ensures that your shape is drawn as a square. It uses the last dimension set to figure out it's size.

## .line(Object/x, y)

Draw a line onto the canvas without worrying about `beginPath` or `closePath`. You can pass in `x` and `y` as arguments or as an object. Width is figured by the last setting (`.width()`, `.height()`).

## .image(HTML)

Render an image element with respect to the width, height, and coordinate properties. Please note that rendering is synchronous, and images are not. For best results, add `img.onload`.

## .text(String)

To draw strings onto the canvas, use `.text`. `stroke` or `fill` to paint it.

## .font(String)

Choose your font size and/or font family by passing in a string, such as '15rem helvetica'. It defaults to 18px sans-serif.

## .color(String)

This will set the color for the shape you're about to draw.

## .stroke([color])

If you're not familiar with the native canvas API, `stroke` draws the outline of a shape. Since lines don't really have area, you'll use `.stroke` to color them. This method can take a color. You don't need to provide one, but it allows for less code (yay!).

## .fill([color])

This will fill the area of whatever shape you've drawn. Like `.stroke`, it can take a color for brevity.

## .clear([color])

This will clear the canvas. The optional color sets the background, but if none is given it defaults to white.

## .ratio('width:height')

It's a convinience method that forces your shape into a ratio, like 16:9. It's context specific, so if you set the height before calling this method, it'll assume the ratio relates to height.

## plans for this library

Well, that covered all the API. You'll notice it's pretty brief. You might also notice that it doesn't have support for circles. That doesn't mean I hate circles, I just never needed to draw them. I'm expecting to plug them in soon (it can't be that hard, right?). Also, radians? Really? Okay, if you're a mathematician you'll smile. But I want a choice. So here's a rundown of the features I'd like to see in canvas.js:

- border-radius (rad/deg)
- gradients

If you want to see some features, submit an issue or a pull request!

Thanks for checking out canvas.js!
