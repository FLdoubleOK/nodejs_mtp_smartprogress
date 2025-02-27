document.addEventListener("DOMContentLoaded", () => {
  const onlineBtn = document.getElementById("onlineBtn");
  const offlineBtn = document.getElementById("offlineBtn");
  const status = document.getElementById("statusInput");
  const statusForm = document.getElementById("statusForm");
  const remarkInput = document.getElementById("remarkInput")

  function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString(); // แปลงวันที่เป็นรูปแบบ ISO เช่น "2023-02-14T11:58:32.667Z"
  }
  // ฟังก์ชันสำหรับอัปเดตสไตล์ปุ่ม
  function updateButtonStyles(status) {
    if (status === 1) {
      onlineBtn.classList.add("btn-success");
      onlineBtn.classList.remove("btn-secondary");
      offlineBtn.classList.add("btn-secondary");
      offlineBtn.classList.remove("btn-danger");
    } else {
      offlineBtn.classList.add("btn-danger");
      offlineBtn.classList.remove("btn-secondary");
      onlineBtn.classList.add("btn-secondary");
      onlineBtn.classList.remove("btn-success");
    }
  }

  // ตั้งค่าปุ่มเริ่มต้น
  updateButtonStyles(parseInt(statusInput.value));

  async function sendDataToServer(status, remark) {
    const createDate = getCurrentDateTime();
  
    if (status !== 0 && status !== 1) {
      console.error("Invalid status value");
      return;
    }
  
    try {
      const response = await axios.post("/mtp/insert-status", {
        status,
        remark,
        createDate,
      });
  
      console.log(`Status inserted successfully: ${status}`);
      location.reload();
    } catch (error) {
      if (error.response) {
        // เซิร์ฟเวอร์ส่ง response กลับมาพร้อม error (เช่น 400 หรือ 500)
        console.error("Failed to insert status:", error.response.data.msg);
      } else if (error.request) {
        // ไม่มีการตอบสนองจากเซิร์ฟเวอร์
        console.error("No response received:", error.request);
      } else {
        // เกิดข้อผิดพลาดอื่น ๆ ในระหว่างการตั้งค่าคำขอ
        console.error("Error:", error.message);
      }
    }
  }

  onlineBtn.addEventListener("click", () => {
    sendDataToServer(1, "Set to online"); // Status = 1 พร้อม Remark
  });

  offlineBtn.addEventListener("click", () => {
    // ตรวจสอบว่า Remark ถูกกรอกหรือไม่
    const remark = remarkInput.value.trim();

    if (!remark) {
      alert("Please enter a remark before setting the status to offline.");
      return;
    }

    sendDataToServer(0, remark); // ใช้ Remark ที่กรอกในกล่องข้อความ
  });
});
