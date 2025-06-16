import mongoose from "mongoose"


export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://nshumeigi:USq5ed11kZTmeRW0@cluster0.tw5n5m6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MONGODB CONNECTED SUCCESSFULLY");   

  } catch (error) {
    console.error("Error connecting to the MONGODB",error);
    process.exit(1);
    }
}