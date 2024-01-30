const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/submit", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).json({ error: "Write first-name or last-name" });
    }
    const data = await fs.readFile("data.json", "utf-8");
    const jsonData = JSON.parse(data);
    jsonData.push({ firstName, lastName });
    await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));
    res.json({ success: true, message: "Data submited success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(port, () => {
  console.log("server is running");
});
