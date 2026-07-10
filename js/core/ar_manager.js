import { ARImage } from "./ar_image.js";


export class ARManager {


    constructor(cv, config){

        this.cv = cv;

        this.images = {};


        this.config =
            config.markers;

    }



    async load(){

        for(const id in this.config){


            const img =
                await this.loadImage(
                    this.config[id].image
                );


            this.images[id] =
                new ARImage(
                    this.cv,
                    img
                );

        }

    }



    loadImage(src){

        return new Promise(
            resolve => {

                const img =
                    new Image();


                img.onload = () =>
                    resolve(img);


                img.src = src;

            }
        );

    }



    apply(frame, marker){


        const ar =
            this.images[marker.id];


        if(!ar){

            return;

        }


        ar.apply(
            frame,
            marker
        );

    }


}