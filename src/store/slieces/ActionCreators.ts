import { createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from './ProductSlice'
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
	'products/fetchAll',
	async(page: number, thunkApi) => {
		try {
			const res = await axios.get<{data: Product[]}>(`https://reqres.in/api/products?page=${page}`)
			return res.data.data
		} catch (er: any) { 
			return thunkApi.rejectWithValue(er)
		}
	}
)