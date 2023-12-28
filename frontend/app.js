import eventsData from './static/assets/data/events.json' assert { type: "json" };

// Your SPA logic here...
console.log(eventsData);


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
  