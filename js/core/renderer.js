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


    drawCircle(x,y,r){

        this.ctx.beginPath();

        this.ctx.arc(
            x,
            y,
            r,
            0,
            Math.PI*2
        );

        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 5;

        this.ctx.stroke();

    }


    drawText(text,x,y){

        this.ctx.font =
            "bold 40px Arial";

        this.ctx.fillStyle =
            "white";

        this.ctx.strokeStyle =
            "black";

        this.ctx.lineWidth = 5;


        this.ctx.strokeText(
            text,
            x,
            y
        );


        this.ctx.fillText(
            text,
            x,
            y
        );

    }


}