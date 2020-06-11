var size = 25;
var w = size;
var h = size;
var grid;
var cols;
var rows;

function setup() {
  createCanvas(400, 400);
  cols = floor(width/size);
  rows = floor(height/size);
  
  grid = make2DArray(cols, rows);
  fillGrid();
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function fillGrid() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new cell(i, j);
    }
  }
}

function revealAll() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].reveal();
    }
  }
}

function make2DArray(cols, rows) {
  grid = Array(cols);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = Array(rows);
  }
  return grid;
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].reveal();
        }
      }
    }
}