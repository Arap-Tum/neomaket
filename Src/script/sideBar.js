const toggleBtn = document.querySelector('.toggle-btn');
const sidebarPlaceholder = document.querySelector('.sidebar');

// Toggle Sidebar
toggleBtn.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click on the toggle button from propagating
    if (sidebarPlaceholder.classList.contains('active')) {
        // Hide sidebar if active
        sidebarPlaceholder.classList.remove('active');
    } else {
        // Check if sidebar content is already loaded
        if (sidebarPlaceholder.innerHTML.trim() === '') {
            // Load sidebar content dynamically
            fetch('/pages/sidebar.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(html => {
                    // Inject the HTML into the sidebar
                    sidebarPlaceholder.innerHTML = html;

                    // Add the "active" class to show the sidebar
                    sidebarPlaceholder.classList.add('active');

                    // Set up any additional functionality for the dynamically loaded content
                    setupSidebarEvents();
                })
                .catch(err => console.error('Error loading sidebar:', err));
        } else {
            // Sidebar content already loaded, just show it
            sidebarPlaceholder.classList.add('active');
        }
    }
});

// Function to handle additional events for the dynamically loaded sidebar
function setupSidebarEvents() {
    // Example: Add event listener to the "remove-sidebar" button
    const removeButton = sidebarPlaceholder.querySelector('.remove-sidebar');
    if (removeButton) {
        removeButton.addEventListener('click', () => {
            sidebarPlaceholder.classList.remove('active'); // Hide the sidebar
            console.log('Sidebar removed!');
        });
    }
}

// Hide sidebar when clicking outside of it
document.addEventListener('click', (event) => {
    if (
        sidebarPlaceholder.classList.contains('active') &&
        !sidebarPlaceholder.contains(event.target) && // Check if click is outside the sidebar
        !toggleBtn.contains(event.target) // Check if click is not on the toggle button
    ) {
        sidebarPlaceholder.classList.remove('active');
    }
});
