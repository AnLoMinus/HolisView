import {
  buildAssistantLink,
  createChatPayloadFromForm,
  extractCompletionText,
  sendChatCompletion,
  summarizeResult,
} from "./chatgpt-api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#chatgpt-form");
  const output = document.querySelector("#chatgpt-output");
  const meta = document.querySelector("#chatgpt-meta");
  const link = document.querySelector("#chatgpt-playground-link");
  const status = document.querySelector("#chatgpt-status");

  if (!form || !output) return;

  const setStatus = (message, type = "info") => {
    status.textContent = message;
    status.dataset.type = type;
  };

  const resetResult = () => {
    output.textContent = "";
    meta.textContent = "";
    link.href = "#";
    link.textContent = "";
  };

  form.addEventListener("input", () => {
    const formData = new FormData(form);
    const model = formData.get("model") || "gpt-4o-mini";
    const baseUrl = formData.get("baseUrl") || "https://api.openai.com/v1";
    link.href = buildAssistantLink({ model, baseUrl });
    link.textContent = "פתח Playground";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    resetResult();
    setStatus("מבצע קריאה ל-API...", "info");

    const formData = new FormData(form);
    const apiKey = formData.get("apiKey");
    const { body, baseUrl } = createChatPayloadFromForm(formData);

    try {
      const result = await sendChatCompletion({ apiKey, baseUrl, body });
      output.textContent = extractCompletionText(result) || "(ללא פלט)";
      meta.textContent = summarizeResult(result);
      link.href = buildAssistantLink({ model: body.model, baseUrl });
      link.textContent = "פתח Playground";
      setStatus("הבקשה הצליחה", "success");
    } catch (error) {
      setStatus(error.message || "חלה שגיאה בעת הפנייה ל-API", "error");
    }
  });
});
