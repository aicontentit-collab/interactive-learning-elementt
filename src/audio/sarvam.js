const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";

const base64ToBlobUrl = (base64, type = "audio/wav") => {
  const bin = atob(base64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([arr], { type }));
};

/**
 * Converts Hinglish text to speech using Sarvam AI (manan speaker).
 * @param {string} text
 * @returns {Promise<[string|null, string|null]>} [audioUrl, errorCode]
 */
export async function textToSpeech(text) {
  const apiKey = import.meta.env.VITE_SARVAM_API_KEY;

  if (!apiKey) {
    console.error("Critical: VITE_SARVAM_API_KEY is missing from .env");
    return [null, "api_key_missing"];
  }

  try {
    const payload = {
      inputs: [text],
      target_language_code: "hi-IN",
      speaker: "manan",
      model: "bulbul:v3",
      speech_sample_rate: 24000,
    };

    console.log("%c[Sarvam Request]", "color:#22c55e;font-weight:bold", {
      speaker: "manan",
      language: "hi-IN",
      text_length: text.length,
    });

    const response = await fetch(SARVAM_TTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Sarvam API Error:", response.status, errData);
      return [null, `api_error_${response.status}`];
    }

    const data = await response.json();
    const base64Audio = data.audios?.[0];

    if (!base64Audio) return [null, "empty_audio_response"];

    const audioUrl = base64ToBlobUrl(base64Audio);
    console.log(
      "%c[Sarvam Audio Ready]",
      "color:#22c55e;font-weight:bold",
      audioUrl,
    );
    return [audioUrl, null];
  } catch (error) {
    console.error("Sarvam service failure:", error);
    return [null, "network_error"];
  }
}
