import React from 'react';
import Card from'../components/Card/Card';

function Home({
    items, 
    cartItems, 
    searchValue, 
    setSearchValue, 
    onChangeSearchInput, 
    onAddFavorite,
    onAddToCart,
    isLoading
}) {


    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
                <Card 
                key={index}
                onPlus={(obj) => onAddToCart(obj)} //Передаем в функцию onAddToCart массив и используем его при составлении элементов в корзне
                onFavorite={obj => onAddFavorite(obj)}
                loading={isLoading}
                {...item}
                /> 
            ))
    }

     return (  
     <div>
        <main className="content">
            <div className="top">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="searchBlock">
                    <button>
                    <img src="/img/search.svg" alt="search"></img>
                    </button>
                    <input onChange={onChangeSearchInput} value={searchValue} type="search" placeholder="Поиск..."></input>
                </div>
            </div>
            <section className="card-section"> 
               { renderItems() }
            </section>
        </main>
    </div>)}

export default Home; 