import React from 'react';
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
            <section className="card-section">
                {favorites.map((obj, index) => (
                    <Card key={index}
                    onPlus={(obj) => onAddToCart(obj)}
                    onFavorite={onAddFavorite}
                    favorited={true}
                    {...obj}
                    />
                ))} 
            </section>
        </main>
    </div>)}


export default Favorites;