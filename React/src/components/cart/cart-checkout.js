import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// 引入sweetalert2-react-content套件
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import CartDeliverInfo from './cart-deliverInfo.js';
import CartItem from './cart-cartItem.js';

function CartCheckout (props) {

  // 引入sweetalert2-react-content套件
  const MySwal = withReactContent(Swal);

  const { 
    cart, 
    setCart, 
    user, 
    setUser,  
    coupon,
    haveCoupon,
    discount,
    setDiscount,
    totalPrice,
    setTotalPrice, 
    orderPrice,
    setOrderPrice,
    buyAll,
    setBuyAll,
    buyThis,
    setBuyThis,
    checkstate, 
    setcheckstate,
    checkcallback,
    ReceivingName, 
    setReceivingName, 
    ReceivingAddress, 
    setReceivingAddress, 
    ReceivingPhone, 
    setReceivingPhone,  
    ReceivingEmail, 
    setReceivingEmail,    
    radiostate, 
    setRadiostate, 
    invoiceInfo,
    setInvoiceInfo,
    invoiceType,
    setInvoiceType,
    cartNum,
    setCartNum,
   } = props.allProps;  
  //  console.log(discount);
    

  // 計算購物車商品總價
  let itemPrice = 0;  
  cart.map((data, index)=>{
    // console.log(cart[index]);
    itemPrice += parseInt(cart[index].PPrice*cart[index].num);
  })
  // console.log(itemPrice);
  setTotalPrice(itemPrice);
  // console.log(totalPrice);
  

  // 計算訂單總價
  let orderprice = parseInt(totalPrice - discount)
  // console.log(discount);
  // console.log(orderprice);  
  setOrderPrice(orderprice);
  // console.log(orderPrice);
  

  // radiocallback函式：點擊時切換radio選取狀態並根據選項儲存發票資訊
  const radiocallback = (e) =>{
    // console.log('radiocallback') 
    // console.log(e);       
    // setInvoiceInfo('')
    // console.log(document.getElementById("invoice2").checked)
    let radiostate1 = document.getElementById("invoice1").checked;
    let radiostate2 = document.getElementById("invoice2").checked;
    let radiostate3 = document.getElementById("invoice3").checked;
    let radiostate4 = document.getElementById("invoice4").checked;
    setRadiostate([radiostate1, radiostate2, radiostate3, radiostate4])
    // console.log(e.value);

    let invoiceinfo2 = document.getElementById("invoicev").value;
    var selectindex = document.querySelector("select").selectedIndex;
    let invoiceinfo3 = document.querySelector("select").options[selectindex].value;
    let invo4value1= document.getElementsByClassName("companyinvoice")[0].value;
    let invo4value2= document.getElementsByClassName("companyinvoice")[1].value;
    let invoiceinfo4 = [ (invo4value1==0? '' :invo4value1), (invo4value2==0? '':invo4value2)];
    // console.log(invoiceinfo4);
    // A == true ? A.value : (B == true ? B.value : (C == 1 ? C.value : (D == 1 ? D.value : '' )) )
    setInvoiceInfo(
      radiostate1 == 1 ? ' ' : (radiostate2 == 1 ? invoiceinfo2 : (radiostate3 == 1 ? invoiceinfo3 : (radiostate4 == 1 ? invoiceinfo4 : '' )))
    )
  }
  useEffect(()=>{
    // setInvoiceInfo('')
    radiocallback(invoiceInfo)
  },[])
  // console.log(radiostate)
  // console.log(radiostate[0])
  // console.log(invoiceInfo);
  // console.log(invoiceType);
  

  // const radiocallback = (e) =>{
  //   // console.log(e);
  //   // console.log(e.checked)
  //   // console.log(e.value); 
  //   setRadiostate(e.checked)
  //   if (radiostate == 1) {   
  //     // alert(e.value)
  //     setInvoiceType(e.value) 
  //   }
  // }
  // 根據radio狀態切換發票資訊畫面
  // useEffect(()=>{
  //   radiocallback(invoiceType)
  // },[])
  // console.log(radiostate)
  // console.log(invoiceType)


  // const changeInvoiceInfo = (e) => {
  //   console.log(e) 
  //   console.log(radiostate)
  //   // 切換radio選項時，先清空invoiceInfo
  //   if (radiostate==0) {
  //     setInvoiceInfo('')
  //   }
  //   // setInvoiceInfo( 
  //   //   radiostate1 == 1 ? '' : (radiostate2 == 1 ? invoiceinfo2 : (radiostate3 == 1 ? invoiceinfo3 : (radiostate4 == 1 ? invoiceinfo4 : '' )))
  //   // )
  // }


    return (
      <>

          {/* 標題 */}
          <div className="cart-title">
            <h1><i className="fas fa-shopping-bag"></i> My Cart</h1>
            <div>
              <span className="cart-breadcrumb">❶ 確認商品</span>
              <span>➔ </span>
              <span>❷ 確認訂單</span>
              <span>➔ </span>
              <span>❸ 選擇付款方式</span>
              <span>➔ </span>
              <span>❹ 完成結帳</span>
            </div>
          </div>

          {/* 購物車商品 */}

          {/* { 購物車內無商品? (A畫面) : (B畫面) } */}

          { localStorage.getItem('cart')===null ? (

            <div className="cart-table">
                  <ul className='cart-thead'>
                    <li>選取</li>
                    <li>商品圖片</li>
                    <li>商品名稱</li>
                    <li>商品單價</li>
                    <li className="cart-rwd-noneed">數量</li>
                    <li className="cart-rwd-noneed">商品小計</li>
                    <li className="cart-rwd-noneed">刪除</li>
                  </ul>
                  <ul className="cart-order-category">
                    <li colSpan="7">購買清單</li>
                  </ul>   
                  {/* 商品明細 */}
                  <CartItem
                    allProps={{
                      cart,
                      setCart,
                      totalPrice,
                      cartNum,
                      setCartNum,
                      buyAll,
                      setBuyAll,
                      buyThis,
                      setBuyThis,
                  }}
                  />
            </div>
            
            ):(

              <div className="cart-table">
                  <ul className='cart-thead'>
                    {/* <li>選取</li> */}
                    <li>
                      <input id="selectall" type="checkbox" checked={buyAll? "checked" : "" } 
                        onClick={(e)=>{ 
                          if (!e.target.checked) {
                            setBuyAll(false) 
                          } else {
                            setBuyAll(true)
                          }
                        }}                      
                      />
                    </li>
                    <li>商品圖片</li>
                    <li>商品名稱</li>
                    <li>商品單價</li>
                    <li className="cart-rwd-noneed">數量</li>
                    <li className="cart-rwd-noneed">商品小計</li>
                    <li className="cart-rwd-noneed">刪除</li>
                  </ul>
                  <ul className="cart-order-category">
                    <li colSpan="7">購買清單</li>
                  </ul>   
                  {/* 商品明細 */}
                  <CartItem
                    allProps={{
                      cart,
                      setCart,
                      totalPrice,
                      cartNum,
                      setCartNum,
                      buyAll,
                      setBuyAll,
                      buyThis,
                      setBuyThis,
                  }}
                  />
              </div>

            )
          }

          {/* 兩個表單 */}
          <div>
            <form className="cart-form" action="/cart/2" method="post" encType="multipart/form-data">

              {/* 表單1：收件人資訊 */}
              <CartDeliverInfo 
                allProps={{
                  user,
                  setUser,
                  checkstate, 
                  setcheckstate,
                  checkcallback,
                  ReceivingName, 
                  setReceivingName, 
                  ReceivingAddress, 
                  setReceivingAddress, 
                  ReceivingPhone, 
                  setReceivingPhone, 
                  ReceivingEmail, 
                  setReceivingEmail
              }}
              />

              {/* 表單2：統一發票 */}
              <div className="cart-invoice" id="cart-invoice">
                  <h2>統一發票</h2>
                  <fieldset>

                    {/* 選項1：會員載具 */}

                    <div>
                      <label>
                        <input type="radio" name="invoice" id="invoice1" value="會員載具"                  
                          // 從cart2回上一頁時，同帳戶資料默認勾選狀態
                          checked={radiostate[0]? "checked" : ""}   
                          onClick={(e)=>{ 
                            radiocallback(e.target)
                            setInvoiceType(e.target.value)
                          }}
                        /> 會員載具
                      </label>
                      <span>中獎時我們會將發票寄送至您的收件地址</span>
                    </div>

                    {/* 選項2：手機條碼載具 */}

                    <div>
                      <label>
                        <input type="radio" name="invoice" id="invoice2" value="手機條碼載具"                  
                          // 從cart2回上一頁時，同帳戶資料默認勾選狀態
                          checked={radiostate[1]? "checked" : ""}   
                          onClick={(e)=>{ 
                            radiocallback(e.target) 
                            setInvoiceType(e.target.value)
                          }}
                        /> 手機條碼載具
                      </label>
                      <div className="cart-input1">
                        <label htmlFor="invoice">載具號碼</label>
                        <input id="invoicev" type="text" value={radiostate[1]==1? invoiceInfo: ''}
                          onChange={ (e)=>{ 
                            // console.log(e.target.value)
                            if (document.getElementById('invoice2').checked) {
                              setInvoiceInfo(e.target.value)
                            }
                          }}
                          onBlur={(e)=>{
                            const reg = /^\/{1}[0-9A-Z]{7}$/;
                            if (!e.target.value.match(reg)) {
                              MySwal.fire('請輸入正確載具號碼', '', 'error')
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* 選項3：捐贈發票 */}

                    <div style={{padding:'0 0 20px 0'}}>
                      <label>
                        <input type="radio" name="invoice" id="invoice3" value="捐贈發票"                 
                          // 從cart2回上一頁時，同帳戶資料默認勾選狀態
                          checked={radiostate[2]? "checked" : ""}    
                          onClick={(e)=>{ 
                            radiocallback(e.target) 
                            setInvoiceType(e.target.value)
                          }}
                        /> 捐贈發票
                      </label>
                      <span>提醒您，捐贈發票後無法變更成開立或索取紙本發票。</span>
                      <select onChange={(e)=>{
                        if (document.getElementById('invoice3').checked) {                          
                          setInvoiceInfo(e.target.value)
                        }
                      }}>
                        <option value="台灣流浪兔保護協會">台灣流浪兔保護協會</option>
                        <option value="社團法人台灣愛兔協會">社團法人台灣愛兔協會</option>
                        <option value="財團法人陽光社會福利基金會">財團法人陽光社會福利基金會</option>
                      </select>
                    </div>

                    {/* 選項4：公司戶發票 */}

                    <div>
                      <label>
                        <input type="radio" name="invoice" id="invoice4" value="公司戶發票"                  
                          // 從cart2回上一頁時，同帳戶資料默認勾選狀態
                          checked={radiostate[3]? "checked" : ""}   
                          onClick={(e)=>{ 
                            radiocallback(e.target) 
                            setInvoiceType(e.target.value)
                          }}
                        /> 公司戶
                      </label>
                      <span>提醒您，公司戶發票一旦開立，不得任意更改或改為個人戶發票。</span>
                      <div className="cart-input1">
                        <label htmlFor="invoice">統一編號</label>
                        <input className="companyinvoice" id="" type="text" maxlength="8" value={radiostate[3]==1? invoiceInfo[0]: ''}
                          onChange={ (e)=>{ 
                            let data = invoiceInfo[1]
                            if (document.getElementById('invoice4').checked) {
                              setInvoiceInfo([ (e.target.value==0? '' :e.target.value), data ]) 
                            }
                          }}
                        />
                      </div>
                      <div className="cart-input1">
                        <label htmlFor="invoice">發票抬頭</label>
                        <input className="companyinvoice" id="" type="text" value={radiostate[3]==1? invoiceInfo[1]: ''}
                          onChange={ (e)=>{ 
                            let data = invoiceInfo[0]
                            if (document.getElementById('invoice4').checked) {
                              setInvoiceInfo([ data, (e.target.value==0? '' :e.target.value)]) 
                            }
                          }}
                        />
                      </div>
                    </div>

                </fieldset>
              </div>
            </form>
          </div>

          {/* 訂單金額合計區 */}
          <div className="cart-total">

            {/* 折扣碼 */}
            <div className="cart-discount">
              <label htmlFor="discount">折扣碼</label>
              <input className="" id="discount" type="text"
                onChange={ (e)=>{  
                  // console.log(!e.target.value==0)
                  if ( !e.target.value == 0) { 
                    let couponDate = JSON.parse(localStorage.getItem('coupon'))
                    // console.log(couponDate==null)
                    if (couponDate!==null){
                      if ( couponDate[0]['couponLocalStorage']==0 ) {
                        if ( e.target.value == coupon ) {
                          // alert('恭喜您折扣碼符合')                    
                          MySwal.fire('折扣碼符合，可折價200元', '', 'success')                      
                          setDiscount(200);
                        } else {             
                          setDiscount(0);
                        } 
                      } 
                    }
                  }
                }}
              />
            </div>

            {/* 計算欄位 */}
            <div className="cart-total-right">
              <div>
                <span className="cart-total-title">合計</span>
                <span className="cart-total-number cart-english-font">
                  $ {totalPrice.toString().replace( /(\d)(?=(\d{3})+(\d{3})?$)/g, '$1,' )}
                </span>
              </div>
              <div style={{color:'var(--main-colorfb2)'}}>
                <span className="cart-total-title">折扣</span>
                <span className="cart-total-number cart-english-font">
                  - $ {discount.toString().replace( /(\d)(?=(\d{3})+(\d{3})?$)/g, '$1,' )}
                </span>
              </div>
              <div>
                <span className="cart-total-title">總計</span>
                <span className="cart-total-number cart-english-font">
                  $ {orderPrice.toString().replace( /(\d)(?=(\d{3})+(\d{3})?$)/g, '$1,' )}
                </span>
              </div>
            </div>

          </div>

          {/* 按鈕區 */}
          <div className="cart-checkout-btn">

            <button type="button"
              onClick={()=>{
                window.history.back()
              }}
            >
              繼續購物   
            </button>

            {/* 購物車無商品時阻擋使用者繼續進入結帳頁面 */}
            {localStorage.getItem('cart')===null ? (

                <button id="nextstep" type="button" onClick={(e)=>{
                  MySwal.fire('購物車內無商品無法進行結帳', '', 'error')
                }}>
                  下一步
                </button>

              ):(
                
                <Link> 
                  <button id="nextstep" type="button" onClick={(e)=>{   
                    let infodiv = [...document.getElementsByClassName('cart-input')]
                    // console.log(infodiv[0].querySelector("input").value)
                    let buyerInfo = infodiv.map( el => {
                      // console.log( !el.querySelector("input").value==0 )
                      if (el.querySelector("input").value==0||el.querySelector("input").value==' ') {
                        return '沒有'
                      } else {
                        return el.querySelector("input").value
                      }
                    })   
                    // console.log(buyerInfo)                     
                    if ( buyerInfo[0]=='沒有') {
                      window.location.hash="#cart-buyer-info"
                      MySwal.fire('請填寫收件人姓名', '', 'error')
                    } else {    
                      if (buyerInfo[1]=='沒有') {
                        window.location.hash="#cart-buyer-info"
                        MySwal.fire('請填寫收件人地址', '', 'error') 
                      } else {   
                        if (buyerInfo[2]=='沒有') {
                          window.location.hash="#receivingInfo"
                          MySwal.fire('請填寫收件人手機號碼', '', 'error')    
                        } else {
                          if (buyerInfo[3]=='沒有') {
                            window.location.hash="#receivingInfo"
                            MySwal.fire('請填寫收件人電子信箱', '', 'error')         
                            // console.log(radiostate)
                            // console.log(radiostate.every((el)=> el==false))
                          } else {
                            if (radiostate.every((el)=> el==false)) {
                              // let offsetTop = document.getElementById("cart-invoice").offsetTop
                              // console.log(offsetTop)
                              window.location.hash="#email"
                              MySwal.fire('請填寫發票資訊', '', 'error')
                            } else {  
                              // console.log(invoiceInfo)
                              if (invoiceInfo==''||invoiceInfo[1]=='') {
                                window.location.hash="#cart-invoice"
                                MySwal.fire('請填寫發票資訊', '', 'error')
                              } else {
                                props.history.push('/cart/2')
                              }                    
                            } 
                          }  
                        }
                      }
                    }
                  }}>
                    下一步
                  </button>
                </Link>

              )            
            }
            
          </div>

      </>
    );
}


export default withRouter(CartCheckout);
