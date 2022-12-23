import React from 'react';
import { Link } from 'react-router-dom';
import Card from'../components/Card/Card';
import { AppContext } from '../App';

 function Favorites() {
    const {favorites, onAddFavorite, onAddToCart} = React.useContext(AppContext)

    
     return (
     <div>
        <main className="content">
            <div className="top">
                 <h1>Мои закладки</h1>
            </div>
            {favorites.length > 0 ? 
            (<section className="card-section">
                {favorites.map((obj, index) => (
                    <Card key={index}
                    onPlus={(obj) => onAddToCart(obj)}
                    onFavorite={onAddFavorite}
                    favorited={true}
                    {...obj}
                    />
                ))} 
            </section>)
             : (<section className='emptyFavorites'> 
            <div className='favorites-info'>
                <div className='favorites-smile'><img src="/img/sadSmile.svg"></img></div>
                <h2>Закладок нет :( </h2>
                <p>Вы ничего не добавили в закладки</p>
                <Link to="/">
                    <button className='greenButton buttonMargin'><img src="/img/arrowLeft.svg"></img>Вернуться назад</button>
                </Link>
            </div>
        </section>)
 }



            
        </main>
    </div>)}


export default Favorites;



<section className='emptyFavorites'> 
            <div className='favorites-info'>
                <div className='favorites-smile'><img src="/img/sadSmile.svg"></img></div>
                <h2>Закладок нет :( </h2>
                <p>Вы ничего не добавили в закладки</p>
                <button className='greenButton buttonMargin'><img src="/img/arrowLeft.svg"></img>Вернуться назад</button>
            </div>
        </section>