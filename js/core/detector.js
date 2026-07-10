import { Marker } from "./marker.js";

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

        const markers = [];

        for(let i = 0; i < ids.rows; i++){

            const id = ids.intPtr(i, 0)[0];

            const corner = corners.get(i);

            const points = [];

            for(let j = 0; j < 4; j++){

                const p = corner.floatPtr(0, j);

                points.push({
                    x: p[0],
                    y: p[1]
                });
            }

            markers.push(
                new Marker(
                    id,
                    points
                )
            );

            corner.delete();
        }

        return markers;
    }
}