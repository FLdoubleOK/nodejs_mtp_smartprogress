// Global variable to store fetched data
let allData = [];
const registerNo = document.getElementById("searchBox").value.trim(); // Get search input
const RegisterNo = document.getElementById("Register_No").value;
// console.log('mainjs :' + RegisterNumber)
// ตรวจสอบว่า registerNo มีค่าหรือไม่
// if (!RegisterNo) {
//   console.error("Register_No is empty");
//   document.getElementById("dataBox").innerHTML =
//     "<tr><td colspan='10'>Please enter a Register_No</td></tr>";
//   return;
// }

// Function to fetch data from the server using Axios
async function fetchData(RegisterNo) {
  try {
    // Send a get request to the backend API with the Register_No
    const response = await axios.get(
      `/mtp/fetchDataByRegisterNo/${RegisterNo}`,
      {
        headers: {
          "Content-Type": "application/json", // Ensure correct Content-Type
        },
      }
    );
    console.log("script: ", response)
    if (response.data.success) {
      allData = response.data.data; // Store the data globally for filtering
      
      displayData(allData); // Display all data initially
    } else {
      console.error("Error fetching data:", response.data.error);
      document.getElementById("dataBox").innerHTML =
        "<tr><td colspan='10'>No data found</td></tr>";
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    document.getElementById("dataBox").innerHTML =
      "<tr><td colspan='10'>Error fetching data</td></tr>";
  }
}

// Function to display data in the table
function displayData(data) {
  
  const tableBody = document.getElementById("dataBox");
  tableBody.innerHTML = ""; // Clear the table body

  // ตรวจสอบว่ามีข้อมูลหรือไม่
  if (!data || data.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='10'>No data found</td></tr>";
    return;
  }

  // Iterate over the data and create table rows
  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.Register_No || ""}</td>
      <td>${row.PartName || ""}</td>
      <td>${row.Qty || ""}</td>
      <td>${row.Maker || ""}</td>
      <td>${row.Maker_Making || ""}</td>
      <td>${row.Material_Cost || ""}</td>
      <td>${row.STD_part_Cost || ""}</td>
      <td>${row.MaterialTime || ""}</td>
      <td>${row.MakingTime || ""}</td>
      <td>${row.FinishingTime || ""}</td>
      <td>${row.QcTime || ""}</td>
      <td>${row.AssemblyTime || ""}</td>
      <td>${row.PackingTime || ""}</td>
      <td>${row.Process_Cost || ""}</td>
      <td>${row.TTL || ""}</td>
      <td>${row.FinishedDate ? new Date(row.FinishedDate).toLocaleDateString() : ""}</td>
      <td>${row.Progress || ""}</td>
    `;
    tableBody.appendChild(tr);
     // Append the row to the table body
  });
}
document.getElementById("searchButton").addEventListener("click", () => {
  fetchData(); // เรียกฟังก์ชัน fetchData เมื่อผู้ใช้พิมพ์ในช่องค้นหา
});
// Function to filter table based on the search input
function filterTable() {
  fetchData(RegisterNo); // Fetch data for the specific Register_No
}


document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed.");
  // Your JavaScript function here
  fetchData(RegisterNo);
});