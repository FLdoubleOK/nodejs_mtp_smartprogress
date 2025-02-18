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

module.exports = {
    Maintenance,
}