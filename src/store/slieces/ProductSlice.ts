import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async(page: number, thunkApi) => {
		try {
			const res = await axios.get<FetchResponse>(`https://reqres.in/api/products?per_page=5&page=${page}`)
			
			return res.data
		} catch (er: any) { 
			return thunkApi.rejectWithValue(er)
		}
	}
)

export const searchProduct = createAsyncThunk(
	'products/searchProduct',
	async(id: number, thunkApi) => {
		try {
			const res = await axios.get<{data: Product}>(`https://reqres.in/api/products?id=${id}`)
			
			return res.data.data
		} catch (er: any) { 
			return thunkApi.rejectWithValue(er)
		}
	}
)

export type Product = {
	color: string,
	id: number,
	name: string,
	pantone_value: string,
	year: number
}

type FetchResponse = {
	data: Product[]
	page: number
	per_page: number
	support : object
	total: number
	total_pages: number
}

type ProductsState = {
	isLoading: boolean,
	products: Product[],
	searched: Product[],
	totalPage: number,
	error: Error | AxiosError | undefined
}

const initialState: ProductsState = {
	isLoading: false,
	products: [],
	searched: [],
	totalPage: 0,
	error: undefined,

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


		},
		productsFetchingError(state, action: PayloadAction<Error | AxiosError>){
			state.isLoading = false
			state.error = action.payload

		},
		searchClean(state){
			state.searched = []
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<FetchResponse>) => {
			state.isLoading = false
			state.products = action.payload.data
			state.totalPage = action.payload.total_pages
		});
		builder.addCase(fetchProducts.pending, (state, action: PayloadAction) => {
			state.isLoading = true
			state.error = undefined

		});
		builder.addCase(fetchProducts.rejected, (state, action: any) => {
			state.isLoading = false
			state.error = action.payload
			state.error = undefined


		});

		builder.addCase(searchProduct.fulfilled,(state, action: PayloadAction<Product>) => {
			state.isLoading = false
			state.searched = [action.payload]
			state.error = undefined


		});
		builder.addCase(searchProduct.pending, (state, action) => {
			state.isLoading = true
			state.searched = []
			state.error = undefined


		});
		builder.addCase(searchProduct.rejected, (state, action: any) => {
			state.isLoading = false
			state.error = action.payload
			state.searched = []


		});

	}

})
export const {searchClean} = ProductsSlice.actions
export default ProductsSlice.reducer;