const { GoogleGenAI } = require("@google/genai");
const EmailHistory = require("../models/EmailHistory");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

exports.generateEmail = async (req, res) => {
  const { prompt } = req.body;

  // Validate prompt
  if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
    return res.status(400).json({
      message: "Prompt is required",
    });
  }

  if (prompt.length > 2000) {
    return res.status(400).json({
      message: "Prompt exceeds maximum length of 2000 characters",
    });
  }

  // Ensure authenticated user exists
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized: User not identified",
    });
  }

  const systemPrompt = `You are an expert job outreach specialist.

Based on the user's prompt, generate personalized and concise outreach content.

You MUST return exactly one JSON object with these four string fields:

{
  "subject": "Email subject",
  "emailBody": "Cold email body",
  "linkedinDM": "Short LinkedIn message",
  "followUpEmail": "Follow-up email"
}

Rules:
- Return ONLY the JSON object.
- Do NOT wrap the JSON in markdown code fences.
- Do NOT return a JSON string.
- Do NOT include any explanation before or after the JSON.
- All four fields must contain strings.
- Keep the content professional, natural, persuasive, and concise.
- Tailor the content to the user's prompt.
- Do not fabricate information.
- Include a clear but natural call to action.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        maxOutputTokens: 1200,
        temperature: 0.7,
      },
    });

    const rawText = response.text?.trim();

    console.log("Gemini raw response:", rawText);

    if (!rawText) {
      return res.status(500).json({
        message: "AI returned an empty response",
      });
    }

    let parsedData;

    try {
      parsedData = JSON.parse(rawText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      console.error("Raw Gemini response:", rawText); // need to be removed

      return res.status(500).json({
        message: "AI returned an invalid JSON response",
      });
    }

    const { subject, emailBody, linkedinDM, followUpEmail } = parsedData;

    // Validate AI response
    if (!subject || !emailBody || !linkedinDM || !followUpEmail) {
      return res.status(500).json({
        message: "AI response is missing required fields",
      });
    }

    // Save to EmailHistory
    const newEmail = await EmailHistory.create({
      user: req.user._id,
      prompt,
      subject,
      emailBody,
      linkedinDM,
      followUpEmail,
    });

    return res.status(200).json({
      message: "Email generated successfully",
      data: {
        user: req.user._id,
        subject,
        emailBody,
        linkedinDM,
        followUpEmail,
      },
    });
  } catch (error) {
    console.error("Error generating email:", error);

    return res.status(500).json({
      message: "Error generating email",
      error: error.message,
    });
  }
};

exports.emailHistory = async (req, res) => {
  // Ensure authenticated user exists
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized: User not identified",
    });
  }

  try {
    const emailHistory = await EmailHistory.find({ user: req.user._id });

    return res.status(200).json({
      message: "Email history retrieved successfully",
      data: emailHistory,
    });
  } catch (error) {
    console.error("Error retrieving email history:", error);

    return res.status(500).json({
      message: "Error retrieving email history",
      error: error.message,
    });
  }
};
