import {configureStore} from '@reduxjs/toolkit'
import productSlice from '../features/products/product.Slice'

export const store=configureStore({
    reducer:productSlice
})

