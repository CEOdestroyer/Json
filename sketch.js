var dropdown;
var mode;

// Function to delete element from the array
function removeFromArray(arr, elt) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == elt) {
        arr.splice(i, 1);
      }
    }
  }
  
  // An educated guess of how far it is between two points
  function heuristic(a, b) {
    var d = dist(a.i, a.j, b.i, b.j);
    return d;
  }
  
  // How many columns and rows?
  var cols = 18;
  var rows = 18;
  
  // This will be the 2D array
  var grid = new Array(cols);
  
  // Open and closed set
  var openSet = [];
  var closedSet = [];
  
  // Start and end
  var start;
  var end;
  
  // Width and height of each cell of grid
  var w, h;
  
  // The road taken
  var path = [];
  let img;
  var button;
  var button2;

  let easing = 0.05;
  var data = {};

  function preload() {
    data = loadJSON('texto.json');

    dropdown = createSelect('');
    
    img = loadImage('assets/foto_pronto.jpg');
    
  }

  function setup() {
    //screen
    
    var shopping = data.shopping;
    console.log(shopping);

    for (var i = 0; i < shopping.length; i++) {
      var caminho = shopping[i].caminhos;
      if (caminho == undefined) break;
      for (var j = 0; j < caminho.length; j++) {
        dropdown.option(caminho[j]);
      }
    }

    mode=0;//initialy not started
    createCanvas(500, 500)
    
    console.log('A*');

    
    // Grid cell size
    w = width / cols;
    h = height / rows;
  
    // Making a 2D array
    for (var i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }
    
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  
    // All the neighbors
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid);
      }
    }


    var E1 = grid[1][9]
    var E2 = grid[16][13]
    var E3 = grid[3][0]
    var E4 = grid[15][17]
    var E5 = grid[7][16]
    var AV1 = grid[12][7]
    var Av2 = grid[0][0]
    var CasasB = grid[0][0]
    var Taco = grid[2][5]
    var Marisa = grid[2][8]
    var Renner = grid[2][12]
    var Tommy = grid[4][10]
    var PracaA = grid[5][13]
    var CK = grid[9][16]
    var Magalu = grid[16][16]
    var Centauro = grid[15][11]
    var Adidas = grid[15][8]
    var LojasA = grid[12][5]
    var Cinemark = grid[14][4]
    var Nike = grid[12][3]
    var L1 = grid[4][6]
    var L2 = grid[5][7]
    var L3 = grid[6][8]
    var L4 = grid[8][10]
    var L5 = grid[9][11]
    var L6 = grid[10][12]
    var L7 = grid[12][14]
    var L8 = grid[14][16]
    var L9 = grid[3][2]
    var L10 = grid[4][3]
    var L11 = grid[5][4]
    var L12 = grid[6][6]

    
    start = E1;
    end = CK;
    start.wall = false;
    
    // openSet starts with beginning only
    openSet.push(start);
  }

  

  function draw() {
    clear();
    if(mode ==0){
      
    }
    KeyPressed();
    
    if (mode==1){
    // Am I still searching?
    new AStart(openSet, closedSet, 1);
    // Draw current state of everything
    
    // tint(255, 127); // Display at half opacity
    // Drawing path as continuous line
    noFill(); // remove the color 
    //line color
    stroke(100, 149, 237);
    strokeWeight(w / 2);
    beginShape();
    image(img, 0, 0);
    tint(255, 126)
    for (var i = 0; i < path.length; i++) {
      vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    endShape();
  }
  }

  function KeyPressed() {
    if(keyCode===ENTER){
      mode=1;
    }
  }