var Canvas;
(function () {
  'use strict';
  var color, width, height, line, canvas, context, last, text, position;

  position = {
    x: 0,
    y: 0
  };
  color = '#303438';
  height = 10;
  width = 10;
  text = {
    family: 'sans-serif',
    size: '18px',
    string: ''
  };

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

  function drawText(type) {
    if (!text.string) {
      return;
    }
    context.textBaseline = 'top';
    context.font = text.size + ' ' + text.family;
    var args = [
      text.string,
      position.x,
      position.y
    ];
    context[type + 'Text'].apply(context, args);
    text.string = '';
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

    this.canvas = canvas;
    this.context = context;
  };

  Canvas.prototype = {
    constructor: Canvas,

    color: function (style) {
      if (!style) {
        return this;
      }
      color = style;
      last.color = style;
      context.fillStyle = color;
      context.strokeStyle = color;

      return this;
    },

    width: function (setting) {
      if (setting === 'undefined') {
        return this;
      }
      width = setting;
      last.axis = 'width';
      last.dimension = setting;

      return this;
    },

    height: function (setting) {
      if (setting === 'undefined') {
        return this;
      }
      height = setting;
      last.axis = 'height';
      last.dimension = setting;

      return this;
    },

    size: function (shape) {
      return this
        .width(shape.width)
        .height(shape.height);
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

    rect: function (x, y) {
      this.coord(x, y);
      context.beginPath();
      context.rect(position.x, position.y, width, height);

      return this;
    },

    square: function (x, y) {
      return this
        .coord(x, y)
        .ratio('1:1')
        .rect(position);
    },

    line: function (x, y) {
      this.coord(x, y);
      var c = context;
      c.lineWidth = last.dimension;
      c.strokeWidth = last.dimension;

      if (!line) {
        line = position;
        c.beginPath();
        c.moveTo(position.x, position.y);
      } else {
        c.lineTo(position.x, position.y);
      }

      return this;
    },

    coord: function (coord, splat) {
      if (coord === undefined) {
        return this;
      }
      if (splat) {
        coord = {
          x: coord || position.x,
          y: splat || position.y
        };
      }
      position = {
        x: coord.x || position.x,
        y: coord.y || position.y
      };
      return this;
    },

    font: function (input) {
      var family, size, height = /\s?\d+(\w+)?/;

      size = input.match(height);
      family = input.replace(height, '').match(/(\w+-?)+/);

      text.size = size ? size[0] : text.size;
      text.family = family ? family[0] : text.family;
      return this;
    },

    text: function (input) {
      context.font = text.size + ' ' + text.family;
      text.string = input;

      return this;
    },

    stroke: function (style) {
      this.color(style);
      drawText('stroke');
      line = undefined;
      context.strokeWidth = last.dimension;
      context.lineWidth = last.dimension;
      context.stroke();
      context.closePath();

      return this;
    },

    fill: function (style) {
      this.color(style);
      drawText('fill');
      context.fill();
      context.closePath();

      return this;
    },

    clear: function (style) {
      var c = canvas;

      height = c.height;
      width = c.width;

      return this.rect(0, 0).fill(style || 'white');
    }
  };
}());
