// Function to include an HTML file into a placeholder
function includeHTML(filePath, elementId) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch " + filePath);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => console.error(error));
  }
  
  // Load header and footer
  includeHTML('./pages/footer.html', 'footer');
  includeHTML('./pages/scroll-shop.html', 'scrollShop');
 
  

