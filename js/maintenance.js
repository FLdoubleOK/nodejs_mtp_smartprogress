document.addEventListener("DOMContentLoaded", () => {

// รับค่า `status` จาก global (ที่ส่งมาจาก EJS)
const currentStatus = window.currentStatus || 0; // ค่าเริ่มต้นเป็น 0 หากไม่มีค่า

// DOM Elements
const onlineBtn = document.getElementById('onlineBtn');
const offline = document.getElementById('offlineBtn');
const statusInput = document.getElementById('statusInput');
const statusForm = document.getElementById('statusForm');

// ฟังก์ชันสำหรับอัปเดตการแสดงผลของปุ่ม
function updateButtonStyles(status) {
  if (status === 1) {
    onlineBtn.classList.add('btn-success');
    onlineBtn.classList.remove('btn-secondary');
    offlineBtn.classList.add('btn-secondary');
    offlineBtn.classList.remove('btn-danger');
  } else {
    offlineBtn.classList.add('btn-danger');
    offlineBtn.classList.remove('btn-secondary');
    onlineBtn.classList.add('btn-secondary');
    onlineBtn.classList.remove('btn-success');
  }
}

// ตั้งค่าปุ่มเริ่มต้น
updateButtonStyles(currentStatus);

// Event Listeners
onlineBtn.addEventListener('click', () => {
  statusInput.value = 1; // อัปเดตค่าใน hidden input
  updateButtonStyles(1); // อัปเดตการแสดงผล
  statusForm.submit(); // ส่งฟอร์มไปยังเซิร์ฟเวอร์
});

offlineBtn.addEventListener('click', () => {
  statusInput.value = 0; // อัปเดตค่าใน hidden input
  updateButtonStyles(0); // อัปเดตการแสดงผล
  statusForm.submit(); // ส่งฟอร์มไปยังเซิร์ฟเวอร์
});
});