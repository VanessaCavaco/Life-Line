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
  let newYearDiv = document.createElement('div');
  // Assign an id to the new div
  newYearDiv.id = `${year}`;
  // Assign a class year to the new div
  newYearDiv.className = "year";
  // Add content to the new div (optional)
  //newYearDiv.textContent = `${year}`;
    // Create a new div element for Experience, Education, Projects and line
    let rightDiv = document.createElement('div');
    let leftDiv = document.createElement('div');
    let lineDiv = document.createElement('div');
    //Assign the class for each div
    rightDiv.className = "year-right";
    leftDiv.className = "year-left";
    lineDiv.className = "year-line";
    //append to newYearDiv
    newYearDiv.appendChild(rightDiv);
    newYearDiv.appendChild(leftDiv);
    newYearDiv.appendChild(lineDiv);
  // Get the container div where you want to add the new div
  let containerDiv = document.getElementById('yearsStructure');
  // Append the new div to the container div
  containerDiv.appendChild(newYearDiv);
}

//********** add events to html **********\\     
async function addEvents() {
   // Assuming eventsData is already available
  if (!eventsData) {
    // Handle the case where eventsData is not available
    eventsContainer.innerHTML = '<p>No events data available.</p>';
    return;
  }
  eventsData.forEach(event => {
    //get the container accordingly with the year and event type
    const yearContainer = document.getElementById(`${event.year}`);
    const yearRightDiv = yearContainer.querySelectorAll('.year-right')[0];
    const yearLeftDiv = yearContainer.querySelectorAll('.year-left')[0];
    
    //Keywords to string
    let keywordsString = "#";
    if(event.keywords.length>0){
      keywordsString += event.keywords.join(" #");
    } else{
      keywordsString = "";
    }

    const eventsHtml =  `
    <div class = "event-${event.type}">
    <h2>${event.month} ${event.year}</h2>
    <p>${event.where}</p>
    <p>${event.description}</p>
    ${event.more ? `<p>${event.more}</p>` : ''}
    ${keywordsString ? `<p>${keywordsString}</p>` : ''}
    </div>
     `
    // Append the generated HTML to the container
    if (event.type == "Learn") {
       yearLeftDiv.innerHTML = eventsHtml;
    }else if(event.type == "Work"){
      yearRightDiv.innerHTML = eventsHtml;
    }else if(event.type == "Project"){
      event.year%2 != 0 ? yearLeftDiv.innerHTML = eventsHtml : yearRightDiv.innerHTML = eventsHtml;
    }
  });
}

////////////////////////Execute methods\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//DOM Listener makes sure all the content is loaded before execute the methods
document.addEventListener('DOMContentLoaded', async () => {  
  // loads About me page
  await loadEventsContainer("aboutMe");
  //loads Years Structure
  await loadEventsContainer("yearsStructure");
  // loads Life page
  await loadEventsContainer("life");
  //add years divs
  for(let year in uniqueYears){
    addYear(uniqueYears[year]);
  }
  //Load Events
  await addEvents();
});
