const db = require("../database/db_main.js");
const { poolPromise } = require("../database/db_main.js"); // อ้างอิงไฟล์ model ของคุณ


async function Maintenance(req, res) {
  try {
    const result = await db.MaintenanceSave();
    console.log(result.length);
    console.log(result)
    res.render('Maintenance' , {result});
  } catch (error) {
    console.error(`Error : ${error}`);
    res.status(500).send({ msg: `Error : ${error}` });
  }
}

async function updateStatus(req, res) {
  try {
    const { status, remark, createDate } = req.body;

    // ตรวจสอบค่าที่ส่งเข้ามา
    if (typeof status !== 'number' || (status !== 0 && status !== 1)) {
      return res.status(400).send({ msg: "Invalid status value" });
    }
    if (!remark || typeof remark !== 'string') {
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
    updateStatus
}