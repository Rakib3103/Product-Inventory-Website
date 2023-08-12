// Function to create the small calendar
function createSmallCalendar() {
    const smallCalendar = document.getElementById('small-calendar');
    const currentDate = document.getElementById('current-date');
    const today = new Date();
    let selectedDate = new Date();

    // Function to update the calendar with the selected date
    function updateCalendar() {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        currentDate.textContent = selectedDate.toLocaleDateString('en-US', options);
    }

    // Initial rendering of the calendar
    updateCalendar();

    // Function to navigate the calendar
    function navigateCalendar(action) {
        if (action === 'prev') {
            selectedDate.setDate(selectedDate.getDate() - 1);
        } else if (action === 'next') {
            selectedDate.setDate(selectedDate.getDate() + 1);
        }

        // Re-render the calendar
        updateCalendar();
    }

    // Event listeners for calendar navigation
    smallCalendar.querySelector('.prev').addEventListener('click', () => navigateCalendar('prev'));
    smallCalendar.querySelector('.next').addEventListener('click', () => navigateCalendar('next'));
}

// Call the function to create the small calendar
createSmallCalendar();
