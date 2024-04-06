//Imports events.json data
import eventsData from '../assets/data/events.json' with { type: "json" };
import eventsTypeHierarchy from '../assets/data/eventsTypeHierarchy.json' with { type: "json" };

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

// Extract unique years
const uniqueYears = [...new Set(eventsData.map(item => item.year))];

// //********** load About Me page **********\\  
// async function loadAboutMePage() {
//   // gets HTML About me view
//   const response = await fetch('./static/html/AboutMe.html');
//   if (!response.ok) {
//     throw new Error(`Failed to fetch AboutMe.html: ${response.status}`);
//   }
//   //awaits the fectch response if it is successfull
//   const aboutMeHtml = await response.text();
//   //append the fetched html content to 'app' div
//   document.getElementById('app').insertAdjacentHTML('beforeend', aboutMeHtml);
// };

//********** load event html **********\\     
async function loadEventsContainer(eventType) {
  //gets experience html view
  const response = await fetch(`./static/html/${eventType}.html`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${eventType}.html: ${response.status}`);
  }
  //awaits the fectch response if it is successfull
  const eventsContainer = await response.text();
  //Append the fectched html content to 'app' div
  document.getElementById('app').insertAdjacentHTML('beforeend', eventsContainer);
}
//********** load years divs ************\\
function addYear(year) {
  // Create a new div element
  var newYearDiv = document.createElement('div');
  // Assign an id to the new div
  newYearDiv.id = `${year}`;
   // Assign a class year to the new div
   newYearDiv.className = "year";
  // Add content to the new div (optional)
  newYearDiv.textContent = `${year}`;
    // Create a new div element for Experience, Education, Projects and line
    let experienceDiv = document.createElement('div');
    let educationDiv = document.createElement('div');
    let project1Div = document.createElement('div');
    let project2Div = document.createElement('div');
    let lineDiv = document.createElement('div');
    //Assign the class for each div
    experienceDiv.className = "year-experience";
    educationDiv.className = "year-education";
    project1Div.className = "year-projects1";
    project2Div.className = "year-projects2";
    lineDiv.className = "year-line";
    //append to newYearDiv
    newYearDiv.appendChild(experienceDiv);
    newYearDiv.appendChild(educationDiv);
    newYearDiv.appendChild(project1Div);
    newYearDiv.appendChild(project2Div);
    newYearDiv.appendChild(lineDiv);
  // Get the container div where you want to add the new div
  var containerDiv = document.getElementById('yearsStructure');
  // Append the new div to the container div
  containerDiv.appendChild(newYearDiv);
}

//********** add events to html **********\\     
async function addEvents(eventType,type) {
  // gets experience events container
  const eventsContainer = document.getElementById(`${eventType}Events-container`);
   // Assuming eventsData is already available
  if (!eventsData) {
    // Handle the case where eventsData is not available
    eventsContainer.innerHTML = '<p>No events data available.</p>';
    return;
  }
  //Get only eventType events and creates html
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
  // loads About me page
  await loadEventsContainer("aboutMe");
  //loads Years Structure
  await loadEventsContainer("yearsStructure");
  //add years divs
  for(let year in uniqueYears){
    addYear(uniqueYears[year]);
  }
  //Loads other pages and events
  eventsTypeHierarchy.forEach(async(event)=>{
    await loadEventsContainer(event.eventTypeName)
    await addEvents(event.eventTypeName, event.type)
  })
});
