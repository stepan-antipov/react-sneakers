function Drawer({cartClose, onRemove, items = []}) {
    return(
    <div /*style={{position: "static"}}*/ className="overlay">
        <div /*style={{display: "none"}}*/ className="drawer">
          
          <div  className="cart">
            <div className="cartTop">
              <h2>Корзина</h2>
              <button><img onClick={cartClose} className="closeButton" src="/img/close.svg" alt="close"></img></button> {/*Вытаскиваем из пропсов функцию, закрывающую карточку */}
          </div>
          
          
          { items.length > 0 ? (
            <div className="cartItems"> {/*Перебираем пришедший масив данных и помещаем эти данные в нашу верстку */}
            {items.map((obj) => ( 

          <div className="cartItem">
            <img className="cartImg" src={obj.imageUrl} alt=""></img>
            <div className="mid">
              <p>{obj.title}</p>
              <b>{obj.price} руб.</b>
            </div>
            <button onClick={() => onRemove(obj.id)}><img src="/img/close.svg" alt="close"></img></button>
          </div>

          ))}
          </div>
          ) : (

          <div className='emptyBox'>
            <img src="./img/emptyBox.jpg"></img>
            <h2>Корзина пуста</h2>
            <p>Добавте хотя бы один товар, чтобы сделать заказ</p>
          </div>)}
          </div>

          {items.length > 0 ? (
          <div className="cartInfo">
            <ul class="cartTotalBlock">
              <li>
                <span>Итого:</span>
              <div></div>
              <b>29 498 руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1474 руб.</b>
                </li>
            </ul>
            
            <button className="greenButton">
              <div>Оформить заказ</div>
              <img src="/img/arrowRight.svg" alt=""></img>
            </button>
          </div>)
            : <button onClick={cartClose}  className="greenButton buttonTop">
                <div>Вернуться назад</div>
                <img className="arrowRight" src="/img/arrowLeft.svg" alt=""></img>
              </button>}
        </div>
    </div>
    )
};

export default Drawer;