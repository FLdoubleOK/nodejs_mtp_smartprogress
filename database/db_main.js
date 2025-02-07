const sql = require('mssql');
const dbConfig = require("./db");

async function TestSelect() {
    try {
       const pool = await sql.connect(dbConfig.config);
       const request = new sql.Request(pool);
       const result = await request.execute('TestSelect');
       await pool.close();
       return result.recordset;
    } catch (error) {
       console.error(error);
    }
 }

 async function Where_Register_No() {
    try {
       const pool = await sql.connect(dbConfig.config);
       const request = new sql.Request(pool);
       const result = await request.execute('Where_Register_No');
       await pool.close();
       return result.recordset;
    } catch (error) {
       console.error(error);
    }
 }

 async function executeStoredProcedureWithParams(Register_No) {
    try {
      const pool = await sql.connect(dbConfig.config); // Connect to the database
      const request = new sql.Request(pool);
      console.log("Database log: " + Register_No)
      // Pass the Register_No parameter to the stored procedure
      request.input("Register_No", sql.NVarChar, Register_No); // Use NVARCHAR if your SQL expects it
  
      const result = await request.execute("Where_Register_No"); // Replace with your stored procedure name
      console.log("Stored procedure result: ", result.recordset);
      await pool.close(); // Close the database connection
      return result.recordset; // Return the result of the stored procedure
    } catch (error) {
      console.error(`Database error: ${error}`);
      throw error;
    }
  }


 module.exports = {
    Where_Register_No,
    TestSelect,
    executeStoredProcedureWithParams,
 }