export class Camera {

    constructor(videoElement) {

        this.video = videoElement;
        this.stream = null;

    }

    async start() {

        try {

            this.stream = await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: "environment"
                },

                audio: false

            });

            this.video.srcObject = this.stream;

            await this.video.play();

            console.log("Câmera iniciada.");

        }

        catch (erro) {

            console.error("Erro ao abrir a câmera:", erro);

        }

    }

    stop() {

        if (!this.stream) return;

        this.stream.getTracks().forEach(track => track.stop());

        this.stream = null;

    }

}