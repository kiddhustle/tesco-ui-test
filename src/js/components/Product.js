import React from 'react';

const Product = React.createClass({
	propTypes:{
		handleClickAddBtn:React.PropTypes.func,
		basketRemoveProduct:React.PropTypes.func,
		viewType:React.PropTypes.string,
		basketIncrementProduct:React.PropTypes.func,
		basketDecrementProduct:React.PropTypes.func
	},
	getInitialState:function(){
		return {
			quantityToAdd:0
		};
	},
	handleClickQtyIncrement:function(e){
		let iNew = this.state.quantityToAdd + 1;
		this.setState({
			quantityToAdd:iNew
		},function(){
			// console.log('quantity increase');
		});
	},
	handleClickQtyDecrement:function(e){
		if(this.state.quantityToAdd > 0){
			let iNew = this.state.quantityToAdd - 1;
			this.setState({
				quantityToAdd:iNew
			}, function(){
				// console.log('quantity decrease');
			});
		}
	},
	handleClickRemoveBtn:function(e){
		let oData = e.target.dataset;
		this.props.basketRemoveProduct(oData.productId);
		this.setState({quantityToAdd:0});
	},
	onClickAdd:function(e){
		e.preventDefault();
		let cb = function(){
			this.setState({quantityToAdd:0});
		}.bind(this);
		this.props.handleClickAddBtn(e, cb);
		
	},
	onClickIncrement:function(e){
		this.props.basketIncrementProduct(this.props.Id);
	},
	onClickDecrement:function(){
		this.props.basketDecrementProduct(this.props.Id);
	},
	render:function(){
		let view;
		if(this.props.viewType === 'list'){
			view = (
				<article className="productlist__item" data-product-id={this.props.Id}>
					<div className="productlist__item__info">
						<img src={this.props.Image} alt={this.props.Name}/>
						<h1 className="productlist__item__info__name">{this.props.Name}</h1>
						<div className="productlist__item__info__promos">
							{this.props.Promotions.map(function(promo){
								let aClasses = ['productlist__item__info__promos__item__detail'];
								if(promo.Type === 'Reward'){
									aClasses.push('productlist__item__info__promos__item__detail--reward');
								}
								let sClasses = aClasses.join(' ');
								return (
									<div className="productlist__item__info__promos__item" key={promo.Id}>
										<div className={sClasses}>{promo.Description}</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="productlist__item__basketpricing">
						<div className="productlist__item__basketpricing__price clearfix">
							<div className="productlist__item__basketpricing__price__item">&pound;{this.props.Price.toFixed(2)}</div>
							<div className="productlist__item__basketpricing__price__unit">
								&pound;{this.props.UnitPrice}/{this.props.unitType}
							</div>
						</div>
						<table className="productlist__item__basketpricing__controls">
							<thead>
								<tr>
									<td colSpan="3" className="productlist__item__basketpricing__controls__label">Quantity</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><input type="button" value="-" onClick={this.handleClickQtyDecrement} className="productlist__item__basketpricing__controls__decrement"/></td>
									<td><input type="text" readOnly="readonly" value={this.state.quantityToAdd} className="productlist__item__basketpricing__controls__qty" /></td>
									<td><input type="button" value="+" onClick={this.handleClickQtyIncrement} className="productlist__item__basketpricing__controls__increment"/></td>
									<td>
										<a onClick={this.onClickAdd} href="#" className="productlist__item__basketpricing__controls__btnadd" data-product-id={this.props.Id} data-product-add-qty={this.state.quantityToAdd}>
											Add
										</a>
									</td>
								</tr>
							</tbody>
						</table>
						<em></em>
						<p>Save to shopping list</p>
						<p>Rest of shelf</p>
					</div>
				</article>
			);
		}
		else {
			view = (
				<article className="basket__contents__item">
					<table>
						<tbody>
							<tr>
								<td colSpan="2">
									<img className="basket__contents__item__img" src={this.props.Image} alt={this.props.Name}/>
									<span className="basket__contents__item__name">{this.props.Name}</span>
									<input data-product-id={this.props.Id} className="basket__contents__item__removebtn" type="button" value="X" onClick={this.handleClickRemoveBtn} />
								</td>
							</tr>
							<tr>
								<td className="basket__contents__item__controls" title={this.props.Name}>
									<input type="button" value="-" onClick={this.onClickDecrement} className="productlist__item__basketpricing__controls__decrement"/>
									<input type="text" readOnly="readonly" value={this.props.BasketQty} className="productlist__item__basketpricing__controls__qty" />
									<input type="button" value="+" onClick={this.onClickIncrement} className="productlist__item__basketpricing__controls__increment"/>
								</td>
								<td className="basket__contents__item__subtotal">&pound;{(this.props.Price * this.props.BasketQty).toFixed(2)}</td>
							</tr>
						</tbody>
					</table>
				</article>
				);
		}
		return view;
	}
});

export default Product;