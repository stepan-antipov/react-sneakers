import React from 'react';
import styles from './Card.module.css'

function Card({id, title, imageUrl, price, onPlus, onRemove, onFavorite}) {
 
  const [isAdded, setIsAdded] = React.useState(false); //Создаем хук, следящий за сосотянием отмеченности товара
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => { //В пришедшую функцию onPlus помещаем данные об актуальном товаре, которые тоже пришли с пропсами и меняем состояние хука, если мы нажмем на кнопку
    setIsAdded(true)
    onPlus({title, imageUrl, price, isAdded})
  }

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite({title, imageUrl, price, isFavorite})
  }

  const onClickRemove = () => {
    setIsAdded(false)
    onRemove({id})
  }

  
    return (
      <div className={styles.card}> {/*подгружаем стили из папки, где хранится компонент */}
        <button onClick={onClickFavorite} className={styles.emptyHeart}>
          <img src={isFavorite ? "/img/redheart.svg" : "/img/emptyHeart.svg"} alt="избранное"></img>
        </button >
        <img src={imageUrl} alt=""></img>
        <p>
        {title}
        </p>
        <div className={styles.downRow}>
          <div>
            <span>ЦЕНА:</span>
            <br></br>
            <b>{price} руб.</b>
          </div>
          <button onClick={isAdded ? onClickRemove : onClickPlus} >
            <img src={isAdded ? "./img/greenButton.svg" : './img/plus.svg'} alt=""></img>
          </button>
        </div>
      </div>
    );
}

export default Card;