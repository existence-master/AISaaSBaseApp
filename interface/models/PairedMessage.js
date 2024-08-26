import mongoose from "mongoose"; // Importing mongoose for MongoDB interactions

const { Schema, model, models } = mongoose; // Destructuring Schema, model, and models from mongoose

// Define the schema for the PairedMessage collection
const pairedMessageSchema = new Schema(
  {
    input: {
      type: String, // The `input` field stores a string, representing the original message or query
      required: true, // The `input` field is required
    },
    response: {
      type: String, // The `response` field stores a string, representing the chatbot's response or output
      required: true, // The `response` field is required
    },
  },
  { timestamps: true } // Enable automatic timestamps for created and updated times
);

// Define the PairedMessage model using the schema
// If the model exists in the models collection, use it; otherwise, create a new one
const PairedMessage =
  models.PairedMessage || model("PairedMessage", pairedMessageSchema);

export default PairedMessage; // Export the PairedMessage model for use in other parts of the application
