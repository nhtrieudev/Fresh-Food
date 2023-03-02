import { createSlice } from '@reduxjs/toolkit'

export const cartReducer = createSlice({
    name: 'products',
    initialState: {
        products: localStorage.getItem("cartRedux") ? JSON.parse(localStorage.getItem("cartRedux" || "null")) : [],
    },
    reducers: {
        addCart: (state, action) => {
            state.products = [...state.products, action.payload];
            localStorage.setItem("cartRedux", JSON.stringify(state.products));
        },
        removeCart: (state, action) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload
            );
            localStorage.setItem("cartRedux", JSON.stringify(state.products));
        },
        removeAll: (state, action) => {
            state.products = action.payload;
        },
    },
})

export const { addCart, removeCart, removeAll } = cartReducer.actions

export default cartReducer.reducer