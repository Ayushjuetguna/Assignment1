document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const excludedDatesInput = document.getElementById("excluded-dates");
  const monthYearInput = document.getElementById("month-year");
  const numberOfDaysInput = document.getElementById("number-of-days");
  const numberOfLeadsInput = document.getElementById("number-of-leads");
  const expectedLeadCountInput = document.getElementById("expected-lead-count");
  const saveButton = document.getElementById("save-button");

  // Event listeners for date input changes
  startDateInput.addEventListener("input", updateDateRange);
  endDateInput.addEventListener("input", updateDateRange);
  excludedDatesInput.addEventListener("input", updateDateRange);

  // Event listener for Save button
  saveButton.addEventListener("click", saveData);

  // Function to update the Month, Year, Number of Days, and Expected Lead Count
  function updateDateRange() {
    // Get the selected start and end dates
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    // Validate if the end date is not preceding the start date
    if (startDate > endDate) {
      alert("End date cannot precede the start date.");
      endDateInput.value = startDateInput.value;
      return;
    }

    // Parse and validate the excluded dates
    const excludedDates = excludedDatesInput.value
      .split(",")
      .map((date) => date.trim())
      .filter((date) => date.match(/^\d{4}-\d{2}-\d{2}$/));

    // Calculate the number of days excluding the excluded dates
    const oneDay = 24 * 60 * 60 * 1000;
    let currentDate = new Date(startDate);
    let days = 0;

    while (currentDate <= endDate) {
      if (!excludedDates.includes(formatDate(currentDate))) {
        days++;
      }
      currentDate.setTime(currentDate.getTime() + oneDay);
    }

    // Set the Month, Year, Number of Days, and Expected Lead Count
    monthYearInput.value = `${
      startDate.getMonth() + 1
    }, ${startDate.getFullYear()}`;
    numberOfDaysInput.value = days;
    expectedLeadCountInput.value = numberOfLeadsInput.value * days;
  }

  // Function to format a date as 'YYYY-MM-DD'
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Function to save data using Ajax (placeholder function)
  function saveData() {
    function saveData() {
      // Get the values you want to send to the server
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;
      const excludedDates = excludedDatesInput.value;
      const numberOfLeads = numberOfLeadsInput.value;
      const expectedLeadCount = expectedLeadCountInput.value;

      // Define the URL where you want to send the data
      const saveUrl = "your-server-endpoint"; // Replace with your actual server endpoint

      // Prepare the data to send to the server (you can use JSON if needed)
      const data = {
        startDate,
        endDate,
        excludedDates,
        numberOfLeads,
        expectedLeadCount,
      };

      // Define the fetch options for a POST request
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Adjust the content type as needed
        },
        body: JSON.stringify(data), // Convert data to JSON format
      };

      // Send the POST request using fetch
      fetch(saveUrl, fetchOptions)
        .then((response) => {
          if (response.ok) {
            return response.json(); // If server sends a response, you can process it here
          } else {
            throw new Error("Failed to save data.");
          }
        })
        .then((responseData) => {
          // Handle the response from the server if needed
          alert("Data saved successfully.");
        })
        .catch((error) => {
          console.error(error);
          alert("Error: Data could not be saved.");
        });
    }
    alert("Data saved using Ajax.");
  }
});
