import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
      },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Product", productSchema);