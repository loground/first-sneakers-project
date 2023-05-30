import axios from 'axios';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from "react";
import { Route, Routes } from 'react-router-dom';
import AppContext from './context'

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [likedItems, setItemLiked] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

React.useEffect(() => {
  async function fetchData() {
      try {
       const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all(
        [axios.get('https://644b652317e2663b9dee4ea4.mockapi.io/Cart'),
         axios.get('https://645790fc0c15cb14820b9960.mockapi.io/liked'), 
         axios.get('https://644b652317e2663b9dee4ea4.mockapi.io/Items')
        ]);

      setLoading(false);

      setCartItems(cartResponse.data);
      setItemLiked(favoritesResponse.data);
      setItems(itemsResponse.data);
    } catch (error) {
      alert('Ошибка получения данных')
    }
  }

    fetchData();
  }, []);

  const onLikeItem = async (object) => {
    try {
    if (likedItems.find(oneObj => oneObj.id === object.id)) {
      axios.delete(`https://645790fc0c15cb14820b9960.mockapi.io/liked/${object.id}`)
      setItemLiked((prev) => prev.filter((item) => Number(item.id) !== Number(object.id)));

    } else {
      const { data } = await axios.post('https://645790fc0c15cb14820b9960.mockapi.io/liked', object);
      setItemLiked( prev => [...prev, data]);
    }
   } catch (error) {
    alert('Не удалось добавить в favs')
    console.errror(error)
   }
  };

  const onAddtoCard = async (obj) => {
    const findItem = cartItems.find((cartObj) => Number(cartObj.parentId) === Number(obj.id));
    try {
      if (findItem) {
        setCartItems((prev) => prev.filter((cartObj) => Number(cartObj.parentId) !== Number(obj.id)));
        await axios.delete(`https://644b652317e2663b9dee4ea4.mockapi.io/Cart/${findItem.id}`);
      } else {
        const response = await axios.post('https://644b652317e2663b9dee4ea4.mockapi.io/Cart', obj);
        const { data } = response;
        setCartItems((prev) => [...prev, data]);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === obj.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert('Ошибка при добавлении');
      console.error(error);
    }
  };
  

  const onRemoveItemCart = async (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(id)));
      await axios.delete(`https://644b652317e2663b9dee4ea4.mockapi.io/Cart/${id}`);
    } catch (error) {
      alert('Ошибка при удалении предмета из корзины');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemInCart = (id) => {
   return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  
  return (
    <AppContext.Provider value={{items, cartItems, likedItems, isItemInCart, onLikeItem, setCartOpened, }} >
  <div className="wrapper clear">
    <div>
   <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItemCart} opened={cartOpened} />
   </div>
   <Header onClickCart={() => setCartOpened(true)} />

  <Routes>
    <Route path='/' exact element={<Home 
      items={items}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      onChangeSearchInput={onChangeSearchInput}
      onLikeItem={onLikeItem}
      onAddtoCard={onAddtoCard}
      cartItems={cartItems}
      isLoading={isLoading}
    />} />
  </Routes>

  <Routes>
    <Route path='/favorites' exact element={<Favorites 
    items={likedItems}
    onLikeItem={onLikeItem}
    />} />
  </Routes>

  <Routes>
    <Route path='/orders' exact element={<Orders 
    />} />
  </Routes>

  </div>
  </AppContext.Provider>

  
  );
}

export default App;
