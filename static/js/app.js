//Imports events.json data
import eventsData from '../assets/data/events.json' assert { type: "json" };

//********** order in reverse the evente **********\\  
const monthOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

eventsData.sort((a, b) => {
  // Compare years first
  const yearComparison = b.year.localeCompare(a.year);

  // If years are equal, compare months based on their index in monthOrder
  if (yearComparison === 0) {
      const monthIndexA = monthOrder.indexOf(a.month);
      const monthIndexB = monthOrder.indexOf(b.month);

      return monthIndexB - monthIndexA;
  }
  return yearComparison;
});

console.log(eventsData);

//********** load About Me page **********\\  
async function loadAboutMePage() {
  // gets HTML About me view
  const response = await fetch('./static/html/AboutMe.html');
  if (!response.ok) {
    throw new Error(`Failed to fetch AboutMe.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const aboutMeHtml = await response.text();
  //append the fetched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', aboutMeHtml);
};

//********** load event html**********\\     
async function loadEventHtml(eventType) {
  //gets experience html view
  const response = await fetch(`./static/html/${eventType}.html`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${eventType}.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const eventHtml = await response.text();
  //Append the fectched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', eventHtml);
}

//********** add events to html**********\\     
async function addEvents(eventType,type) {
  // gets experience events container
  const eventsContainer = document.getElementById(`${eventType}Events-container`);
   // Assuming eventsData is already available
  if (!eventsData) {
    // Handle the case where eventsData is not available
    eventsContainer.innerHTML = '<p>No events data available.</p>';
    return;
  }
  //Get only eventTypw events and creates html
  const eventsHtml = eventsData.filter((event) => event.type === type).map(event => `
    <div>
      <h2>${event.month} ${event.year}</h2>
      <p>Type: ${event.type}</p>
      <p>Description: ${event.description}</p>
      <p>Where: ${event.where}</p>
      ${event.more ? `<p>More: ${event.more}</p>` : ''}
    </div>
  `).join('');
  console.log(`${eventType} events`, eventsHtml)
  // Append the generated HTML to the container
  eventsContainer.innerHTML = eventsHtml;
}

////////////////////////Execute methods\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//DOM Listener makes sure all the content is loaded before execute the methods
document.addEventListener('DOMContentLoaded', async () => {
  // // loads About me page
  await loadEventHtml("aboutMe");
  // Call the function to load 'experience.html' and execute subsequent logic
  await loadEventHtml("experience");
  // call function to add experience events
  await addEvents("experience","Work");
  // Call the function to load 'education.html' and execute subsequent logic
  await loadEventHtml("education");
  // call function to add education events
  await addEvents("education","Learn");
  // Call the function to load 'projects.html' and execute subsequent logic
  await loadEventHtml("projects");
  // call function to add projects events
  await addEvents("projects","Project");
  // Call the function to load 'life.html' and execute subsequent logic
  await loadEventHtml("life");
  // call function to add projects events
  await addEvents("life","Life");
});
