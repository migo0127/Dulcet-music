import React from 'react'

function ProductPicture(props) {
  return (
    <>
      <div className="product-picture">
        <svg
          className="product-black-tri"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 470 200"
        >
          <polygon className="cls-1" points="0 0 470 0 0 200 0 0" />
          <path
            className="cls-1"
            d="M465.1,1,1,198.49V1H465.1M470,0H0V200L470,0Z"
          />
        </svg>
        <span id="product-title">{props.productTitle}</span>
        <img
          id="product-title-img"
          src={require(`../../img/product/product-${props.productTitleId}-img.jpg`)}
        />
      </div>
    </>
  )
}

export default ProductPicture
