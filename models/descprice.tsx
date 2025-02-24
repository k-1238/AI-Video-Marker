import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface untuk mendefinisikan tipe dokumen
interface IDescPrice extends Document {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: string;
  popular: boolean;
}

// Schema untuk model DescPrice
const DescPriceSchema: Schema<IDescPrice> = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    default: "0",
  },
  period: {
    type: String,
    required: true,
    default: "/month",
  },
  description: {
    type: String,
    required: true,
    default: "For casual video creators",
  },
  features: {
    type: [String], // Array of strings
    required: true,
    default: [
      "Up to 5 videos per month",
      "720p video quality",
      "Basic templates",
      "Standard support",
    ],
  },
  buttonText: {
    type: String,
    required: true,
    default: "Get Started",
  },
  buttonVariant: {
    type: String,
    required: true,
    default: "outlined",
  },
  popular: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Model untuk collection DescPrice
const DescPriceModel: Model<IDescPrice> =
  mongoose.models.DescPrice || mongoose.model<IDescPrice>('DescPrice', DescPriceSchema);

export { DescPriceModel };
