const connect_sql  = require("../database/db.js");
const { poolPromise } = require("../database/db.js"); // อ้างอิงไฟล์ model ของคุณ
async function getConnect(req, res) {

    res.render('Params');
}


async function test(req, res)  {
  try {
    const pool = await poolPromise;
    // console.log("Connected to database"); // Debug
   // เรียกใช้ Stored Procedure
   const result = await pool.request().execute("Master.sps_GetInitGlobalParam"); // ใช้ชื่อ Stored Procedure ของคุณ
  //  console.log("Query result: ", result.recordset); // Debug
    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    // console.error("Error fetching parameters: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch parameters.",
      error: error.message,
    });
  }
}



module.exports = {
  getConnect,
  test,
};
