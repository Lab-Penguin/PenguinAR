export class PoseEstimator {


    constructor(cv, cameraMatrix, distCoeffs, markerSize){

        this.cv = cv;

        this.cameraMatrix = cameraMatrix;

        this.distCoeffs = distCoeffs;

        this.markerSize = markerSize;

    }



    estimate(marker){


        const half =
            this.markerSize / 2;


        const objectPoints =
        [
            [-half,  half, 0],
            [ half,  half, 0],
            [ half, -half, 0],
            [-half, -half, 0]
        ];


        const objectMat =
            this.cv.matFromArray(
                4,
                3,
                this.cv.CV_32F,
                objectPoints.flat()
            );


        const imageMat =
            this.cv.matFromArray(
                4,
                2,
                this.cv.CV_32F,
                marker.corners.flatMap(
                    p => [p.x, p.y]
                )
            );


        const rvec =
            new this.cv.Mat();


        const tvec =
            new this.cv.Mat();



        this.cv.solvePnP(
            objectMat,
            imageMat,
            this.cameraMatrix,
            this.distCoeffs,
            rvec,
            tvec
        );


        marker.rvec = rvec;

        marker.tvec = tvec;


        objectMat.delete();
        imageMat.delete();


        return marker;

    }

}