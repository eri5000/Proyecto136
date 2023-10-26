status="";
objects=[];

function setup(){
  canvas=createCanvas(300,300);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(300,300);
  video.hide();
}
function start(){
  objectDetector=ml5.objectDetector('cocoSSD', modelLoaded);
  document.getElementById("status").innerHTML = "Estado:detectando objetos";
  object_name=document.getElementById("object_name").value;
}
function modelLoaded(){
  console.log("Modelo cargado");
  status=true;
}
function draw(){
  image(video,0,0,300,300);
  if(status!=""){
    objectDetector.detect(video,gotResult);
    for(i=0;i<objects.length;i++){
      document.getElementById("status").innerHTML = "Estado:detectando objetos";
      fill("#FF0000");
      percent=floor(objects[i].confidence*100);
      text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      if(objects[i].label==object_name){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("obeject_status").innerHTML = object_name + " Encontrado";
        synth=window.speechSynthesis;
        utterThis=new SpeechSynthesisUtterance(object_name + " Encontrado");
        synth.speak(utterThis);

      }else{
        document.getElementById("object_status").innerHTML = object_name + "No encontrado";
      }
    }
  }
}
function gotResult(error,results){
 if(error){
  console.error(error);
 }
 console.log(results);
 objects=results;
}