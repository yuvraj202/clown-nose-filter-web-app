noseX = 0;
noseY = 0;

earsX = 0;
earsY = 0;

function preload() {
    clownnose = loadImage("https://i.postimg.cc/7ZBcjDqp/clownnose.png");
    clownears = loadImage("https://i.postimg.cc/cC66Rbxj/i2.webp");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    Video = createCapture(VIDEO);
    Video.size(300, 300);
    Video.hide();
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

function draw() {
    image(Video, 0, 0, 300, 300);
    image(clownnose, noseX, noseY, 30, 30);
    image(clownears, earsX, earsY, 100, 100);

}

function take_snapshot() {
    save("NoseFilter.png");

}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x - 15;
        noseY = results[0].pose.nose.y - 15;
        earsX = (results[0].pose.leftEar.x+results[0].pose.rightEar.x)/2;
        earsY =
         results[0].pose.rightEar.y-200;
    }
}
