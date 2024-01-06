object =[];
status ="";

function setup()
{
    canvas = createCanvas(640, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(620, 360);
    video.hide()
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function gotResult(error, results)
{
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function draw()
{
    image(video, 0, 0, 640, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0;i< object.lenth; i++)
        {
            document.getElementById("status").innerHTML ="Status : Object detected";

            fill("#FF0000");
            percent= floor(object[i].confidence*100);
            text(object[i].label+""+ percent +"%", objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == object_name)
            {
                video.stop();

                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHtml= object_name + "Found";
                synth= window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name +"Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_status").innerHTML= object_name+"Not Found";
            }

        }
    }

}