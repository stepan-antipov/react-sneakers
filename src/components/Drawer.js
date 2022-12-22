import React from "react"
import axios from "axios"
import {useCart} from "../hooks/useCart"

function Drawer({cartClose, onRemove, items = [], opened}) {

    const {cartItems, setCartItems, totalPrice} = useCart()
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)

    const onClickOrder = async () => {
      try {
        const {data} = await axios.post('https://638355396e6c83b7a990e6ac.mockapi.io/orders', {
           items: cartItems
      })
      setOrderId(data.id)
      setIsOrderComplete(true)
      setCartItems([])

      for(let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i]
        await axios.delete('https://638355396e6c83b7a990e6ac.mockapi.io/cart/' + item.id)
      }

      } catch(error) {
        console.log(error)
      }
    }

    return(
    <div className={opened ? 'overlay overlay--active' : 'overlay'}>
        <div className={opened ? 'drawer drawer--active' : 'drawer'}>
          <>
        <div  className="cart">
            <div className="cartTop">
              <h2>Корзина</h2>
              <button><img onClick={cartClose} className="closeButton" src="/img/close.svg" alt="close"></img></button>
          </div>
          
          
          { items.length > 0 ? (
            <div className="cartItems"> {/*Перебираем пришедший масив данных и помещаем эти данные в нашу верстку */}
            {items.map((obj) => ( 

          <div key={obj.id} className="cartItem">
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
            <img alt="статус заказа" src={isOrderComplete ? "./img/ready.jpg" : "./img/emptyBox.jpg"}></img>
            <h2>{isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"}</h2>
            <p>{isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : `Добавте хотя бы один товар, чтобы сделать заказ`}</p>
          </div>)}
          </div>
          

          {items.length > 0 ? (
            
          <div className="cartInfo">
            <ul className="cartTotalBlock">
              <li>
                <span>Итого:</span>
              <div></div>
              <b>{totalPrice} руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>{Math.floor(totalPrice * 0.05)} руб.</b>
                </li>
            </ul>
            
            <button onClick={onClickOrder} className="greenButton">
              <div> Оформить заказ</div>
              <img src="/img/arrowRight.svg" alt=""></img>
            </button>
          </div>)
            : <button onClick={cartClose}  className="greenButton buttonTop">
                <div>Вернуться назад</div>
                <img className="arrowRight" src="/img/arrowLeft.svg" alt=""></img>
              </button>}
              </>
        </div>
    </div>
    )
};

export default Drawer;