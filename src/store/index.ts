import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import ProductSlice from './slieces/ProductSlice'

export const rootReducer = combineReducers({
	products: ProductSlice 
  })

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {

	return configureStore({
		reducer: rootReducer,
		preloadedState
	  })

}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


