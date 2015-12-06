import React from 'react';

const Product = React.createClass({
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
					<strong>&pound;{this.props.Price}</strong><br />
					<em>&pound;{this.props.UnitPrice}/{this.props.unitType}</em>
					<p>Save to shopping list</p>
					<p>Rest of shelf</p>
				</div>
			</article>
		);
	}
});

export default Product;