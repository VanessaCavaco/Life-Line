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
function addYears(yearArray) {
  // Get the container div where you want to add the new div
  let containerDiv = document.getElementById('yearsStructure');
  if(yearArray.length>0){
    for(let year in yearArray){
      // Create a new div element
      let newYearDiv = document.createElement('div');
      // Assign an id to the new div
      newYearDiv.id = `${yearArray[year]}`;
      // Assign a class year to the new div
      newYearDiv.className = "year";
      // Create a new div element for right and left and adds className
      let rightDiv = document.createElement('div');
      rightDiv.className = "year-right";
      let leftDiv = document.createElement('div');
      leftDiv.className = "year-left";
      // Create a new div element for Line and add className
      let lineDiv
      if(year == 0){
        lineDiv = document.createElement('div');
        lineDiv.className = "year-lineTop";
      }else if(year == yearArray.length-1){
        lineDiv = document.createElement('div');
        lineDiv.className = "year-lineBottom"; 
      }else{
        lineDiv = document.createElement('div');
        lineDiv.className = "year-line"; 
      }
      //append to newYearDiv
      newYearDiv.appendChild(rightDiv);
      newYearDiv.appendChild(leftDiv);
      newYearDiv.appendChild(lineDiv);
      // Append the new div to the container div
      containerDiv.appendChild(newYearDiv);
    }
  }
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
    ${keywordsString ? `<p class="keywords">${keywordsString}</p>` : ''}
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
  addYears(uniqueYears);
  //Load Events
  await addEvents();
});
