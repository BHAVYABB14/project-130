song1_status = "";
song2_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0; 
song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload(){
    song1 = loadSound("FUR ELISE.mp3");
    song2 = loadSound("Believer.mp3");
}
function play(){
    song.play();
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses)
}
function draw(){
    image(video,0,0,600,500);
    fill("#993399");
    stroke("#993399");
    
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();

        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Fur Elise ";
        }

    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();

        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Believer ";
        }

    }
}
function modelLoaded(){
    console.log("Posenet Is Initialised");
}
function gotPoses(){
    if(results.length > 0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist =" + scoreLeftWrist + "scoreRightWrist =" + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;

        leftWristY = results[0].pose.leftWrist.y;
        
        console.log("leftWristX= " +leftWristX +"leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;

        rightWristY = results[0].pose.rightWrist.y;

        console.log("rightWristX= " +rightWristX +"rightWristY = "+rightWristY);
}
}