import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(){
        super();
        this.setTitle("About Me");
    }
    async getHtml() {
        return `
        <h1>About Me</h1>

        <h3>Constanctly learning to improve the impact of tecnology in Architecture.</h3>
        <p>
        I am a Portuguese Architect living in Barcelona and since I graduated I've witnessed the impact of technology on the AECO (Architecture, Engineering, Construction, and Operation) landscape.

        From the traditional days of hand-drawn designs to the contemporary era of collaborative and data-driven processes, the tools we employ have fundamentally reshaped our profession. The introduction of CAD (Computer-Aided Design) software marked a shift, altering the dynamics of creativity and project execution.
        In today's paradigm, the AECO BIM methodology has revolutionized our approach. No longer confined to a singular tool for computer-aided design, we now leverage a multitude of tools designed to specific disciplines and project phases. Each contributes uniquely to the creative and constructive processes,  enhancing accuracy and speed.
        The evolution doesn't stop at design, it extends across the entire project lifecycle. We can now digitally recreate construction processes and manage assets with digital twins. Modern technologies enable us to work with visual tools that not only represent elements but also manage data, mitigating potential construction conflicts.
        From a profession where hand-drawing was the only tool, architects now have a diverse array of digital tools. However, as technology advances, challenges arise. Despite the proliferation of powerful tools, interoperability, collaboration, and affordability remain key concerns, especially for smaller firms.
        
        In this ever-changing scenario, I don't see myself only as a design architect, I envision being an architect eager to embrace technology and software engineering. My goal is to improve the impact of technology on the development of architectural projects.
        To achieve this, I am ready to take on new adventures and challenges in software engineering, blending my architectural expertise with a passion for technological innovation to shape a future where architecture and technology seamlessly come together.
        </p>        
        `;
    }
}