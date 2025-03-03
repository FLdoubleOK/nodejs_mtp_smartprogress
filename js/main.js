document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("tbody tr");
  const workCategoryElement = document.querySelector("[data-workcategory]");
  const workCategory = workCategoryElement.getAttribute("data-workcategory");

  rows.forEach((row) => {
    const progressBar = row.querySelector(".progress-bar .indicator");
    const circles = row.querySelectorAll(".circle");

    const item = {
      Planning: parseInt(row.getAttribute("data-planning")) || 0,
      STD:
        (row.getAttribute("data-std").length > 1 &&
          parseInt(row.getAttribute("data-vendor")) === 1) ||
        (row.getAttribute("data-std") === "Stock" &&
          parseInt(row.getAttribute("data-qc")) === 1) ||
        (row.getAttribute("data-std") === "Stock" &&
          parseInt(row.getAttribute("data-planning")) === 1)
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

    // กำหนด flow ที่จะใช้ตามเงื่อนไข workCategory
    let flow = [];
    if (workCategory === "Gauge making") {
      if (row.getAttribute("data-maker_making") === "null") {
        flow = [1, 5, 6, 7, 8]; // Flow: (1,5,6,7,8)
        //(row.getAttribute("data-maker_making"))
      } else if (row.getAttribute("data-maker_making")?.length > 1) {
        flow = [1, 6, 7, 8]; // Flow: (1,6,7,8)
      }
    } else if (
      workCategory === "Gauge Calibration" ||
      workCategory === "Request Quotation/Cost" ||
      workCategory === "Making Flow Rack & Equipment"
    ) {
      flow = [1, 8];
    } else if (
      workCategory === "Request Standard Part"
    ) {
      flow = [1, 7, 8];
    } else if (workCategory === "Request Material") {
      flow = [1, 4, 8];
    } else if (
      workCategory === "Tool making" ||
      workCategory === "Tool making(PD3)" ||
      workCategory === "Tool making Jig Fixture (PD4)" ||
      workCategory === "Repair / Modify Tool"
    ) {
      if (
        row.getAttribute("data-maker") === "null" &&
        (row.getAttribute("data-std") === "null" ||
          row.getAttribute("data-std") === "-")
      ) {
        flow = [1, 4, 5, 7, 8]; // Flow: (1,4,5,7,8)
      } else if (row.getAttribute("data-maker") === "Part Modify") {
        flow = [1, 5, 8];
      } else if (
        row.getAttribute("data-std") !== "Stock" &&
        row.getAttribute("data-maker")?.length > 1
      ) {
        flow = [1, 2, 3, 7, 8]; // Flow: (1,2,3,7,8)
      } else if (row.getAttribute("data-std") === "Stock") {
        flow = [1, 2, 7, 8]; // Flow: (1,2,7,8)
      }
    }
    // อัปเดตสถานะของวงกลมและ Progress Bar
    let lastActiveIndex = -1;
    steps.forEach((step, index) => {
      if (step === 1) {
        // วงกลมที่ active
        circles[index].classList.add("active");
        circles[index].classList.add("done");
        circles[index].innerHTML = "";
        circles[index].classList.remove("inactive");

        lastActiveIndex = index;
      } else {
        // วงกลมที่ไม่ active
        circles[index].classList.remove("active");
        circles[index].classList.remove("done");
        circles[index].innerHTML = index + 1;
      }

      // ตรวจสอบว่าขั้นตอนนั้นอยู่ใน flow หรือไม่
      if (!flow.includes(index + 1)) {
        // ถ้าไม่อยู่ใน flow ให้เพิ่มสีทึบ
        circles[index].classList.add("before-active");
      } else {
        // ถ้าอยู่ใน flow ให้ลบสีทึบออก
        circles[index].classList.remove("before-active");
      }
    });
    // ตรวจสอบว่า step สุดท้ายคือ Finish หรือไม่
    if (lastActiveIndex === steps.length - 1 && steps[lastActiveIndex] === 1) {
      circles[lastActiveIndex].classList.add("done");
    } else if (lastActiveIndex >= 0) {
      circles[lastActiveIndex].classList.remove("done");
      circles[lastActiveIndex].classList.remove("active");
      circles[lastActiveIndex].classList.add("active1");
      circles[lastActiveIndex].classList.add("final-step");
      circles[lastActiveIndex].classList.remove("before-active");
      circles[lastActiveIndex].innerHTML = lastActiveIndex + 1;
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
