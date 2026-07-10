import { Camera } from "./core/camera.js";
import { Renderer } from "./core/renderer.js";
import { Detector } from "./core/detector.js";


console.log("app.js iniciou");


const CV = await cv;

console.log("OpenCV carregado", CV);
console.log("ArUco:", CV.aruco);


const video =
    document.getElementById("video");

const canvas =
    document.getElementById("canvas");

const captureCanvas = document.createElement("canvas");
const captureCtx = captureCanvas.getContext(
    "2d",
    {
        willReadFrequently: true
    }
);

const camera =
    new Camera(video);


const renderer =
    new Renderer(canvas, video);


const detector =
    new Detector(CV);



video.addEventListener(
    "loadedmetadata",
    ()=>{

        renderer.resize();

    }
);



await camera.start();


function loop(){

    if(video.readyState === video.HAVE_ENOUGH_DATA){

        captureCanvas.width = video.videoWidth;
        captureCanvas.height = video.videoHeight;


        captureCtx.drawImage(
            video,
            0,
            0,
            captureCanvas.width,
            captureCanvas.height
        );


        const frame =
            CV.imread(captureCanvas);


        const result =
            detector.detect(frame);

        console.log(
            "ids:",
            result.ids.rows,
            result.ids.data
        );


        if(result.ids.rows > 0){

            console.log(
                "Marcadores:",
                result.ids.data
            );
            console.log(
                "tipo ids:",
                result.ids.type,
                result.ids.rows,
                result.ids.cols
            );
            for(let i = 0; i < result.corners.size(); i++){

                const corner = result.corners.get(i);

                for(let j = 0; j < 4; j++){

                    const p1 = corner.floatPtr(0, j);
                    const p2 = corner.floatPtr(0, (j + 1) % 4);

                    CV.line(
                        frame,
                        new CV.Point(
                            p1[0],
                            p1[1]
                        ),
                        new CV.Point(
                            p2[0],
                            p2[1]
                        ),
                        new CV.Scalar(
                            0,
                            255,
                            0,
                            255
                        ),
                        3
                    );
                }

                corner.delete();
            }
            

        }


        CV.imshow(
            canvas,
            frame
        );


        frame.delete();
        result.ids.delete();
        result.corners.delete();
        result.rejected.delete();
    }


    requestAnimationFrame(loop);
}


loop();