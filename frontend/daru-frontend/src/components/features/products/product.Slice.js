import {createSlice} from '@reduxjs/toolkit'

const initialState={
    products:[{}]
}

export const productSlice= createSlice ({
    name:"products",
    initialState,
    reducers:{
        addProducts:(state,action)=>{
            const products={
                _id:action.payload
            }
            state.products.push(products)
        }
    }
})

export const {addProducts}=productSlice.actions

export default  productSlice.reducer