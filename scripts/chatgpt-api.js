const DEFAULT_MODEL = "gpt-4o-mini";

function normalizeBaseUrl(baseUrl) {
  if (!baseUrl) return "https://api.openai.com/v1";
  return baseUrl.replace(/\/$/, "");
}

export function buildMessages({ systemPrompt, userPrompt, context = [] }) {
  const base = [];
  if (systemPrompt) {
    base.push({ role: "system", content: systemPrompt.trim() });
  }

  context.forEach((entry) => {
    if (entry && entry.role && entry.content) {
      base.push({ role: entry.role, content: entry.content });
    }
  });

  if (userPrompt) {
    base.push({ role: "user", content: userPrompt.trim() });
  }

  return base;
}

export function buildChatBody({
  model = DEFAULT_MODEL,
  systemPrompt = "",
  userPrompt = "",
  context = [],
  temperature = 0.7,
  maxTokens = 400,
  responseFormat,
}) {
  const body = {
    model,
    messages: buildMessages({ systemPrompt, userPrompt, context }),
    temperature,
    max_tokens: maxTokens,
  };

  if (responseFormat) {
    body.response_format = responseFormat;
  }

  return body;
}

export function buildHeaders(apiKey) {
  if (!apiKey) {
    throw new Error("נדרש להזין מפתח API כדי לבצע קריאת ChatGPT.");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey.trim()}`,
  };
}

export async function sendChatCompletion({ apiKey, baseUrl, body }) {
  const endpoint = `${normalizeBaseUrl(baseUrl)}/chat/completions`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: buildHeaders(apiKey),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`שגיאת API (${response.status}): ${text}`);
  }

  return response.json();
}

export function extractCompletionText(result) {
  if (!result || !Array.isArray(result.choices)) return "";
  const first = result.choices[0];
  return first?.message?.content?.trim?.() || "";
}

export function summarizeResult(result) {
  if (!result) return "";
  const usage = result.usage || {};
  const tokens = [
    usage.prompt_tokens && `קלט: ${usage.prompt_tokens}`,
    usage.completion_tokens && `פלט: ${usage.completion_tokens}`,
    usage.total_tokens && `סה"כ: ${usage.total_tokens}`,
  ].filter(Boolean);

  const model = result.model || DEFAULT_MODEL;
  return tokens.length ? `${model} · ${tokens.join(" · ")}` : model;
}

export function buildAssistantLink({ model = DEFAULT_MODEL, baseUrl }) {
  const url = new URL("https://platform.openai.com/playground/chat");
  url.searchParams.set("model", model);
  if (baseUrl) {
    url.searchParams.set("base_url", normalizeBaseUrl(baseUrl));
  }
  return url.toString();
}

export function createChatPayloadFromForm(formData) {
  const model = formData.get("model") || DEFAULT_MODEL;
  const systemPrompt = formData.get("system") || "";
  const userPrompt = formData.get("prompt") || "";
  const temperature = Number(formData.get("temperature") || 0.7);
  const maxTokens = Number(formData.get("maxTokens") || 400);
  const baseUrl = formData.get("baseUrl") || "https://api.openai.com/v1";

  const body = buildChatBody({
    model,
    systemPrompt,
    userPrompt,
    temperature,
    maxTokens,
  });

  return { body, baseUrl };
}

export const ChatGPTApi = {
  buildMessages,
  buildChatBody,
  buildHeaders,
  sendChatCompletion,
  extractCompletionText,
  summarizeResult,
  buildAssistantLink,
  createChatPayloadFromForm,
};

if (typeof window !== "undefined") {
  window.ChatGPTApi = ChatGPTApi;
}
