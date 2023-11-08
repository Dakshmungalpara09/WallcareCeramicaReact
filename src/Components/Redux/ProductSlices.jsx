import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GetPortno from "../GlobalVar";
const ArgumentPass = {
  
}
const GlobalVar = GetPortno();
var pageno = 0;
export const FetchProductsList = createAsyncThunk(
  "FetchProductsList",
  async (CatagoryID) => {
    try {
      var url = GlobalVar + "/product/get?pageSize=15&categorySysid="+CatagoryID.Catagory;
      if (CatagoryID.Catagory != undefined) {
        if (CatagoryID.Type != undefined ) {
          url = GlobalVar + "/product/get?pageSize=15&categorySysid="+CatagoryID.Catagory+"&typeSysid="+CatagoryID.Type;
        }
        else
        {
          url = GlobalVar + "/product/get?pageSize=15&categorySysid="+CatagoryID.Catagory
        }
      }
      else
      {
        url = GlobalVar + "/product/get?pageSize=15";
      }
      console.log("hello in slice");
      console.log(url);
      console.log(CatagoryID.Catagory);
      const response = await fetch(url);
      const Products = await response.json();
      console.log("products");
      console.log(Products);
      return Products;
    } catch (error) {
      console.log(error);
    }
  }
);

export const Products = createSlice({
  name: "Productslice",
  initialState: {
    isLoading: false,
    lastPage: false,
    pageno: 0,
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(FetchProductsList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(FetchProductsList.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.content != undefined) {
        state.data = action.payload.content;
      }
      state.isLoading = action.payload.lastPage;
      pageno++;
    });
  },
  reducers: {
    resetProducts: (state) => {
      state.data = [];
    },
    AddProduct: (state, action) => {
      console.log(action.payload);
    },
  },
});

export default Products.reducer;
