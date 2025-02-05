async function GetParams() {
    document.getElementById("versionControl").innerText = "Loading...";
    try {
      // ส่ง Request ไปที่เซิร์ฟเวอร์
      const response = await axios.get("/mtp/test");
      
      const result = response.data;
  
      if (result.success) {
        // ดึงข้อมูลจาก JSON และอัปเดต HTML
        const data = result.data[0]; // สมมติว่าเราต้องการแค่ Record แรก
        // document.getElementById("picturePath").innerText = data.PARAM_NAME || "N/A";
        document.getElementById("versionControl").innerText = data.VERSION_CONTROL || "N/A";
        // document.getElementById("manualPath").innerText = data.MANUAL_PATH || "N/A";
      } else {
        document.getElementById("txtError").innerText = "Error: " + result.message;
      }
    } catch (error) {
      console.error("Error fetching params: ", error);
      document.getElementById("txtError").innerText = "Error fetching parameters: " + error.message;
    }
  }
  