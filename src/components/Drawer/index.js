import React from 'react'
import axios from "axios"

import { useCart } from "../hooks/useCart"
import Info from "../Info"

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Drawer({ onClose, onRemove, items = [], opened}) {
  const [isOrderCompleted, setIsCompleted] = React.useState(false)
  const [orderId, setOrderId] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { cartItems, setCartItems , totalPrice} = useCart();

  const taxOnOrder = totalPrice / 100 * 5;


  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://645790fc0c15cb14820b9960.mockapi.io/orders',
       {items: cartItems,});
    setOrderId(data.id)
    setIsCompleted(true);
    setCartItems([]);

    for (let i = 0; i < cartItems.length; i++){
      const item = cartItems[i];
      await axios.delete(
        `https://644b652317e2663b9dee4ea4.mockapi.io/Cart/${item.id}`
      );
      await delay(1000);
    }

    } catch (error) {
      alert ('не удалось оформить заказ');
    }
    setIsLoading(false);
  };
  
    return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
        <div className={styles.drawer}>
          <h2 className="d-flex justify-between mb-30"> 
          Корзина
            <img className='removeBtn cu-p' src="/img/cancel.svg" alt='close' onClick={onClose} />
          </h2>
     
     {items.length > 0 ? 
      (
        <div className="d-flex flex-column flex">
      <div className="items flex">
      {items.map((obj) => (
      <div key={obj.id} className="cartItem d-flex align-center mb20">
        <div  
        style={{backgroundImage: `url(${obj.imageUrl})`}} 
        className="cartItemImg">
        </div>
      <div className="mr-20 flex">
        <p className="mb-5">{obj.title}</p>
        <b>{obj.price}</b>
      </div>
        <img onClick={()=> onRemove(obj.id)} className='removeBtn' src="/img/cancel.svg" alt='remove' />
        </div>
      ))}
      </div>

      <div className="cartTotalBlock">
        <ul>
          <li>
            <span>Итого:</span>
            <div></div>
            <b> {totalPrice} руб. </b>
          </li>
          <li>
          <span> Налог 5%:</span>
            <div></div>
            <b>{taxOnOrder} руб.</b>
          </li>
        </ul>
        <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src='/img/arrow.svg' alt='arrow'></img></button>
      </div>
      </div>
      )

      :

      (
       <Info title={isOrderCompleted ? `Заказ Номер ${orderId} Оформлен!` : 'Корзина Пустая'} description={isOrderCompleted ? 'Спасибо за покупки' : 'Добавьте что-нибудь в корзину'} image={isOrderCompleted? '/img/ordermade.png'  : '/img/emptyCart.svg'}/>
      )
     }


  </div>
  </div>
    )
}