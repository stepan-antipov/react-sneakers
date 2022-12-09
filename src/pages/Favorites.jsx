import Card from'../components/Card/Card';


 function Favorites(props) {
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
                {props.items.map((obj) => (
                    <Card key={obj.imageUrl}
                    id={obj.id}
                    title={obj.title}
                    price={obj.price}
                    imageUrl={obj.imageUrl}
                    onPlus={(obj) => props.onAddToCart(obj)} //Передаем в функцию onAddToCart массив и используем его при составлении элементов в корзне
                    onRemove={(obj) => props.onRemoveItem(obj)}
                    onFavorite={obj => props.onAddFavorite(obj)}
                    />
                ))} 
            </section>
        </main>
    </div>)}

export default Favorites;