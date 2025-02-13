document.addEventListener("DOMContentLoaded", () => {
  // ค้นหาทุกแถว (rows) ในตาราง
  const rows = document.querySelectorAll("tbody tr");
  const workCategoryElement = document.querySelector("[data-workcategory]");
  const workCategory = workCategoryElement.getAttribute("data-workcategory");
  console.log(workCategory);
  rows.forEach((row) => {
    // ค้นหา Progress Bar ในแต่ละแถว
    const progressBar = row.querySelector(".progress-bar .indicator");
    const circles = row.querySelectorAll(".circle");
    // ดึงค่าจาก item ที่แสดงในตาราง (อาจมาจาก EJS)
    const item = {
      Planning: parseInt(row.getAttribute("data-planning")) || 0,
      STD:
        row.getAttribute("data-std") !== null &&
        parseInt(row.getAttribute("data-vendor")) === 1
          ? 1
          : 0,
      Vendor: parseInt(row.getAttribute("data-vendor")) || 0,
      Material: parseInt(row.getAttribute("data-material")) || 0,
      Production: parseInt(row.getAttribute("data-production")) || 0,
      // Gauge_Making: parseInt(row.getAttribute("data-gauge-making")) || 0,
      Gauge_Making:
        workCategory && parseInt(row.getAttribute("data-production")) === 1
          ? 1
          : 0,
      QC: parseInt(row.getAttribute("data-qc")) || 0,
      Finish: parseInt(row.getAttribute("data-finish")) || 0,
    };

    // ตัวแปรสำหรับเก็บสถานะขั้นตอนทั้งหมด
    //   const steps = [
    //     item.Planning,
    //     item.STD,
    //     item.Vendor,
    //     item.Material,
    //     item.Production,
    //     item.Gauge_Making,
    //     item.QC,
    //     item.Finish,
    //   ];
    const steps = [
      item.Planning,
      item.STD,
      item.Vendor,
      item.Material,
      item.Production,
      item.Gauge_Making,
      item.QC,
      item.Finish,
    ];

    // อัปเดตสถานะของวงกลมและ Progress Bar
    let lastActiveIndex = -1;
    steps.forEach((step, index) => {
      if (step === 1) {
        circles[index].classList.add("active");
        circles[index].classList.add("done");
        circles[index].innerHTML = "";
        lastActiveIndex = index; // เก็บค่าของ index สุดท้ายที่ active
      } else {
        circles[index].classList.remove("active");
        circles[index].classList.remove("done");
      }
    });
    // ตรวจสอบว่า step สุดท้ายคือ Finish หรือไม่
    if (lastActiveIndex === steps.length - 1 && steps[lastActiveIndex] === 1) {
      // ถ้าเป็น Finish และเสร็จสมบูรณ์
      circles[lastActiveIndex].classList.add("done"); // เพิ่มคลาส done
      //circles[lastActiveIndex].innerHTML = "✓"; // แสดงเครื่องหมายติ้กถูก
    } else if (lastActiveIndex >= 0) {
      // ถ้าเป็น step ล่าสุดแต่ไม่ใช่ Finish
      circles[lastActiveIndex].classList.remove("done"); // ลบคลาส done
      circles[lastActiveIndex].classList.remove("active"); // ลบคลาส done
      circles[lastActiveIndex].classList.add("active1"); // ลบคลาส done
      circles[lastActiveIndex].classList.add("final-step"); // เพิ่มคลาส current-step
      //   circles[lastActiveIndex].classList.add("current-step"); // เพิ่มคลาส current-step
      circles[lastActiveIndex].innerHTML = lastActiveIndex + 1; // แสดงตัวเลข
    }
    // อัปเดตความกว้างของ Progress Bar (เส้นสีเขียว)
    if (lastActiveIndex >= 0) {
      progressBar.style.width = `${
        (lastActiveIndex / (circles.length - 1)) * 100
      }%`;
    } else {
      progressBar.style.width = "0%";
    }
  });
});
// อัปเดตความกว้างของ Progress Bar (เส้นสีฟ้า)
// if (lastActiveIndex >= 0) {
//   progressBar.style.width = `${
//     (lastActiveIndex / (circles.length - 1)) * 100
//   }%`;
// } else {
//   progressBar.style.width = "0%";
// }
// if (lastActiveIndex >= 0) {
//   circles[lastActiveIndex].classList.remove("active");
//   circles[lastActiveIndex].classList.add("active1");
//   circles[lastActiveIndex].classList.add("final-step");
// }
//   circles.forEach((circle, index) => {
//     if (index === lastActiveIndex) {
//       circle.classList.add("final-step"); // เพิ่มคลาส final-step
//     } else {
//       circle.classList.remove("final-step"); // ลบคลาส final-step ออกจากจุดอื่น
//     }
//   });

// // Global variable to store fetched data
// console.log("main.js is working");
// let allData = [];
// const _Register_No = [];
// const registerNo = document.getElementById("searchBox").value.trim(); // Get search input
// // const RegisterNo = document.getElementById("globalRegister").innerText.trim();
// // console.log("RegisterNo from EJS:", RegisterNo);
// // console.log('mainjs :' + RegisterNumber)
// // ตรวจสอบว่า registerNo มีค่าหรือไม่
// // if (!RegisterNo) {
// //   console.error("Register_No is empty");
// //   document.getElementById("dataBox").innerHTML =
// //     "<tr><td colspan='10'>Please enter a Register_No</td></tr>";
// //   return;
// // }
// async function fetchRegister() {
//   try {
//     const getRegister = await axios.get(
//       "http://localhost:5030/mtp/getRegister"
//     );
//     console.log("script: ", getRegister);
//     if (getRegister.data.success) {
//       _Register_No = getRegister.data.data; // Store the data globally for filtering
//       console.log("all data: ", allData);
//       displayData(allData); // Display all data initially
//     } else {
//       console.error("Error fetching data:", getRegister.data.error);
//       document.getElementById("dataBox").innerHTML =
//         "<tr><td colspan='10'>No data found</td></tr>";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     document.getElementById("dataBox").innerHTML =
//       "<tr><td colspan='10'>Error fetching data</td></tr>";
//   }
// }
// // Function to fetch data from the server using Axios
// async function fetchData(reg) {
//   try {
//     // Send a get request to the backend API with the Register_No
//     console.log("axios register: ", reg);
//     const urlAPI = "http://localhost:5030/mtp/fetchDataByRegisterNo/" + reg;
//     console.log(urlAPI);
//     // const response = await axios.get(
//     //   `/mtp/fetchDataByRegisterNo/${reg}`,
//     //   {
//     // const response = await axios.get(urlAPI, {
//     //   headers: {
//     //     "Content-Type": "application/json", // Ensure correct Content-Type
//     //   },
//     // });
//     const response = await axios.get(urlAPI);
//     console.log("script: ", response);
//     if (response.data.success) {
//       allData = response.data.data; // Store the data globally for filtering
//       console.log("all data: ", allData);
//       displayData(allData); // Display all data initially
//     } else {
//       console.error("Error fetching data:", response.data.error);
//       document.getElementById("dataBox").innerHTML =
//         "<tr><td colspan='10'>No data found</td></tr>";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     document.getElementById("dataBox").innerHTML =
//       "<tr><td colspan='10'>Error fetching data</td></tr>";
//   }
// }

// // Function to display data in the table
// function displayData(data) {
//   const tableBody = document.getElementById("dataBox");
//   tableBody.innerHTML = ""; // Clear the table body

//   // ตรวจสอบว่ามีข้อมูลหรือไม่
//   if (!data || data.length === 0) {
//     tableBody.innerHTML = "<tr><td colspan='10'>No data found</td></tr>";
//     return;
//   }

//   // Iterate over the data and create table rows
//   data.forEach((row) => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//       <td>${row.Register_No || ""}</td>
//       <td>${row.PartName || ""}</td>
//       <td>${row.Qty || ""}</td>
//       <td>${row.Maker || ""}</td>
//       <td>${row.Maker_Making || ""}</td>
//       <td>${row.Material_Cost || ""}</td>
//       <td>${row.STD_part_Cost || ""}</td>
//       <td>${row.MaterialTime || ""}</td>
//       <td>${row.MakingTime || ""}</td>
//       <td>${row.FinishingTime || ""}</td>
//       <td>${row.QcTime || ""}</td>
//       <td>${row.AssemblyTime || ""}</td>
//       <td>${row.PackingTime || ""}</td>
//       <td>${row.Process_Cost || ""}</td>
//       <td>${row.TTL || ""}</td>
//       <td>${
//         row.FinishedDate ? new Date(row.FinishedDate).toLocaleDateString() : ""
//       }</td>
//       <td>${row.Progress || ""}</td>
//     `;
//     tableBody.appendChild(tr);
//     // Append the row to the table body
//   });
// }
// // document.getElementById("searchButton").addEventListener("click", () => {
// //   fetchData(); // เรียกฟังก์ชัน fetchData เมื่อผู้ใช้พิมพ์ในช่องค้นหา
// // });
// // Function to filter table based on the search input
// // function filterTable() {
// //   fetchData(RegisterNo); // Fetch data for the specific Register_No
// // }

// document.addEventListener("DOMContentLoaded", function () {
//   console.log("DOM fully loaded and parsed.");
//   // Your JavaScript function here
//   fetchRegister()
//   fetchData(_Register_No);
// });
