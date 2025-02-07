// Global variable to store fetched data
let allData = [];
const registerNo = document.getElementById("searchBox").value.trim(); // Get search input

// Function to fetch data from the server using Axios
async function fetchData() {
  try {
    // Send a POST request to the backend API with the Register_No
    const response = await axios.post(
      "/mtp/fetchDataByRegisterNo",
      { Register_No: registerNo }, // Send the search value (can be empty)
      {
        headers: {
          "Content-Type": "application/json", // Ensure correct Content-Type
        },
      }
    );

    if (response.data.success) {
      allData = response.data.data; // Store the data globally for filtering
      displayData(allData); // Display all data initially
    } else {
      console.error("Error fetching data:", response.data.error);
      document.getElementById("dataBox").innerHTML = "<tr><td colspan='10'>No data found</td></tr>";
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    document.getElementById("dataBox").innerHTML = "<tr><td colspan='10'>Error fetching data</td></tr>";
  }
}

// Function to display data in the table
function displayData(data) {
  const tableBody = document.getElementById("dataBox");
  tableBody.innerHTML = ""; // Clear the table body

  // Iterate over the data and create table rows
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.Register_No}</td>
      <td>${row.PartName || ""}</td>
      <td>${row.Qty || ""}</td>
      <td>${row.TP_Process || ""}</td>
      <td>${row.RequireDate || ""}</td>
      <td>${row.PlanMaking || ""}</td>
      <td>${row.Rank || ""}</td>
      <td>${row.Remark || ""}</td>
      <td>${row.MonitorPlan || ""}</td>
      <td>${row.StatusProcess || ""}</td>
    `;
    tableBody.appendChild(tr); // Append the row to the table body
  });
}

// Function to filter table based on the search input
function filterTable() {
  fetchData(registerNo); // Fetch data for the specific Register_No
}

// Call fetchData when the page loads
fetchData();
