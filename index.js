const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // if using HuggingFace API later

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  // ✅ Temporary simple AI response
  // Replace with real AI fetch later if needed
  const reply = `You said: "${userMessage}" 😊`;

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ AI Girl backend running on port ${PORT}`);
});
