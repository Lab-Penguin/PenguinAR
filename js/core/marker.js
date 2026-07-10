export class Marker {

    constructor(id, corners) {

        this.id = id;
        this.corners = corners;

        this.rvec = null;
        this.tvec = null;

        this.visible = true;
    }
}