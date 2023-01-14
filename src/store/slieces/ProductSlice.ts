import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from './ActionCreators';

export type Product = {
	color: string,
	id: number,
	name: string,
	pantone_value: string,
	year: number
}

type ProductsState = {
	isLoading: boolean,
	products: Product[],
	searched: Product[],
	error:string
}

const initialState: ProductsState = {
	isLoading: false,
	products: [],
	searched: [],
	error: ''

}

const ProductsSlice = createSlice({

	name: 'Products',
	initialState,
	reducers: {
		productsFetching(state){
			state.isLoading = true
		},
		productsFetchingSuccesproducts(state, action: PayloadAction<Product[]>){
			state.isLoading = false
			state.products = action.payload
			state.error = ''


		},
		productsFetchingError(state, action: PayloadAction<string>){
			state.isLoading = false
			state.error = action.payload

		},
		productsSearch(state, action : PayloadAction<number>){
			state.searched = []
			state.products.forEach(el => {			
				if(el.id === action.payload){
					state.searched.unshift(el)
				}
			}
				)
		}
	},
	extraReducers: {
		[fetchProducts.fulfilled.type]:(state, action: PayloadAction<Product[]>) => {
			state.isLoading = false
			state.products.push(...action.payload)
			state.error = ''


		},
		[fetchProducts.pending.type]:(state, action: PayloadAction<Product[]>) => {
			state.isLoading = true

		},
		[fetchProducts.rejected.type]:(state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload

		}

	}

})
export const {productsSearch} = ProductsSlice.actions
export default ProductsSlice.reducer;