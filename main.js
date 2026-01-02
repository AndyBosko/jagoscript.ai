import { buildPrompt } from "./promptEngine.js";
import { exportPDF, exportDOC } from "./export.js";

const output = document.getElementById("output");
const exportBtns = document.getElementById("exportBtns");

document.getElementById("generateBtn").onclick = async () => {
  const idea = ideaInput.value;
  if (!idea) return alert("Tulis idenya dulu...");

  output.innerText = "Lagi nyusun kata...";

  const prompt = buildPrompt({
    idea,
    platform: platform.value,
    style: style.value,
    negative: negativeHook.checked,
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await res.json();
  const text = data.choices[0].message.content;

  output.innerText = text;
  exportBtns.classList.remove("hidden");
};

exportPDF.onclick = () => exportPDF(output.innerText);
exportDOC.onclick = () => exportDOC(output.innerText);

// theme
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = theme;
  toggle.innerText = theme === "dark" ? "☀️" : "🌙";
};
