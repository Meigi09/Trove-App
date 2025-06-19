import {create} from "zustand"
import axios from "axios"

const API_URL = " http://localhost:5001/api/users"
export const useAuthStore = create((set) =>({
  user: null,
  isLoading:false,
  error: null,

  signup : async(username,name,email,role,password) =>{
    set({isLoading:true,error:null});

    try {
      const response = await axios.post(`${API_URL}/signup`,{
        username,
        name,
        email,
        role,
        password
      });

      set({
        user: response.data.user,
         isLoading: false
      })

    } catch (error) {
      set({
        isLoading:false,
        error: error.response.data.message || "Error Signing Up"
      });

      throw error;
      
      
    }
  }


  
}))