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

  const systemPrompt = `You are an expert job outreach specialist. Based on the user's prompt, generate personalized and concise outreach content. Return ONLY valid JSON in this format: { "subject": "Email subject", "emailBody": "Cold email body", "linkedinDM": "Short LinkedIn message", "followUpEmail": "Follow-up email" } Keep the content professional, natural, persuasive, and tailored to the recipient. Avoid generic phrases, unnecessary fluff, and fabricated information. Each message should have a clear but natural call to action.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        maxOutputTokens: 1000,
        temperature: 1.0,
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    const { subject, emailBody, linkedinDM, followUpEmail } = parsedData;

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
