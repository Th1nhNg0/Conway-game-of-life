let resolution = 100;
let grid = [];
let rectSize = 100;
let start = false;
let runStep = false;
let drawMode = false;
function setup() {
  let c = createCanvas(windowHeight, windowHeight);
  c.parent("#canvas");
  rectSize = width / resolution;

  guiSetup();
  randArr();
  frameRate(12);
  fill(255);
  noStroke();
}

function clearArr() {
  grid = [];
  for (let i = 0; i < resolution; i++) {
    grid.push([]);
    for (let j = 0; j < resolution; j++) {
      grid[i].push(0);
    }
  }
}

function randArr() {
  grid = [];
  for (let i = 0; i < resolution; i++) {
    grid.push([]);
    for (let j = 0; j < resolution; j++) {
      grid[i].push(Math.random() > 0.7);
    }
  }
}

function guiSetup() {
  p = createP("Conway's Game of Life");
  p.parent("#gui");
  p.style("fontSize", "2rem");
  p = createP("Make by <a href='https://p5js.org/'> p5.js</a>");
  p.parent("#gui");

  p = createP("Author:<a href='http://github.com/th1nhNg0/'>Th1nhNg0</a>");
  p.parent("#gui");
  p.style("fontSize", "1.5rem");

  button1 = createButton("start");
  button1.parent("#gui");

  button1.mousePressed(() => {
    start = !start;
    button1.html(!start ? "start" : "stop");
  });

  button2 = createButton("step");
  button2.parent("#gui");
  button2.mousePressed(() => {
    runStep = true;
  });

  div = createDiv();
  div.parent("#gui");
  div.style("display", "flex");
  div.style("gap", "2rem");

  p = createP("speed");
  p.parent(div);
  p.style("fontSize", "1.5rem");

  slider = createSlider(0, 60, 12);
  slider.input(() => {
    frameRate(slider.value());
    p2.html(slider.value());
  });
  slider.parent(div);

  p2 = createP("1");
  p2.parent(div);
  p2.style("fontSize", "1.5rem");

  button3 = createButton("Clear");
  button3.mousePressed(() => {
    clearArr();
  });
  button3.parent("#gui");

  button4 = createButton("Draw Off");
  button4.mousePressed(() => {
    drawMode = !drawMode;
    button4.html(drawMode ? "Draw On" : "Draw Off");
  });
  button4.parent("#gui");
}

function runClock() {
  function validCell(x, y) {
    return x >= 0 && y >= 0 && x < resolution && y < resolution;
  }
  function checkAlive(x, y) {
    let c = 0;
    let dir = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ];
    for (let [dx, dy] of dir)
      if (validCell(x + dx, y + dy) && grid[x + dx][y + dy]) c += 1;
    return (grid[x][y] && (c === 2 || c === 3)) || (!grid[x][y] && c === 3);
  }

  let cpGrid = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      cpGrid[i][j] = checkAlive(i, j);
    }
  }
  grid = cpGrid;
}

function draw() {
  background(0);
  if (start || runStep) {
    runClock();
    runStep = false;
  }

  for (let i = 0; i < resolution; i++)
    for (let j = 0; j < resolution; j++)
      if (grid[i][j]) {
        rect(i * rectSize, j * rectSize, rectSize, rectSize);
      }
}

function mouseDragged() {
  if (drawMode)
    grid.forEach(function (e, i) {
      e.forEach(function (d, j) {
        let x1 = i * rectSize;
        let y1 = j * rectSize;
        let x2 = x1 + rectSize;
        let y2 = y1 + rectSize;
        if (x1 < mouseX && mouseX < x2 && y1 < mouseY && mouseY < y2) {
          grid[i][j] = 1;
        }
      });
    });
}
