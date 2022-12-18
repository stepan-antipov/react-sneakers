import React from 'react';
import Card from'../components/Card/Card';
import { AppContext } from '../App';

 function Favorites() {
    const {favorites, onAddFavorite} = React.useContext(AppContext)

    
     return (
     <div>
        <main className="content">
            <div className="top">
                 <h1>Мои закладки</h1>
                {/* <div className="searchBlock">
                    <button>
                    <img src="/img/search.svg" alt="search"></img>
                    </button>
                    <input onChange={props.onChangeSearchInput} value={props.searchValue} type="search" placeholder="Поиск..."></input>
                </div> */}
            </div>
            <section className="card-section">
                {favorites.map((obj, index) => (
                    <Card key={index}
                    // id={obj.id}
                    // title={obj.title}
                    // price={obj.price}
                    // imageUrl={obj.imageUrl}
                    // onPlus={(obj) => props.onAddToCart(obj)} //Передаем в функцию onAddToCart массив и используем его при составлении элементов в корзне
                    // onRemove={(obj) => props.onRemoveItem(obj)}
                    onFavorite={onAddFavorite}
                    favorited={true}
                    {...obj}
                    />
                ))} 
            </section>
        </main>
    </div>)}


export default Favorites;