const speakBtn = document.getElementById("speakBtn");
const statusBox = document.getElementById("status");

let voices = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
};

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';

speakBtn.addEventListener("click", () => {
  recognition.start();
  statusBox.textContent = "🎧 Listening...";
});

recognition.onresult = async (event) => {
  const text = event.results[0][0].transcript;
  statusBox.textContent = `🗣️ You: "${text}"`;

  if (!text || text.trim() === "") {
    speak("Sorry, I didn't hear anything.");
    return;
  }

  const reply = await getAIResponse(text);
  speak(reply);
  statusBox.textContent = `🤖 AI: "${reply}"`;
};

recognition.onerror = () => {
  statusBox.textContent = "❌ Didn't catch that. Please try again.";
};

// ✅ FREE GPT-style API using HuggingFace Proxy
async function getAIResponse(userText) {
  try {
    const response = await fetch("https://huggingface-api-sandbox.onrender.com/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();
    return data.reply || "Sorry, I didn't understand that.";
  } catch (error) {
    console.error("API error:", error);
    return "Oops! Server is not responding.";
  }
}

function speak(text) {
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = voices.find(v => v.name.includes("Female") || v.name.includes("Google UK English Female")) || voices[0];
  utter.pitch = 1.2;
  utter.rate = 1;
  window.speechSynthesis.speak(utter);
}
