import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Define the User Schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    chats: [
      {
        type: Schema.Types.ObjectId, // References to the Chat model
        ref: "Chat", // Reference the Chat collection
        required: false, // This field can be optional
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
