import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/products";

const initialState: {productsList: Product[]} = {
    productsList: []
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateProducts : (state, action: PayloadAction<Product[]>) => {
            state.productsList = action.payload
            console.log(state.productsList);
        }
    }
})

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;