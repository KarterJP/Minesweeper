class cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*h;
    if (random(1) < 0.2) {
      this.mine = true;
    } else {
      this.mine = false;
    }
    this.revealed = false;
    this.flagged = false;
  }
  
  show() {
    stroke(0);
    fill(150);
    var centerX = this.x + w/2;
    var centerY = this.y + h/2;
    
    if (this.revealed) {
      var iconSize = w/2;
      
      if (this.mine) {
        ellipse(centerX, centerY, iconSize);
        arc(centerX, centerY, iconSize/2, iconSize/2, PI, PI + QUARTER_PI);
        revealAll();
      } else if (!this.mine) {
        var num = this.countMines();
        if (num > 0) {
          text(num, centerX-iconSize/3, centerY-iconSize/2, iconSize*4, iconSize*4);
        } else {
          this.revealNeighbors();
        }
      }
      noFill();
    } else if (this.flagged) {
      var lineStartX = this.x;
      var lineEndX = this.x;
      var lineStartY = this.y + h/4;
      var lineEndY = this.y + (3*h/4);
      // push();
      fill(255,0,0);
      // rect(this.x-5, this.y-5, 10, 10);
      // pop();
      // line(lineStartX, lineStartY, lineEndX, lineEndY);
    }
    rect(this.x, this.y, w, h);
  }
  
  flag() {
    if (!this.flagged) {
      this.flagged = true;
    } else if (this.flagged) {
      this.flagged = false;
    }
  }
  
  reveal() {
    if (!this.flagged) {
      this.revealed = true;
    }
  }
  
  countMines() {
    var total = 0;
    
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        var i = this.i + xoff;
        var j = this.j + yoff;
        
        if(i > -1 && i < cols && j > -1 && j < rows) {
          var neighbor = grid[i][j];
          
          if (neighbor.mine) {
            total++;
          }
        }
      }
    }
    
    return total;
  }
  
  revealNeighbors() {
    
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        var i = this.i + xoff;
        var j = this.j + yoff;
        
        if(i > -1 && i < cols && j > -1 && j < rows) {
          var neighbor = grid[i][j];
          if (!neighbor.mine && !neighbor.revealed && !neighbor.flagged) {
            neighbor.reveal();
            checkGame();
            if (neighbor.countMines() == 0) {
              neighbor.revealNeighbors();
            }
          }
        }
      }
    }
  }
  
  contains(x, y) {
    var bool = this.x < x && x < this.x+w && this.y < y && y < this.y+h;
    return bool;
  }
}