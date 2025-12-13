import {
  buildAssistantLink,
  buildChatBody,
  sendChatCompletion,
  summarizeResult,
} from "../scripts/chatgpt-api.js";

const SEFIROT = [
  "חכמה",
  "בינה",
  "חסד",
  "גבורה",
  "תפארת",
  "נצח",
  "הוד",
  "יסוד",
  "מלכות",
];

const form = document.querySelector("#sefirot-api-form");
const statusBox = document.querySelector("#sefirot-api-status");
const metaBox = document.querySelector("#sefirot-api-meta");
const playgroundLink = document.querySelector("#sefirot-api-link");

const textareaMap = new Map();
const slotMap = new Map();

SEFIROT.forEach((name) => {
  const textarea = document.querySelector(`textarea[data-sefirah="${name}"]`);
  const slot = document.querySelector(`.gpt-slot[data-target="${name}"]`);
  if (textarea) textareaMap.set(name, textarea);
  if (slot) slotMap.set(name, slot);
});

const setStatus = (text, type = "info") => {
  if (!statusBox) return;
  statusBox.textContent = text;
  statusBox.classList.remove("alert-info", "alert-success", "alert-danger");
  const className =
    type === "success" ? "alert-success" : type === "error" ? "alert-danger" : "alert-info";
  statusBox.classList.add(className);
};

const resetSlots = () => {
  slotMap.forEach((slot) => {
    slot.innerHTML = "<small>פלט ChatGPT</small>";
  });
};

const collectEntries = () => {
  return SEFIROT.map((name) => {
    const value = textareaMap.get(name)?.value?.trim();
    return value ? { name, value } : null;
  }).filter(Boolean);
};

const buildUserPrompt = (basePrompt, entries) => {
  const lines = entries
    .map((entry, index) => `${index + 1}. ${entry.name}: ${entry.value}`)
    .join("\n");

  return `${basePrompt}\n\nהחזר JSON עם שדות לכל ספירה (חכמה, בינה, חסד, גבורה, תפארת, נצח, הוד, יסוד, מלכות). השתמש במפתחות בעברית וספק תשובה קצרה לכל אחת.\n\nטקסטים לעיבוד:\n${lines}`;
};

const updatePlaygroundLink = () => {
  if (!playgroundLink || !form) return;
  const data = new FormData(form);
  const model = data.get("model") || "gpt-4o-mini";
  const baseUrl = data.get("baseUrl") || "https://api.openai.com/v1";
  playgroundLink.href = buildAssistantLink({ model, baseUrl });
};

const updateSlotsFromResponse = (payloadText) => {
  let parsed;
  try {
    parsed = JSON.parse(payloadText);
  } catch (error) {
    setStatus("התגובה אינה בפורמט JSON – בדקו את ההנחיות", "error");
    return;
  }

  SEFIROT.forEach((name) => {
    const slot = slotMap.get(name);
    if (!slot) return;
    const content = parsed[name] || "(לא התקבל פלט)";
    slot.innerHTML = `<small>${name}</small>${content}`;
  });
};

if (form) {
  form.addEventListener("input", updatePlaygroundLink);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    resetSlots();
    setStatus("מבצע פנייה ל-API...", "info");
    metaBox.textContent = "";

    const data = new FormData(form);
    const entries = collectEntries();
    const apiKey = data.get("apiKey");
    const baseUrl = data.get("baseUrl") || "https://api.openai.com/v1";
    const model = data.get("model") || "gpt-4o-mini";
    const systemPrompt = data.get("systemPrompt") || "";
    const prompt = buildUserPrompt(data.get("prompt") || "", entries);
    const temperature = Number(data.get("temperature") || 0.7);
    const maxTokens = Number(data.get("maxTokens") || 400);

    const body = buildChatBody({
      model,
      systemPrompt,
      userPrompt: prompt,
      temperature,
      maxTokens,
      responseFormat: { type: "json_object" },
    });

    try {
      const result = await sendChatCompletion({ apiKey, baseUrl, body });
      const content = result?.choices?.[0]?.message?.content || "";
      updateSlotsFromResponse(content);
      metaBox.textContent = summarizeResult(result);
      playgroundLink.href = buildAssistantLink({ model, baseUrl });
      setStatus("הבקשה בוצעה בהצלחה", "success");
    } catch (error) {
      setStatus(error.message || "אירעה שגיאה בעת הפנייה ל-API", "error");
    }
  });

  updatePlaygroundLink();
}
