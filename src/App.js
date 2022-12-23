import React from 'react';
import { Route, Routes }  from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({})

function App() {

  const [items, setItems] = React.useState([]) // Хук для рендера информации на странице. 
  const [cartOpened, setCartOpened] = React.useState(false) // Хук следящий за состоянием корзины.
  const [cartItems, setCartItems] = React.useState([]) // Хук для отображения информации о товарах в корзине. Изначально не имеет в себе элементов
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('') // Хук для отслеживания значения в поисковой строке
  const [isLoading, setIsLoading] = React.useState(true)
  const [isEmptyFavorited, setisEmptyFavorited] = React.useState()
 

  React.useEffect(()=> {
    async function fetchData() {
    try {
      const itemsResponse = await axios.get('https://638355396e6c83b7a990e6ac.mockapi.io/items')
      const cartResponse = await axios.get('https://638355396e6c83b7a990e6ac.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://638355396e6c83b7a990e6ac.mockapi.io/favorites')
      
      setIsLoading(false)
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.log(error)
    }
    }
    fetchData()
  }, []) // Запрашиваем информацию с сервера, переводим ответ в json формат, говорим реакту отслеживать json и передавать его в items. Запрос делаем только один раз.

  

  const onAddToCart = async (obj) => {
    try {const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
    if (findItem) {
      setCartItems(prev =>  prev.filter(item => Number(item.parentId) !== Number(obj.id))) //сохрани только те айтемы, которые не рнавны новым пришедшим
      await axios.delete(`https://638355396e6c83b7a990e6ac.mockapi.io/cart/${findItem.id}`)
    } else {
      setCartItems(prev => [...prev, obj]) 
      const {data} =
      await axios.post('https://638355396e6c83b7a990e6ac.mockapi.io/cart', obj)
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        })
      )
    }
  } catch (error) {
    alert('Ошибка при добавлении в корзину')
    console.log(error)
  }
}


  
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://638355396e6c83b7a990e6ac.mockapi.io/cart/${id}`)
      setCartItems(prev =>  prev.filter(item => Number(item.id) !== Number(id))) 
    } catch (error) {
      alert('Ошибка при удалении из корзины')
      console.log(error)
    }
  }

  const onAddFavorite = async (obj) => { //отслеживаем состояние корзины, добавлем к новому массиву старые значения и актуальную информацию (товары, которые были добавлены)
    
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://638355396e6c83b7a990e6ac.mockapi.io/favorites/${obj.id}`)
        setFavorites((prev =>  prev.filter(item => Number(item.id) !== Number(obj.id))) )
       
      } else {
        const {data} = await axios.post('https://638355396e6c83b7a990e6ac.mockapi.io/favorites', obj)
        setFavorites(prev =>  [...prev, data]) 
       
    }
    } catch (error) {
      alert('Не удалось добавить в фавориты')
      console.log(error)
    }
    }
    
    


  const onChangeSearchInput = (event) => { //отслеживаем состояние строки
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }


  return (
    <AppContext.Provider 
    value={{
      items, 
      cartItems, 
      favorites, 
      onAddFavorite,
      onAddToCart,
      isItemAdded,
      setCartItems
      }}>
      <div className="wrapper"> 
      <div>

      <Drawer 
        items={cartItems} 
        onRemove={onRemoveItem} 
        cartClose={() => setCartOpened(false)}
        opened={cartOpened}
      /> 
      </div>
      <div className="container"> 
        <div className="content">
          <Header 
            onClickCart={() => setCartOpened(true)}/>

           <Routes>
            <Route path="/" exact element={
            <Home
              items={items} 
              isItemAdded={isItemAdded}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddFavorite={onAddFavorite}
              onAddToCart={onAddToCart} 
              onRemove={onRemoveItem}
              isLoading={isLoading}/>}
            />
            <Route path="/favorites" exact element={
              <Favorites
              onAddFavorite={onAddFavorite}
              // isEmptyFavorited={isEmptyFavorited}
              // setisEmptyFavorited={setisEmptyFavorited}
              />
            }/>
            <Route path="/orders" exact element={
              <Orders
              />
            }/>
            </Routes> 
        </div>
      </div>
    </div>
    </AppContext.Provider>
  )
}

export default App;
