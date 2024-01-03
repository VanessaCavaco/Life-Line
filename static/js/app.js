import eventsData from '../assets/data/events.json' assert { type: "json" };

// Your SPA logic here...
console.log(eventsData);

//********** load education page
        
async function loadEducationPage() {
  //gets educational html view
  const response = await fetch('./static/html/Education.html');
  if (!response.ok) {
      throw new Error(`Failed to fetch Education.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const educationHtml = await response.text();
  //Append the fectched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', educationHtml);
}

async function addEducationEvents() {
  // gets education events container
  const educationEventsContainer = document.getElementById('educationEvents-container');
  console.log('container education', educationEventsContainer)
   // Assuming eventsData is already available
  if (!eventsData) {
    // Handle the case where eventsData is not available
    educationEventsContainer.innerHTML = '<p>No events data available.</p>';
    return;
  }
  //Get only learn events and creates html
  const educationEventsHtml = eventsData.filter((event) => event.type ==='Learn').map(event => `
    <div>
        <h2>${event.month} ${event.year}</h2>
        <p>Type: ${event.type}</p>
        <p>Description: ${event.description}</p>
        <p>Where: ${event.where}</p>
        ${event.more ? `<p>More: ${event.more}</p>` : ''}
    </div>
  `).join('');
  console.log('educationEventsHtml', educationEventsHtml)
  // Append the generated HTML to the container
  educationEventsContainer.innerHTML = educationEventsHtml;
}

async function loadAboutMePage() {
  // gets HTML About me view
  const response = await fetch('./static/html/AboutMe.html');
  if (!response.ok) {
    throw new Error(`Failed to fetch AboutMe.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const aboutMeHtml = await response.text();
  //append th fetched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', aboutMeHtml);
  console.log('about me html', aboutMeHtml)
};

////////////////////////Execute methods\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//DOM Listener makes sure all the content is loadel befere execute the methods
document.addEventListener('DOMContentLoaded', async () => {
  // loads About me page
  await loadAboutMePage();
  // Call the function to load 'education.html' and execute subsequent logic
  await loadEducationPage();   
  // call function to add education events
  addEducationEvents();  
});
