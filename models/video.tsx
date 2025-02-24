import mongoose, { Document, Model, Schema } from "mongoose";

interface IVideo extends Document {
  videoUrl: string;
  userId: string;
}

const VideoSchema: Schema<IVideo> = new Schema({
  videoUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const VideoModel: Model<IVideo> =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);

export { VideoModel };
