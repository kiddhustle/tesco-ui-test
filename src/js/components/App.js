import React from 'react';
import ReactDOM from 'react-dom';
// components
import Product from './Product';
import request from 'superagent-bluebird-promise';

const App = React.createClass({
	propTypes:{
		dataUri:React.PropTypes.string
	},
	getInitialState:function(){
		return {
			productlist:[],
			basket:[],
			filterOption:null
		};
	},
	componentDidMount:function(){
		this.fetchData();
	},
	fetchData:function(){
		var self =this;
		request.get(this.props.dataUri)
			.then(
				function(res) {
					self.setState({
						productlist:res.body.Details
					});
				},
				function(err){
					console.log('error', err);
				}
			);
	},
	handleFilterChange:function(e){
		this.setState({
			filterOption:e.target.value
		});
	},
	fnSortByName:function(a,b){
		if (a.Name < b.Name)
			return -1;
		if (a.Name > b.Name)
			return 1;
		return 0;
	},
	fnSortByPrice:function(a,b){
		if (a.Price < b.Price)
			return -1;
		if (a.Price > b.Price)
			return 1;
		return 0;
	},
	render:function(){
		if( this.state.filterOption ){
			var compareFunc = this.state.filterOption.toLowerCase() === 'price' ? this.fnSortByPrice : this.fnSortByName;

		}
		let filteredProducts = compareFunc ? this.state.productlist.sort( compareFunc ) : this.state.productlist;
		// console.log('filteredProducts', filteredProducts);
		return (
			<div className="clearfix">
				<section className="main">
					<nav className="search">
						<span>Sort by:</span>
						<select onChange={this.handleFilterChange}>
							<option name="name">Name</option>
							<option name="price">Price</option>
						</select>
						<input value="Go" type="button"/>
					</nav>
					<div className="productlist clearfix">
						{filteredProducts.map( (item) => <Product key={this.props.Id} {...item} /> )}
					</div>	
				</section>
				
				<aside className="sidebar">
					<h2>Basket</h2>
				</aside>
			</div>
			);
	}
});

export default App;