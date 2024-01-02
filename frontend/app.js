import eventsData from './static/assets/data/events.json' assert { type: "json" };

// Your SPA logic here...
console.log(eventsData);

//*********** other option to fectch the json file.
// async function fetchData() {
//     try {
//       const response = await fetch('./static/assets/data/events.json');
//       if (!response.ok) {
//         throw new Error(`Failed to fetch JSON: ${response.status}`);
//       }
  
//       const jsonData = await response.json();
//       console.log(jsonData);
//     } catch (error) {
//       console.error('Error fetching JSON:', error);
//     }
//   }
  
//   fetchData();


//*********** function to load the html pages
const order = [
  './static/html/AboutMe.html',
  './static/html/Education.html',
];

const router = async () => {
  const container = document.querySelector('#app');

  // Load HTML files sequentially based on the predefined order
  for (const page of order) {
      const view = await fetchHtml(page);
      appendHtml(container, view);
      await sleep(1000); // Optional delay between loading each page
  }
};

const fetchHtml = async (page) => {
  const response = await fetch(page);
  if (!response.ok) {
      throw new Error(`Failed to fetch HTML: ${response.status}`);
  }
  return response.text();
};

const appendHtml = (container, html) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  
  // Append the content of the wrapper to the container
  while (wrapper.firstChild) {
      container.appendChild(wrapper.firstChild);
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Trigger the router
router();

