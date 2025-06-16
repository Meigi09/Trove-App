import express from "express"
import supplierRoutes from "./routes/supplierRoutes.js"
import { connectDB } from "./config/db.js";
const app = express();

app.use("/api/suppliers",supplierRoutes);

connectDB();

app.listen(5001,()=>{
  console.log("Server started on PORT : http://localhost:5001");
})

