export class ARImage {


    constructor(cv, image){

        this.cv = cv;
        this.image = image;

    }


    apply(frame, marker){

        const w = this.image.width;
        const h = this.image.height;

        // centro da imagem
        const cx = w / 2;
        const cy = h / 2;

        // tamanho do quadrado usado
        // const d = Math.min(w, h) / 4;
        const d = Math.min(cx, cy) / 1.5;

        const src =
            this.cv.matFromArray(4, 2, this.cv.CV_32F,
                [cx + d, cy - d,
                 cx - d, cy - d,
                 cx - d, cy + d,
                 cx + d, cy + d]
            );


        const dst =
            this.cv.matFromArray(4, 2, this.cv.CV_32F,
                [
                    marker.corners[0].x,
                    marker.corners[0].y,

                    marker.corners[1].x,
                    marker.corners[1].y,

                    marker.corners[2].x,
                    marker.corners[2].y,

                    marker.corners[3].x,
                    marker.corners[3].y
                ]
            );


        const H = this.cv.findHomography(src, dst);


        const imageMat =
            this.cv.imread(
                this.image
            );


        const warped =
            new this.cv.Mat();


        this.cv.warpPerspective(
            imageMat,
            warped,
            H,
            frame.size()
        );


        warped.copyTo(
            frame
        );


        src.delete();
        dst.delete();
        H.delete();
        imageMat.delete();
        warped.delete();

    }

}