import * as d3Array from "d3-array";

export default function(nodes, v) {

  // Create random data if no value function has been set
  if(!v.valueX) {
    v.valueX = function() { return Math.random(); }
    v.x.domain([0, 1]).range([0, v.size[0]]);
  } else {
    v.x.domain(d3Array.extent(nodes, v.valueX)).range([0, v.size[0]]);
  }

  // Same as for X, create random data for vertical axis
  if(!v.valueY) {
    v.valueY = function() { return Math.random(); }
    v.y.domain([0, 1]).range([0, v.size[1]]);
  } else {
    v.y.domain(d3Array.extent(nodes, v.valueY)).range([0, v.size[1]]);
  }

  var _valueWidth;

  if(!v.valueWidth) {
    _valueWidth = function() { return 1; }
    v.width.domain([0, nodes.length]).range([0, v.size[0]]);
  } else {
    _valueWidth = v.valueWidth;
    v.width.domain(d3Array.extent(nodes, v.valueX)).range([0, v.size[0]]);
  }

  var _valueHeight;

  if(!v.valueHeight) {
    _valueHeight = function() { return 1; }
    v.height.domain([0, nodes.length]).range([0, v.size[1]]);
  } else {
    _valueHeight = v.valueHeight;
    v.height.domain(d3Array.extent(nodes, v.valueY)).range([0, v.size[1]]);
  }

  nodes.forEach(function(n) {
    n[v.__x] = v.x(v.valueX(n)) + v.offset[0] + v.padding;
    n[v.__y] = v.y(v.valueY(n)) + v.offset[1] + v.padding;

    n[v.__width] = v.width(_valueWidth(n)) - 2 * v.padding;
    n[v.__height] = v.height(_valueHeight(n)) - 2 * v.padding;

    n[v.__cx] = n[v.__x] + n[v.__width] / 2;
    n[v.__cy] = n[v.__y] + n[v.__height] / 2;
  });

  return nodes;
}
