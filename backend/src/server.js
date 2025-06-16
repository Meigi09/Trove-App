import express from "express"
import supplierRoutes from "./routes/supplierRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();

const PORT= process.env.PORT || 5001

app.use("/api/suppliers",supplierRoutes);
app.use("/api/products",productRoutes);

connectDB();

app.listen(PORT,()=>{
  console.log(`Server started on PORT : http://localhost:${PORT}`);
})

