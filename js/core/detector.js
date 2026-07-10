export class Detector {

    constructor(cv) {

        this.cv = cv;

        const dictionary =
            cv.aruco.getPredefinedDictionary(
                cv.DICT_4X4_50
            );


        const parameters =
            new cv.aruco.DetectorParameters();


        const refineParameters =
            new cv.aruco.RefineParameters(
                10,
                3,
                true
            );


        this.detector =
            new cv.aruco.ArucoDetector(
                dictionary,
                parameters,
                refineParameters
            );
    }


    detect(frame) {

        const corners =
            new this.cv.MatVector();

        const ids =
            new this.cv.Mat();

        const rejected =
            new this.cv.MatVector();


        this.detector.detectMarkers(
            frame,
            corners,
            ids,
            rejected
        );


        return {
            corners: corners,
            ids: ids,
            rejected: rejected
        };
    }
}