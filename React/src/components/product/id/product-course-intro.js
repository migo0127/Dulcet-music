import React, { useState } from 'react'
import Amount from './product-intro-amount'
import Btn from './product-intro-btn'

function ProductIntro(props) {
  const { cartNum, setCartNum } = props
  const favArr = props.favArr
  const setFavArr = props.setFavArr
  const productName = props.productName
  const PIntro = props.PIntro
  const PPrice = props.PPrice
  const PQty = props.PQty
  const PId = props.PId
  const PTime = props.PTime
  const dataP = props.dataP
  const setDataP = props.setDataP
  const [amount, setAmount] = useState(1)

  return (
    <>
      <div
        id="product-id-intro-wrapper"
        className="product-video-id-intro-wrapper"
      >
        <div id="product-id-intro-course-picture-wrapper">
          <img
            id="product-id-intro-course-picture"
            src={`http://localhost:3030/images/product/${props.PImg}`}
            alt={productName}
            title={productName}
          ></img>
        </div>
        <div id="product-id-intro-text">
          <div id="product-id-intro-text-top">
            <h2 id="product-id-intro-text-title">{productName}</h2>
            <p id="product-id-intro-text-p">{PTime}</p>
            <pre id="product-id-intro-text-p">{PIntro}</pre>
          </div>
          <div id="product-id-intro-text-bottom">
            <h2 id="product-id-intro-text-cost-title">售價</h2>
            <h2 id="product-id-intro-text-cost">${PPrice}</h2>
            <Amount PQty={PQty} amount={amount} setAmount={setAmount} />

            <Btn
              cartNum={cartNum}
              setCartNum={setCartNum}
              amount={amount}
              setAmount={setAmount}
              PId={PId}
              dataP={dataP}
              setDataP={setDataP}
              CId={props.CId}
              favArr={favArr}
              setFavArr={setFavArr}
              CatId={props.CatId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductIntro
