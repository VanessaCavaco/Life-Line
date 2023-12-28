import AbstractView from "./AbstractView.js";
import events from "../assets/data/events.json"

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Education");
    }

    async getHtml() {
        // Generate HTML based on the imported events data
        const eventsHtml = this.events.map(event => `
            <div>
                <h2>${event.month} ${event.year}</h2>
                <p>Type: ${event.type}</p>
                <p>Description: ${event.description}</p>
                <p>Where: ${event.where}</p>
                ${event.more ? `<p>More: ${event.more}</p>` : ''}
            </div>
        `).join('');

        // Return the final HTML
        return `
            <h1>Education</h1>
            ${eventsHtml}
        `;
    }
}
