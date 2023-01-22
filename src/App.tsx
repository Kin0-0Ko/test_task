import React, { useEffect } from 'react';
import './App.css';
import ProductBlock from './pages/ProductsPage';
import { useAppDispatch} from './hooks'
import { fetchProducts } from './store/slieces/ProductSlice'
import {createBrowserRouter,RouterProvider} from "react-router-dom";


function App() {
	const distpatch = useAppDispatch()
	useEffect(() => {
		distpatch(fetchProducts(1))	
	}, [distpatch])

	const router = createBrowserRouter([
		{
			path: "/",
			element: <ProductBlock/>
		},
		{
		  path: "/:page",
		  element: 	<ProductBlock/>
		}
	  ]);

  return (	
    <div className="App">
		<RouterProvider router={router}/>
    </div>
  );
}

export default App;


