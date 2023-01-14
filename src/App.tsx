import React, { useEffect } from 'react';
import './App.css';
import ProductBlock from './components/ProductsPage';
import { useAppDispatch} from './hooks'
import { fetchProducts } from './store/slieces/ActionCreators'
import {createBrowserRouter,RouterProvider} from "react-router-dom";


function App() {
	const distpatch = useAppDispatch()
	useEffect(() => {
		distpatch(fetchProducts(1))		//z uwagi na to, że funkcjonalność reqres jest ograniczona i nie można podzielić żądania limitem, ładuję wszystkie dane
		distpatch(fetchProducts(2))
	}, [ ])

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


