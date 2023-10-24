import { configureStore } from "@reduxjs/toolkit";
import ProductSlices from "./ProductSlices";

const storeRedux = configureStore({
    reducer:ProductSlices
})

export default storeRedux