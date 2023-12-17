import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("About Me");
    }
    async getHtml() {
        return `
        <h1> Esta la pagina About me</h1>
        `;
    }
}