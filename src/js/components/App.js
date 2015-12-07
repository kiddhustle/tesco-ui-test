import React from 'react';
import ReactDOM from 'react-dom';
// components
import Product from './Product';
import request from 'superagent-bluebird-promise';
// store
// import AppStore from '../model/AppStore';

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
	basketRemoveProduct:function(productId){
		let oProduct = this.findProductById( parseInt(productId) );
		if(oProduct === undefined){return;}
		oProduct.BasketQty = 0;

		let updatedList = this.state.productlist.map(function(currProduct){
			if(currProduct.Id === oProduct.Id){
				return oProduct;
			}
			else {
				return currProduct;
			}
		});

		this.setState({productlist:updatedList});
	},
	basketIncrementProduct:function(productId){
		let oProduct = this.findProductById(productId);
		if(oProduct === undefined){ return;};

		oProduct.BasketQty = oProduct.BasketQty + 1;

		let updatedList = this.state.productlist.map(function(currProduct){
			if(currProduct.Id === oProduct.Id){
				return oProduct;
			}
			else {
				return currProduct;
			}
		});
		this.setState({productlist:updatedList});
	},

	basketDecrementProduct:function(productId){
		let oProduct = this.findProductById(productId);
		if(oProduct === undefined){ return;};

		oProduct.BasketQty = oProduct.BasketQty - 1;

		let updatedList = this.state.productlist.map(function(currProduct){
			if(currProduct.Id === oProduct.Id){
				return oProduct;
			}
			else {
				return currProduct;
			}
		});
		this.setState({productlist:updatedList});
	},
	basketGetNumItems:function(){
		let aItems = this.getProductsInBasket();
		let iNum = aItems.reduce(
			(prev, current, index) => prev + current.BasketQty,
			0
		);
		return iNum;
	},
	handleClickAddBtn:function(e, cb){
		// console.log(e);
		let oData = e.target.dataset;
		let oProduct = this.findProductById( parseInt(oData.productId) );
		if(oProduct === undefined){return;}
		// console.log(oProduct);
		// increment BasketQty
		oProduct.BasketQty += parseInt( oData.productAddQty );
		// generate updated productlist
		let updatedList = this.state.productlist.map(function(currProduct){
			if(currProduct.Id === oProduct.Id){
				return oProduct;
			}
			else {
				return currProduct;
			}
		});

		this.setState({productlist:updatedList});
		if(cb){
			cb()
		}
	},
	findProductById :function(productId){
		let aResult = this.state.productlist.filter( this.fnFilterById(productId) );
		if(aResult.length > 0){
			return aResult[0];
		}
		else {
			return undefined;
		}
	},
	getProductsInBasket:function(){
		return this.state.productlist.filter( function(product) {
			// console.log(product);
			return product.BasketQty > 0
		});
	},
	handleFilterChange:function(e){
		this.setState({
			filterOption:e.target.value
		});
	},
	fnFilterById:function(productId){
		return function(product){
			// console.log(product);
			return product.Id === productId;
		}
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
						{filteredProducts.map( (product) => <Product {...product} viewType='list' key={product.Id} handleClickAddBtn={this.handleClickAddBtn} basketRemoveProduct={this.basketRemoveProduct} /> )}
					</div>	
				</section>
				
				<aside className="basket">
					<h2 className="basket__header">Basket: {this.basketGetNumItems()} items</h2>
					<div className="basket__contents">{this.getProductsInBasket().map((product) => (
						<Product {...product} viewType='basket' key={product.Id} handleClickAddBtn={this.handleClickAddBtn} basketRemoveProduct={this.basketRemoveProduct} basketIncrementProduct={this.basketIncrementProduct} basketDecrementProduct={this.basketDecrementProduct} />
						) )}</div>
				</aside>
			</div>
			);
	}
});

export default App;