
// Get the preloader and main content elements

const preloader = document.getElementById('preloader');

const mainContent = document.getElementById('main-content');


// Set a timeout to hide the preloader after 60 seconds

setTimeout(() => {

  // Hide the preloader

  preloader.style.display = 'none';

  

  // Show the main content

  mainContent.style.display = 'block';

}, 3000); // 30000 milliseconds = 3 seconds