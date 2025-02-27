document.addEventListener("DOMContentLoaded", () => {
  // ค้นหาทุกแถว (rows) ในตาราง
  const rows = document.querySelectorAll("tbody tr");
  const workCategoryElement = document.querySelector("[data-workcategory]");
  const workCategory = workCategoryElement.getAttribute("data-workcategory");
  console.log(workCategory);

  rows.forEach((row) => {
    // ค้นหา Progress Bar และวงกลม (circles) ในแต่ละแถว
    const progressBar = row.querySelector(".progress-bar .indicator");
    const circles = row.querySelectorAll(".circle");
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
    
    // กำหนด flow ตาม WorkCategory และเงื่อนไข
    let flow = [];
    if (workCategory === "Gauge making") {
      if (row.getAttribute("data-maker_making").length > 1) {
        flow = [1, 6, 7, 8]; // Flow: (1,6,7,8)
      } else {
        flow = [1, 5, 6, 7, 8]; // Flow: (1,5,6,7,8)
      }
    } else {
      if (
        row.getAttribute("data-maker") === "null" &&
        row.getAttribute("data-std") === "null"
      ) {
        // ไม่ใช่ STD Part
        console.log("1 ", row);
        flow = [1, 4, 5, 7, 8]; // Flow: (1,4,5,7,8)
      } else if (
        row.getAttribute("data-std") !== "Stock" &&
        row.getAttribute("data-maker").length > 1
      ) {
        // STD Part
        console.log("2 ", row);
        flow = [1, 2, 3, 7, 8]; // Flow: (1,2,3,7,8)
      } else if (row.getAttribute("data-std") === "Stock") {
        // STD Part with 'stock'
        console.log("3 ", row);
        flow = [1, 2, 7, 8]; // Flow: (1,2,7,8)
      } else {
        console.log(row);
      }
    }

    // อัปเดตวงกลมให้ตรงกับ flow
    circles.forEach((circle, index) => {
      const stepNumber = index + 1; // ขั้นตอนเริ่มต้นที่ 1
      if (flow.includes(stepNumber)) {
        // ถ้า step อยู่ใน flow
        circle.classList.remove("before-active");
        circle.classList.remove("inactive"); // ลบ inactive หากมี
      } else {
        // ถ้า step ไม่อยู่ใน flow
        circle.classList.add("before-active");
        circle.classList.remove("active");
        circle.classList.remove("done"); // ลบสถานะ done (ถ้ามี)
      }
    });

    // หาค่าของ index สุดท้ายที่ active ใน flow
    const lastActiveIndex = flow.length > 0 ? flow[flow.length - 1] - 1 : -1;

    // อัปเดตความกว้างของ Progress Bar
    if (lastActiveIndex >= 0) {
      progressBar.style.width = `${
        (lastActiveIndex / (circles.length - 1)) * 100
      }%`;
    } else {
      progressBar.style.width = "0%";
    }

    // ถ้า step สุดท้ายคือ Finish และเสร็จสมบูรณ์
    if (
      lastActiveIndex === circles.length - 1 &&
      flow.includes(circles.length)
    ) {
      circles[lastActiveIndex].classList.add("active","final-step");
      // circles[lastActiveIndex].innerHTML = "✓"; // แสดงเครื่องหมายติ้กถูก
    } else if (lastActiveIndex >= 0) {
      // ถ้าเป็น step ล่าสุดแต่ไม่ใช่ Finish
      circles[lastActiveIndex].classList.add("active","final-step");
      circles[lastActiveIndex].classList.remove("done");
      circles[lastActiveIndex].innerHTML = lastActiveIndex + 1; // แสดงตัวเลข
    }
  });
});
