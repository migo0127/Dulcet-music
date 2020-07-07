import React, { useState, Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// 獲取localStorage資料
const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('user'))
}

class NavbarShoppingCart extends Component {
  state = {
    login: false,
    user:[],
    width: window.innerWidth,
  }
  componentDidMount() {
    let user = getUserInfo()

    // 先判斷localStorage是否有值
    if (user === null) {
      this.setState({ login: false })
      this.handleClick = () => {
        window.location = '/login'
      }
    } else {
      this.setState({ login: true })
      this.setState({user: user[0]})
      this.handleClick = () => {
        window.location = '/cart'
      }

      this.handleClickOrder = () =>{
        window.location = '/ManufacturerInstrument/InstrumentOrder'
      }
    }

    const { width } = this.state

    const handleRWD = () => {
      const width = window.innerWidth
      this.setState({ width })
      // console.log(width);
    }

    window.addEventListener('resize', handleRWD)
  }

  render() {
    const display = this.state.width < 768 ? 'none' : '';
    const {user,login} = this.state;
    let { cartNum } = this.props;

    const pointShow = cartNum === 0 ? 'none' : 'block'


    const shoppingIcon = (
      <div>
        <div className="nav-shopping-area" onClick={this.handleClick}>
        <i className="fas fa-shopping-cart"></i>
        </div>

        <span className="home-shopping-point nav-shopping-point" style={{display:pointShow}}>
        {cartNum}
        </span>
        {/*<div className="nav-shopping-cart nav-shopping-cart" style={{display}}>123</div>*/}
      </div>
    )

    const orderIcon = (
      <div>
        <div className="nav-shopping-area" onClick={this.handleClickOrder}>
         <i className="fas fa-file-alt"></i>
        </div>

        {/*<span className="home-shopping-point nav-shopping-point">
        {cartNum}
        </span>
        <div className="nav-shopping-cart nav-shopping-cart" style={{display}}>123</div>*/}
      </div>
    )

    const shoppingArea = login ? (user.userID ? shoppingIcon : orderIcon ) : shoppingIcon ;

    return (
      <>
        {shoppingArea}
      </>
    )
  }
}

export default NavbarShoppingCart
