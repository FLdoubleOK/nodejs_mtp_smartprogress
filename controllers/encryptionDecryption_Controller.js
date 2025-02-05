const { encrypt, decrypt } = require('../middleware/encryption');

function encryptedData(req, res) {
  //   const userData = {
  //     /* ...fetch or process data... */
  //   };
  const var1 = req.params.nid;

  const encryptedData = encrypt(JSON.stringify(var1));
  console.log(encryptedData);
  res.send({ data: encryptedData });
}

function decryptedData(req, res) {
  const encryptedData = req.params.codex;
  //   const encryptedData = req.body.data;
  const decryptedData = JSON.parse(decrypt(encryptedData));
  console.log(decryptedData);
  res.send({ data: decryptedData });
}

module.exports = {
  encryptedData,
  decryptedData,
};
// app.post('/api/data', (req, res) => {
//   const userData = { /* ...fetch or process data... */ };
//   const encryptedData = encrypt(JSON.stringify(userData));
//   res.send({ data: encryptedData });
// });

// app.post('/api/receive', (req, res) => {
//     const encryptedData = req.body.data;
//     const decryptedData = JSON.parse(decrypt(encryptedData));
//     // ...use decryptedData...
//   });
