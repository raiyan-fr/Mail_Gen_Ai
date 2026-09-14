import api from "../API/api";

// Cold Email generator
export const generateEmail = async (prompt) => {
  const response = await api.post("/ai/generate-email", { prompt });
  return response.data;
};

// Email History
export const emailHistory = async () => {
  const response = await api.get("/ai/email-history");
  return response.data;
};
