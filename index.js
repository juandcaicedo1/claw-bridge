const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const NEO_API_URL = process.env.NEO_API_URL;
const NEO_API_KEY = process.env.NEO_API_KEY;

app.post("/ask-neo", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      NEO_API_URL,
      {
        message: userMessage
      },
      {
        headers: {
          Authorization: `Bearer ${NEO_API_KEY}`
        }
      }
    );

    res.json({
      reply: response.data.reply
    });

  } catch (error) {
    res.status(500).json({
      error: "Error hablando con Neo",
      detail: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(3000, () => {
  console.log("Servidor corriendo");
});
