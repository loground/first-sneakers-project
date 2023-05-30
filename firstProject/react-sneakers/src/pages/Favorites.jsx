import Card from "../components/Card";
import React from "react";
import AppContext from '../context'

function Favorites () {
  const {likedItems, onLikeItem} = React.useContext(AppContext);
    return (
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1> Мне понравились: </h1>
        </div>
      
        <div className="d-flex flex-wrap">
        {likedItems.map((item, index) => (
          <Card 
          key={index}
          {...item}
          selectedFavorite={true} 
          onFavorite={onLikeItem}
          />
          ))}
        </div>
      </div>
    );
}

export default Favorites;