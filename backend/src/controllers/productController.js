import Product from "../model/Product.js";

export async function getAllProducts(req,res){
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getAllProducts method",error);
    res.status(500).json({message:"Internal Server Error"})    
  }
};