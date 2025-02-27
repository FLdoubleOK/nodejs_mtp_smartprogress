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
  
      // ตัวแปรเก็บ flow ที่จะใช้
      let flow = [];
  
      // เลือก flow ตาม WorkCategory และเงื่อนไข
      if (workCategory === "Gauge making") {
        if (item.Maker_Making !== null) {
          flow = [1, 6, 7, 8]; // Flow: (1,6,7,8)
        } else {
          flow = [1, 5, 6, 7, 8]; // Flow: (1,5,6,7,8)
        }
      } else {
        if (!item.Maker || item.Maker === "") {
          // ไม่ใช่ STD Part
          flow = [1, 4, 5, 7, 8]; // Flow: (1,4,5,7,8)
        } else if (row.getAttribute("data-std") !== "stock" && row.getAttribute("data-std").length > 1) {
          // STD Part
          flow = [1, 2, 3, 7, 8]; // Flow: (1,2,3,7,8)
        } else if (row.getAttribute("data-std") === "stock" && row.getAttribute("data-std").length > 1) {
          // STD Part with 'stock'
          flow = [1, 2, 7, 8]; // Flow: (1,2,7,8)
        }
      }
  
      // ตัวแปรสำหรับเก็บสถานะขั้นตอนทั้งหมด
      const steps = Array(circles.length).fill(0); // เริ่มต้นทุกขั้นตอนเป็น 0
      flow.forEach((step) => {
        // ตรวจสอบว่า step นั้นเสร็จสมบูรณ์หรือไม่
        switch (step) {
          case 1:
            steps[0] = item.Planning;
            break;
          case 2:
            steps[1] = item.STD === "stock" || item.STD.length > 1 ? 1 : 0;
            break;
          case 3:
            steps[2] = item.Vendor;
            break;
          case 4:
            steps[3] = item.Material;
            break;
          case 5:
            steps[4] = item.Production;
            break;
          case 6:
            steps[5] = item.Gauge_Making;
            break;
          case 7:
            steps[6] = item.QC;
            break;
          case 8:
            steps[7] = item.Finish;
            break;
        }
      });
  
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
        if (steps[i] === 0) {
          circles[i].classList.add("before-active"); // เพิ่มคลาสสีทึบ
        } else {
          circles[i].classList.remove("before-active"); // ลบคลาสสีทึบ หากไม่เข้าเงื่อนไข
        }
      }
  
      // ตรวจสอบว่า step สุดท้ายคือ Finish หรือไม่
      if (lastActiveIndex === steps.length - 1 && steps[lastActiveIndex] === 1) {
        // ถ้าเป็น Finish และเสร็จสมบูรณ์
        circles[lastActiveIndex].classList.add("done"); // เพิ่มคลาส done
      } else if (lastActiveIndex >= 0) {
        // ถ้าเป็น step ล่าสุดแต่ไม่ใช่ Finish
        circles[lastActiveIndex].classList.remove("done"); // ลบคลาส done
        circles[lastActiveIndex].classList.remove("active"); // ลบคลาส done
        circles[lastActiveIndex].classList.add("active1"); // ลบคลาส done
        circles[lastActiveIndex].classList.add("final-step"); // เพิ่มคลาส current-step
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
  