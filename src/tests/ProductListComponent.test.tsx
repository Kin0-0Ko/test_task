import React from "react";
import ProductList from '../components/ProductListComponent';
import { fireEvent, render, screen } from "@testing-library/react";

const mockObject = {
	id:1,
	name:"cerulean",
	year:2000,
	color:"#98B2D1",
	 pantone_value:"15-4020"
	}
const onCLick = jest.fn()

describe("Test ProductList", () => {

it("Snapshot product list component with props", () => {
	const {asFragment } = render(<ProductList products={[mockObject]}/>)
	expect(asFragment()).toMatchSnapshot()
})
it("should render product list component", () => {
		render(<ProductList products={[mockObject]} callback={onCLick}/>)
		expect(screen.getByTestId('product-elem')).not.toBeNull()
})
it("should not render product list component", () => {
	render(<ProductList products={[]}/>)
	expect(screen.queryByTestId('product-elem')).toBeNull()
})
it("Snapshot product list component with empty props", () => {
	const {asFragment } = render(<ProductList products={[]}/>)
	expect(asFragment()).toMatchSnapshot() 
})

it("onCLick works", () => {
	render(<ProductList products={[mockObject]} callback={onCLick}/>)
	fireEvent.click(screen.getByTestId('product-elem'))
	expect(onCLick).toHaveBeenCalled()
})

})