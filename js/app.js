import { Camera } from "../core/camera.js";

const video = document.getElementById("video");

const camera = new Camera(video);

camera.start();