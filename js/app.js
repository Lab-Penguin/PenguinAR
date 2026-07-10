import { Camera } from "./core/camera.js";
import { Renderer } from "./core/renderer.js";
import { Detector } from "./core/detector.js";
import { Drawer } from "./core/drawer.js";
import { PoseEstimator } from "./core/pose.js";
import { ARImage } from "./core/ar_image.js";
import { ARManager } from "./core/ar_manager.js";
import { AR_CONFIG } from "./core/config.js";


console.log("app.js iniciou");

const CV = await cv;

function createCameraMatrix(cv, width, height){

    const f = Math.max(width, height);

    const cx = width / 2;

    const cy = height / 2;

    return cv.matFromArray(3, 3, cv.CV_64F,
        [f, 0, cx,
         0, f, cy,
         0, 0, 1]
    );

}

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


const arManager =
    new ARManager(CV, AR_CONFIG);
await arManager.load();

    
const drawer =
    new Drawer(CV);

const arImage =
    new ARImage(CV, document.getElementById("arImage"));


video.addEventListener(
    "loadedmetadata",
    ()=>{

        renderer.resize();

        captureCanvas.width =
            video.videoWidth;

        captureCanvas.height =
            video.videoHeight;

    }
);



await camera.start();

const cameraMatrix =
    createCameraMatrix(CV, video.videoWidth, video.videoHeight);


const distCoeffs =
    CV.matFromArray(5, 1, CV.CV_64F,
        [0, 0, 0, 0, 0]
    );

const pose =
    new PoseEstimator(CV, cameraMatrix, distCoeffs, 0.05);

function loop(){

    if(video.readyState === video.HAVE_ENOUGH_DATA){

        captureCtx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);


        const frame =
            CV.imread(captureCanvas);


        const markers = detector.detect(frame);


        for(const marker of markers){
            console.log(marker);
            pose.estimate(marker);
            drawer.drawMarker(frame, marker);
            arManager.apply(frame, marker);
            // drawer.drawAxes(frame, marker, cameraMatrix, distCoeffs);
        }


        renderer.show(CV, frame);


        frame.delete();
    }


    requestAnimationFrame(loop);
}


loop();