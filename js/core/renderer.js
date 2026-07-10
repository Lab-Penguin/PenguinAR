export class Renderer {


    constructor(canvas, video){

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.video = video;

    }


    resize(){

        const videoWidth = this.video.videoWidth;
        const videoHeight = this.video.videoHeight;


        this.canvas.width = videoWidth;
        this.canvas.height = videoHeight;


        const rect = this.video.getBoundingClientRect();


        this.canvas.style.width = rect.width + "px";
        this.canvas.style.height = rect.height + "px";

    }


    clear(){

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

    }


    show(cv, frame){

        cv.imshow(
            this.canvas,
            frame
        );

    }


}