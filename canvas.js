var Canvas;
(function () {
  'use strict';
  var color, width, height, line, canvas, context, last;


  color = '#303438';
  height = 10;
  width = 10;

  last = {
    dimension: width,
    axis: 'width'
  };

  function $(s) {
    var node = document.getElementsByTagName(s);
    if (!node[0]) {
      throw new ReferenceError('No canvas element');
    }
    return node[0];
  }

  Canvas = function (opt) {
    if (!(this instanceof Canvas)) {
      return new Canvas(opt);
    }
    opt = opt || {};
    canvas = opt.canvas || canvas || $('canvas');
    context = canvas.getContext('2d');
    canvas.width = opt.width || canvas.width;
    canvas.height = opt.height || canvas.height;
  };

  Canvas.prototype = {
    constructor: Canvas,

    color: function (style) {
      if (!style) {
        return this;
      }
      color = style;
      last.color = style;

      return this;
    },

    width: function (setting) {
      width = setting;
      last.axis = 'width';
      last.dimension = setting;

      return this;
    },

    height: function (setting) {
      height = setting;
      last.axis = 'height';
      last.dimension = setting;

      return this;
    },

    ratio: function (string) {
      var setting, axis = string.split(':'),
        x = axis[0],
        y = axis[1];

      if (last.axis === 'width') {
        height = width * (y / x);
        return this;
        
      } else {
        width = height * (x / y);
        return this;
        
      }
    },

    rect: function (coord) {
      context.beginPath();
      context.rect(coord.x, coord.y, width, height);

      return this;
    },

    square: function (coord) {
      var axis = last.dimension,
        ratio = axis + ':' + axis;
      
      return this.ratio(ratio).rect(coord);
    },

    line: function (coord) {
      var c = context;
      c.lineWidth = width;
      c.strokeWidth = width;

      if (!line) {
        line = coord;
        c.beginPath();
        c.moveTo(coord.x, coord.y);
      } else {
        c.lineTo(coord.x, coord.y);
      }

      return this;
    },

    stroke: function (style) {
      this.color(style);
      line = undefined;
      context.strokeStyle = color;
      context.stroke();
      context.closePath();

      return this;
    },

    fill: function (style) {
      this.color(style);
      context.fillStyle = color;
      context.fill();
      context.closePath();

      return this;
    },

    clear: function (style) {
      var c = canvas;
      if (style) {
        this.color(style);
      }

      return this
        .height(c.height)
        .width(c.width)
        .rect({
          x: 0,
          y: 0
        })
        .fill();
    }
  };
}());