export class Drawer {


    constructor(cv){

        this.cv = cv;

    }


    drawMarker(frame, marker){

        const points =
            marker.corners;


        for(let i = 0; i < 4; i++){

            const p1 =
                points[i];

            const p2 =
                points[(i + 1) % 4];


            this.cv.line(
                frame,

                new this.cv.Point(
                    p1.x,
                    p1.y
                ),

                new this.cv.Point(
                    p2.x,
                    p2.y
                ),

                new this.cv.Scalar(
                    0,
                    255,
                    0,
                    255
                ),

                3
            );

        }


        this.cv.putText(
            frame,

            marker.id.toString(),

            new this.cv.Point(
                points[0].x,
                points[0].y - 10
            ),

            this.cv.FONT_HERSHEY_SIMPLEX,

            0.8,

            new this.cv.Scalar(
                0,
                255,
                0,
                255
            ),

            2
        );

    }

    drawAxes(frame, marker, cameraMatrix, distCoeffs){

        const axisPoints =
            this.cv.matFromArray(
                4,
                3,
                this.cv.CV_32F,
                [
                    0,0,0,
                    0,0,0.05,
                    0,0.05,0,
                    0.05,0,0
                ]
            );


        const imagePoints =
            new this.cv.Mat();


        const jacobian =
            new this.cv.Mat();


        this.cv.projectPoints(
            axisPoints,
            marker.rvec,
            marker.tvec,
            cameraMatrix,
            distCoeffs,
            imagePoints,
            jacobian
        );


        const origin =
            imagePoints.floatPtr(0);


        const x =
            imagePoints.floatPtr(1);


        const y =
            imagePoints.floatPtr(2);


        const z =
            imagePoints.floatPtr(3);



        this.cv.line(
            frame,
            new this.cv.Point(
                origin[0],
                origin[1]
            ),
            new this.cv.Point(
                x[0],
                x[1]
            ),
            new this.cv.Scalar(
                0,
                0,
                255,
                255
            ),
            3
        );


        this.cv.line(
            frame,
            new this.cv.Point(
                origin[0],
                origin[1]
            ),
            new this.cv.Point(
                y[0],
                y[1]
            ),
            new this.cv.Scalar(
                0,
                255,
                0,
                255
            ),
            3
        );


        this.cv.line(
            frame,
            new this.cv.Point(
                origin[0],
                origin[1]
            ),
            new this.cv.Point(
                z[0],
                z[1]
            ),
            new this.cv.Scalar(
                255,
                0,
                0,
                255
            ),
            3
        );


        axisPoints.delete();
        imagePoints.delete();
        jacobian.delete();

    }

}