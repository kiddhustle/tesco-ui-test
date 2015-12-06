import React from 'react';

const Product = React.createClass({
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
			console.log('quantity increase');
		});
	},
	handleClickQtyDecrement:function(e){
		if(this.state.quantityToAdd > 0){
			let iNew = this.state.quantityToAdd - 1;
			this.setState({
				quantityToAdd:iNew
			}, function(){
				console.log('quantity decrease');
			});
		}
	},
	render:function(){
		return (
			<article className="productlist__item" data-product-id={this.props.Id}>
				<div className="productlist__item__info">
					<img src={this.props.Image}/>
					<h1 className="productlist__item__info__name">{this.props.Name}</h1>
					<div className="productlist__item__info__promos">
						<div className="productlist__item__info__promos__item">
							<div className="productlist__item__info__promos__item__detail">Only £1.50</div>
							<div className="productlist__item__info__promos__item__expires"></div>
						</div>
					</div>
				</div>
				<div className="productlist__item__basketpricing">
					<div className="productlist__item__basketpricing__price">
						<div className="productlist__item__basketpricing__price__unit">&pound;{this.props.Price}</div>
						<div className="productlist__item__basketpricing__price__item">
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
								<td><input type="button" value="-" onClick={this.handleClickQtyDecrement}/></td>
								<td><input type="number" value={this.state.quantityToAdd} className="productlist__item__basketpricing__controls__qty" /></td>
								<td><input type="button" value="+" onClick={this.handleClickQtyIncrement}/></td>
								<td>
									<a onClick={this.props.handleClickAddBtn} className="productlist__item__basketpricing__controls__btnadd" data-product-id={this.props.Id} data-product-add-qty={this.state.quantityToAdd}>
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
});

export default Product;