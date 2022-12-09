import { Link } from 'react-router-dom';

function Header(props) {
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
        <span>1205 руб.</span>
      </li>
      <li>
        
        <Link to="/favorites">
          <img className="header-heart" src="/img/heart.svg" alt="избранное"></img>
        </Link>

      </li>
      <li>
      <img className="header-user" src="/img/user.svg" alt="личный кабинет"></img>
      </li>
    </ul>
  </header>)
}

export default Header; 