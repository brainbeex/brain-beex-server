import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    organizer: {
      type: String,
      required: true,
    },

    prize: {
      type: String,
      default: "",
    },

    deadline: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      default: "general",
    },

    createdBy: {
      type: String, // admin email
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Competition = mongoose.model("Competition", competitionSchema);

export default Competition;