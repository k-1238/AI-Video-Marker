import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const ConnectDB = async () => {
  mongoose.Promise = Promise;
  await mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => [console.log("SOMETHING WRONG: ", err)]);
};

export { ConnectDB };
