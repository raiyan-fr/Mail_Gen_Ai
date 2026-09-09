const mongoose_obj = require("mongoose");

const emailHistorySchema = new mongoose_obj.Schema(
  {
    user: {
      type: mongoose_obj.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    emailBody: {
      type: String,
      required: true,
    },
    linkedinDM: {
      type: String,
      required: true,
    },
    followUpEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const EmailHistory = mongoose_obj.model("EmailHistory", emailHistorySchema);
module.exports = EmailHistory;
