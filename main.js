alarm = "";
Status = "";
objects = [];

function preload() {
    alarm = loadSound("alarm.wav");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center(); 
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("COCO SSD initialized");
    Status = true;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }

    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(Status != "") {
        objectDetector.detect(video, gotResult);
        console.log(objects);  
        for(i = 0; i < objects.length; i++) {
            if(objects[i].label == "person") {
                document.getElementById("babyDetected").innerHTML = "Baby Detected";
                alarm.stop();
                console.log("stopped");
            }

            else {
                document.getElementById("babyDetected").innerHTML = "Baby Not Detected";
                alarm.play();
                console.log("play");
            }
        }

        if(objects.length == 0) {
            document.getElementById("babyDetected").innerHTML = "Baby Not Detected";
            alarm.play();
            console.log("play");
        }
    }
}