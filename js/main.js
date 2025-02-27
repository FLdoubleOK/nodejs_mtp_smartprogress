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
      // STD:
      //   row.getAttribute("data-std") !== null &&
      //   parseInt(row.getAttribute("data-vendor")) === 1 ? 1 : 0,
      STD:
        (row.getAttribute("data-std").length > 1 &&
          parseInt(row.getAttribute("data-vendor")) === 1) ||
        (row.getAttribute("data-std") === "stock" &&
          parseInt(row.getAttribute("data-qc")) === 1)
          ? 1
          : 0,
      Vendor: parseInt(row.getAttribute("data-vendor")) || 0,
      Material: parseInt(row.getAttribute("data-material")) || 0,
      Production: parseInt(row.getAttribute("data-production")) || 0,
      Gauge_Making:
        workCategory === "Gauge making" &&
        (parseInt(row.getAttribute("data-production")) === 1 ||
          parseInt(row.getAttribute("data-qc")) === 1)
          ? 1
          : 0,
      QC: parseInt(row.getAttribute("data-qc")) || 0,
      Finish: parseInt(row.getAttribute("data-finish")) || 0,
    };
    
    // ตัวแปรสำหรับเก็บสถานะขั้นตอนทั้งหมด
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
        circles[index].classList.remove("inactive"); // ลบ inactive หากมี
        lastActiveIndex = index; // เก็บค่าของ index สุดท้ายที่ active
      } else {
        circles[index].classList.remove("active");
        circles[index].classList.remove("done");
        circles[index].innerHTML = index + 1; // แสดงตัวเลข
      }
    });
        // กำหนดให้วงกลมระหว่าง active และ inactive มีสีทึบ
        for (let i = 0; i < lastActiveIndex; i++) {
          if (steps[i] ===0) {
            circles[i].classList.add("before-active"); // เพิ่มคลาสสีทึบ
          } else {
            circles[i].classList.remove("before-active"); // ลบคลาสสีทึบ หากไม่เข้าเงื่อนไข
          }
        }
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


    // // ตัวแปรเก็บ flow ที่จะใช้
    // let flow = [];
    // // เลือก flow ตาม WorkCategory และเงื่อนไข
    // if (workCategory === "Gauge making") {
    //   if (row.getAttribute("data-maker_making").length > 1) {
    //     flow = [1, 6, 7, 8]; // Flow: (1,6,7,8)
    //   } else {
    //     flow = [1, 5, 6, 7, 8]; // Flow: (1,5,6,7,8)
    //   }
    // } else {
    //   if (
    //     row.getAttribute("data-maker") === "null" &&
    //     row.getAttribute("data-std") === "null"
    //   ) {
    //     // ไม่ใช่ STD Part
    //     console.log("1 ", row);
    //     flow = [1, 4, 5, 7, 8]; // Flow: (1,4,5,7,8)
    //   } else if (
    //     row.getAttribute("data-std") !== "Stock" &&
    //     row.getAttribute("data-maker").length > 1
    //   ) {
    //     // STD Part
    //     console.log("2 ", row);
    //     flow = [1, 2, 3, 7, 8]; // Flow: (1,2,3,7,8)
    //   } else if (row.getAttribute("data-std") === "Stock") {
    //     // STD Part with 'stock'
    //     console.log("3 ", row);
    //     flow = [1, 2, 7, 8]; // Flow: (1,2,7,8)
    //   } else {
    //     console.log(row);
    //   }
    // }