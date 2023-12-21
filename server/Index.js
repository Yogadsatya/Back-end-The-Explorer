const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 3307;

app.use(express.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}.json`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const { originalname, filename } = req.file;
  const fileData = {
    id: Date.now(), // Buat ID unik untuk setiap surat
    originalname,
    filename,
    uploadedAt: new Date().toISOString(),
  };

  const suratPath = "public/surat.json";
  let suratData = [];

  try {
    // Baca data dari surat.json
    suratData = JSON.parse(fs.readFileSync(suratPath));
  } catch (error) {
    console.error("Error reading surat.json:", error);
  }

  // Tambahkan data baru ke array
  suratData.push(fileData);

  try {
    // Tulis kembali data ke surat.json
    fs.writeFileSync(suratPath, JSON.stringify(suratData, null, 2));
    console.log("File uploaded successfully and data added to surat.json.");
  } catch (error) {
    console.error("Error writing to surat.json:", error);
  }

  res.json({ success: true, fileId: fileData.id });
});

app.get("/surat", (req, res) => {
  const suratPath = "public/surat.json";
  try {
    const suratData = JSON.parse(fs.readFileSync(suratPath));
    res.json(suratData);
  } catch (error) {
    console.error("Error reading surat.json:", error);
    res.status(500).json({ error: "Failed to read surat.json" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
