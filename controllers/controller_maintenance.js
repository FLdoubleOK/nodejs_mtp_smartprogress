const db = require("../database/db_main.js");
const { poolPromise } = require("../database/db_main.js"); // อ้างอิงไฟล์ model ของคุณ

async function Maintenance(req, res) {
  try {
    const result = await db.MaintenanceSave();
    console.log(result.length);
    const date = new Date(result[0].CreateDate);

    // ดึงค่าต่างๆ ออกมา
    const day = date.getDate().toString().padStart(2, "0"); // วันที่
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // เดือน (เพิ่ม 1 เพราะ getMonth() เริ่มที่ 0)
    const year = date.getFullYear(); // ปี
    const hours = date.getHours().toString().padStart(2, "0"); // ชั่วโมง
    const minutes = date.getMinutes().toString().padStart(2, "0"); // นาที
    const seconds = date.getSeconds().toString().padStart(2, "0"); // วินาที

    // จัดรูปแบบเป็น วัน/เดือน/ปี เวลา
    result[0].CreateDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    console.log(result[0].CreateDate);
    res.render("Maintenance", { result });
  } catch (error) {
    console.error(`Error : ${error}`);
    res.status(500).send({ msg: `Error : ${error}` });
  }
}

async function updateStatus(req, res) {
  try {
    const { status, remark, createDate } = req.body;

    // ตรวจสอบค่าที่ส่งเข้ามา
    if (typeof status !== "number" || (status !== 0 && status !== 1)) {
      return res.status(400).send({ msg: "Invalid status value" });
    }
    if (!remark || typeof remark !== "string") {
      return res.status(400).send({ msg: "Invalid remark" });
    }
    if (!createDate || isNaN(Date.parse(createDate))) {
      return res.status(400).send({ msg: "Invalid createDate" });
    }

    const result = await db.updateAppStatus(status, remark, createDate);
    res.status(200).send({ msg: "Status updated successfully", result });
  } catch (error) {
    console.error(`Error updating status: ${error.message}`);
    res.status(500).send({ msg: `Error updating status: ${error.message}` });
  }
}

module.exports = {
  Maintenance,
  updateStatus,
};
