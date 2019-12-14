var ball;
var texture1;
var moon;
var texture2;
var texture3;
var texture4;
var cheat;
var stationaryStars = [];
var playerYRot = 0;
var playerXRot = 0;
var playerZRot = 0;
var G = 30000;
var A = 185.20259;
var cameraPos = 0;
var satellites = [];
var zoom = -1200;
var universe;
var SatDist = [1000, 450, 1150, 1400];
var diameterCool = [200, 300, 400, 500];
var boomboom = [];
var ring;
var rings = [];
var ringTex;
var timer = 0;
var ringRotation = 0;
var ST = [];

function setup() {
  math = loadModel("pi_os.dae");
  texture1 = loadImage("badyes.jpg");
  texture2 = loadImage("bad.png");
  texture3 = loadImage("cancers.jpg");
  texture4 = loadImage("bigbrain.png");
  moon = loadImage("physicsbigbrain.png");

  angleMode(DEGREES);
  createCanvas(1540, 870, WEBGL);
  ST = [texture1, texture2, texture3, texture4];
  for (var i = 0; i < 4; i++) {
    var angle = ((2 * Math.PI) / 4) * i;
    console.log(angle);
    console.log(Math.cos(angle));

    ball = {
      zPos: SatDist[i] * Math.cos(angle),
      xPos: SatDist[i] * Math.sin(angle),
      yPos: 0,
      diameter: diameterCool,
      xRotation: random(0.009, 1),
      yRotation: 0,
      zRotation: 0,
      //gravity
      xVelocity: (A / sqrt(SatDist[i])) * Math.cos(angle),
      zVelocity: -(A / sqrt(SatDist[i])) * Math.sin(angle),
      yVelocity: 0,
      time: 0,
      explode: false,
      textureused: ST[i]
    };

    console.log(ball);
    satellites.push(ball);
  }
  for (var i = 1; i < 95; i++) {
    ring = {
      radius: i * 4 + 700,
      tubeRadius: 2,
      detailX: 70,
      detailY: 2,
      lightness: random(0, 100 * Math.abs(Math.sin(i / 20))) / 100,
      yRotation: 0
    };
    rings.push(ring);
  }
}

function draw() {
  timer += 0.5;
  ringRotation += random(0.01, 0.05);

  noStroke();

  background("black");
  translate(0, 0, zoom);

  rotateY(playerYRot);
  rotateX(playerXRot);
  rotateZ(playerZRot);

  if (keyIsDown(39)) {
    playerYRot -= 0.01;
  }
  if (keyIsDown(37)) {
    playerYRot += 0.01;
  }
  if (keyIsDown(38)) {
    playerXRot += 0.01;
  }
  if (keyIsDown(40)) {
    playerXRot -= 0.01;
  }

  if (keyIsDown(90)) {
    zoom += 40;
  }
  if (keyIsDown(88)) {
    zoom -= 40;
  }

  for (var i = 0; i < satellites.length; i++) {
    drawSatellites(satellites[i]);
    // if(satellites[i].zPos < 50 && satellites[i].zPos > -50){
    // 	satellites.splice(i,1)
    //}
  }
  for (var i = 0; i < rings.length; i++) {
    drawRings(rings[i]);
  }

  var locX = mouseX - width / 2;
  var locY = mouseY - height / 2;
  var distance = dist(0, 0, 0, ball.xPos, ball.yPos, ball.zPos);
  // var brightness = (1-(distance/800))*230
  var brightness = 255;

  pointLight(brightness, brightness, brightness, -200, 0, 900);

  noStroke();
  normalMaterial();

  push();

  rotateX(1.5708);

  ambientMaterial(255, 255, 255);
  texture(moon);
  sphere(400, 300);

  pop();

  translate(450, 230);
}

function drawSatellites(ball) {
  var distance = dist(0, 0, 0, ball.xPos, ball.yPos, ball.zPos);

  ball.xRotation += random(0.01, 0.05);
  ball.yRotation += random(0.01, 0.05);
  ball.zRotation += 0.01;

  push();

  var magnitude = G / (distance * distance);
  ball.xVelocity -= (ball.xPos / distance) * magnitude;
  ball.xPos += ball.xVelocity;
  ball.zVelocity -= (ball.zPos / distance) * magnitude;
  ball.zPos += ball.zVelocity;

  translate(ball.xPos, ball.yPos, ball.zPos);

  ambientMaterial(255, 255, 255);

  rotateY(ball.xRotation);
  rotateX(ball.yRotation);
  texture(ball.textureused);
  sphere();
  pop();
}

function drawRings(ring) {
  fill(245 * ring.lightness, 245 * ring.lightness, 220 * ring.lightness);
  torus(ring.radius, ring.tubeRadius, ring.detailX, ring.detailY);
}
