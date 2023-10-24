import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import GetPortno from "../GlobalVar";

const GlobalVar = GetPortno();
var pageno = 0;
export const FetchProductsList = createAsyncThunk("FetchProductsList",
  async () => {
    try {
    const response = await fetch(GlobalVar+"/product/get?pageSize=150&pageSize"+pageno);
    const Products = await response.json()
    console.log(Products);
    return Products
    } catch (error) {
      console.log(error);
    }
    
  }
);

export const Products = createSlice({
  name: "Productslice",
  initialState: {
    isLoading:false,
    lastPage:false,
    pageno:0,
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(FetchProductsList.pending,(state,action)=>{
        state.isLoading=true;
    })
    builder.addCase(FetchProductsList.fulfilled, (state, action) => {
      state.isLoading=false;
      const temp = state.data.concat(action.payload.content);
      state.data = action.payload.content;
      state.isLoading = action.payload.lastPage;
      pageno++;
    });
  },
  reducers:{
    resetProducts : (state)=>{
      state.data = []
    },
    AddProduct : (state,action)=>{
      console.log(action.payload);
    }
  }
});

export default Products.reducer;
