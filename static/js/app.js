//Imports events.json data
import eventsData from '../assets/data/events.json' assert { type: "json" };

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

//********** load experience page **********\\     
async function loadExperiencePage() {
  //gets experience html view
  const response = await fetch('./static/html/Experience.html');
  if (!response.ok) {
      throw new Error(`Failed to fetch Experience.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const experienceHtml = await response.text();
  //Append the fectched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', experienceHtml);
}

async function addExperienceEvents() {
  // gets experience events container
  const experienceEventsContainer = document.getElementById('experienceEvents-container');
   // Assuming eventsData is already available
  if (!eventsData) {
    // Handle the case where eventsData is not available
    experienceEventsContainer.innerHTML = '<p>No events data available.</p>';
    return;
  }
  //Get only learn events and creates html
  const experienceEventsHtml = eventsData.filter((event) => event.type ==='Work').map(event => `
    <div>
      <h2>${event.month} ${event.year}</h2>
      <p>Type: ${event.type}</p>
      <p>Description: ${event.description}</p>
      <p>Where: ${event.where}</p>
      ${event.more ? `<p>More: ${event.more}</p>` : ''}
    </div>
  `).join('');
  console.log("experience events", experienceEventsHtml)
  // Append the generated HTML to the container
  experienceEventsContainer.innerHTML = experienceEventsHtml;
}

//********** load education page **********\\     
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
  // Append the generated HTML to the container
  educationEventsContainer.innerHTML = educationEventsHtml;
}

//********** load projects page **********\\     
async function loadProjectsPage() {
  //gets projects html view
  const response = await fetch('./static/html/Projects.html');
  if (!response.ok) {
      throw new Error(`Failed to fetch Projects.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const projectsHtml = await response.text();
  //Append the fectched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', projectsHtml);
}

async function addProjectsEvents() {
  // gets projects events container
  const projectsEventsContainer = document.getElementById('projectsEvents-container');
   // Assuming eventsData is already available
  if (!eventsData) {
    // Handle the case where eventsData is not available
    projectsEventsContainer.innerHTML = '<p>No events data available.</p>';
    return;
  }
  //Get only learn events and creates html
  const projectsEventsHtml = eventsData.filter((event) => event.type ==='Project').map(event => `
    <div>
    <h2>${event.month} ${event.year}</h2>
    <p>Type: ${event.type}</p>
    <p>Description: ${event.description}</p>
    <p>Where: ${event.where}</p>
    ${event.more ? `<p>More: ${event.more}</p>` : ''}
    </div>
  `).join('');
  // Append the generated HTML to the container
  projectsEventsContainer.innerHTML = projectsEventsHtml;
}

//********** load life page **********\\     
async function loadLifePage() {
  //gets life html view
  const response = await fetch('./static/html/Life.html');
  if (!response.ok) {
      throw new Error(`Failed to fetch Life.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const lifeHtml = await response.text();
  //Append the fectched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', lifeHtml);
}

async function addLifeEvents() {
  // gets life events container
  const lifeEventsContainer = document.getElementById('lifeEvents-container');
   // Assuming eventsData is already available
  if (!eventsData) {
    // Handle the case where eventsData is not available
    lifeEventsContainer.innerHTML = '<p>No events data available.</p>';
    return;
  }
  //Get only life events and creates html
  const lifeEventsHtml = eventsData.filter((event) => event.type ==='Life').map(event => `
    <div>
      <h2>${event.month} ${event.year}</h2>
      <p>Type: ${event.type}</p>
      <p>Description: ${event.description}</p>
      <p>Where: ${event.where}</p>
      ${event.more ? `<p>More: ${event.more}</p>` : ''}
    </div>
  `).join('');
  console.log("life events",lifeEventsHtml)
  // Append the generated HTML to the container
  lifeEventsContainer.innerHTML = lifeEventsHtml;
}

////////////////////////Execute methods\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//DOM Listener makes sure all the content is loaded befere execute the methods
document.addEventListener('DOMContentLoaded', async () => {
  // loads About me page
  await loadAboutMePage();
  // Call the function to load 'experience.html' and execute subsequent logic
  await loadExperiencePage();   
  // call function to add experience events
  addExperienceEvents();
  // Call the function to load 'education.html' and execute subsequent logic
  await loadEducationPage();   
  // call function to add education events
  addEducationEvents();  
  // Call the function to load 'projects.html' and execute subsequent logic
  await loadProjectsPage();   
  // call function to add projects events
  addProjectsEvents();  
  // Call the function to load 'life.html' and execute subsequent logic
  await loadLifePage();   
  // call function to add projects events
  addLifeEvents();  
});
