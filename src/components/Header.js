import { Link } from 'react-router-dom';
import React from 'react';
import {useCart} from "../hooks/useCart"


function Header(props) {
    const {totalPrice} = useCart()
    return ( <header className="header">

    <Link to="/">
    <div className="headerLeft">
      <img src="/img/logo.png" alt='logo'></img>

      <div className="headerInfo">
        <h3>REACT SNEAKERS</h3>
        <p>Магазин лучших кроссовок</p>
      </div>
    </div>
    </Link>

    <ul className="headerRight">
      <li onClick={props.onClickCart} className="basket"> {/*Открываем корзину при клике */}
        <img className="header-basket" src="/img/korz.svg" alt="корзина"></img>
        <span>{totalPrice} руб.</span>
      </li>
      <li>
        
        <Link to="/favorites">
          <img className="header-heart" src="/img/heart.svg" alt="избранное"></img>
        </Link>

      </li>
      <li>
        <Link to="/orders">
          <img className="header-user" src="/img/user.svg" alt="личный кабинет"></img>
        </Link>
      </li>
    </ul>
  </header>)
}

export default Header; 