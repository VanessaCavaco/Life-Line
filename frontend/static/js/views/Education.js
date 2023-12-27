import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Education");
    }

    async getHtml() {
        // Fetch the events data from the JSON file
        const events = await this.fetchEducationEvents();

        // Generate HTML based on the events
        const eventsHtml = events.map(event => `
            <div>
                <h2>${event.month} ${event.year}</h2>
                // <p>Type: ${event.type}</p>
                // <p>Description: ${event.description}</p>
                // <p>Where: ${event.where}</p>
                // ${event.more ? `<p>More: ${event.more}</p>` : ''}
            </div>
        `).join('');

        // Return the final HTML
        return `
            <h1>Education</h1>
            ${eventsHtml}
        `;
    }

    async fetchEducationEvents() {
        // Fetch the JSON file from the "assets" folder
        const response = await fetch('./assets/data/events.json');

        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }

        // Parse the JSON data
        const eventsData = await response.json();

        return eventsData;
    }
}
