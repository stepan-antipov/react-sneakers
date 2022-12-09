import React from 'react';
import { Route, Routes }  from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Drawer from './components/Drawer';



// const cardInfo = [
//   {title: 'Мужские Кроссовки Jordan Air Jordan 11', price: 10799, imageUrl:'/img/6.jpg'},
//   {title: 'Мужские Кроссовки Nike LeBron XVIII', price: 16499, imageUrl:"/img/7.jpg"},
//   {title: 'Мужские Кроссовки Nike Blazer Mid Suede',price: 8499, imageUrl:"/img/2.jpg"},
//   {title: 'Мужские Кроссовки Nike Air Max 270',price: 12999, imageUrl:"/img/1.jpg"},
//   {title: 'Кроссовки Puma X Aka Boku Future Rider',price: 8999, imageUrl:"/img/3.jpg"},
//   {title: 'Мужские Кроссовки Under Armour Curry 8',price: 15199, imageUrl:"/img/4.jpg"},
//   {title: 'Мужские Кроссовки Nike Kyrie 7',price: 11299, imageUrl:"/img/5.jpg"},
//   {title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',price: 11299, imageUrl:"/img/11.jpg"},
//   {title: 'Мужские Кроссовки Nike LeBron XVIII',price: 16499, imageUrl:"/img/7.jpg"},
//   {title: 'Мужские Кроссовки Nike LeBron XVIII Low',price: 13999, imageUrl:"/img/8.jpg"},
//   {title: 'Мужские Кроссовки Nike Blazer Mid Suede',price: 8499, imageUrl:"/img/9.jpg"},
//   {title: 'Кроссовки Puma X Aka Boku Future Rider',price: 8999, imageUrl:"/img/10.jpg"}
// ]



function App() {

  const[items, setItems] = React.useState([]) // Хук для рендера информации на странице. 
  const [cartOpened, setCartOpened] = React.useState(false) // Хук следящий за состоянием корзины.
  const [cartItems, setCartItems] = React.useState([]) // Хук для отображения информации о товарах в корзине. Изначально не имеет в себе элементов
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('') // Хук для отслеживания значения в поисковой строке


  React.useEffect(()=> {
  //   fetch('https://638355396e6c83b7a990e6ac.mockapi.io/items').then(response => {
  //   return response.json()
  // }).then(json => {
  //   (json)
  // })
  axios.get('https://638355396e6c83b7a990e6ac.mockapi.io/items').then(res => {
    setItems(res.data);
  })
  axios.get('https://638355396e6c83b7a990e6ac.mockapi.io/cart').then(res => {
    setCartItems(res.data);
  })
  axios.get('https://638355396e6c83b7a990e6ac.mockapi.io/favorites').then(res => {
    setFavorites(res.data);
  })
  }, []) // Запрашиваем информацию с сервера, переводим ответ в json формат, говорим реакту отслеживать json и передавать его в items. Запрос делаем только один раз.


  const onAddToCart = (obj) => { //отслеживаем состояние корзины, добавлем к новому массиву старые значения и актуальную информацию (товары, которые были добавлены)
    axios.post('https://638355396e6c83b7a990e6ac.mockapi.io/cart', obj)
    setCartItems(prev =>  [...prev, obj]) 
    console.log(obj)
  }

  const onAddFavorite = (obj) => { //отслеживаем состояние корзины, добавлем к новому массиву старые значения и актуальную информацию (товары, которые были добавлены)

    axios.post('https://638355396e6c83b7a990e6ac.mockapi.io/favorites', obj)
    setFavorites(prev =>  [...prev, obj]) 
    console.log(obj)
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://638355396e6c83b7a990e6ac.mockapi.io/cart/${id}`)
    setCartItems(prev =>  prev.filter(item => item.id !== id)) 
  }

  const onChangeSearchInput = (event) => { //отслеживаем состояние строки
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper"> 

      {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} cartClose={() => setCartOpened(false)}/>} {/* Передаем в ящик функцию, закрывающая корзину при клике на кнопку и информацию о выбранных товарах */}
      <div className="container"> 
        <div className="content">
          <Header onClickCart={() => setCartOpened(true)}/>


           <Routes>
            <Route path="/" exact element={
            <Home
              items={items} 
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddFavorite={onAddFavorite}
              onAddToCart={onAddToCart} />}
            />
            <Route path="/favorites" exact element={
              <Favorites
              items={favorites}

              />
            }/>
            </Routes> 
            

        </div>
      </div>
    </div>
  )
}

export default App;
