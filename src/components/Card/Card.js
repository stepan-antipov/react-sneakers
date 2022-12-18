import React from 'react';
import styles from './Card.module.css'
import ContentLoader from "react-content-loader"

import { AppContext } from '../../App';

function Card({
  id, 
  title, 
  imageUrl, 
  price, 
  onPlus, 
  onFavorite, 
  favorited=false, 
  added=false, 
  loading=false
}) {

  const {isItemAdded} = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId: id, title, imageUrl, price}

  const onClickPlus = () => { //В пришедшую функцию onPlus помещаем данные об актуальном товаре, которые тоже пришли с пропсами и меняем состояние хука, если мы нажмем на кнопку
    onPlus(obj)
    
  }

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj)
  }

  
    return (
      <div className={styles.card}> 
        {
          loading ? <ContentLoader 
          speed={3}
          width={150}
          height={260}
          viewBox="0 0 150 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb" 
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
          <rect x="0" y="104" rx="5" ry="5" width="150" height="15" /> 
          <rect x="0" y="126" rx="5" ry="5" width="100" height="15" /> 
          <rect x="0" y="169" rx="5" ry="5" width="80" height="25" /> 
          <rect x="118" y="164" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> : 
        <>
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
        <button onClick={onClickPlus} >
          <img src={isItemAdded(id) ? "./img/greenButton.svg" : './img/plus.svg'} alt=""></img>
        </button>
      </div>
      </>
        }

      </div>
    );
}

export default Card;



