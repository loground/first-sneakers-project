import CardStyle from './Card.module.scss';
import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';


function Card({
  title, 
  imageUrl, 
  price, 
  onPlus, 
  onFavorite, 
  selectedFavorite = false, 
  id, 
  loading = false,
}) 
  
  {
const { isItemInCart } = React.useContext(AppContext);
const [isFavorite, setIsFavorite] = React.useState(selectedFavorite);
const itemObj = {title, imageUrl, price, id, parentId: id}

const onClickPlus = () => {
  onPlus(itemObj);
}

const onLike = () => {
  onFavorite(itemObj);
  setIsFavorite(!isFavorite);
}

  return (
    <div className={CardStyle.card}>
      {
        loading ? 
        ( <ContentLoader 
    speed={2}
    width={165}
    height={250}
    viewBox="0 0 150 265"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="150" height="135" /> 
    <rect x="0" y="160" rx="5" ry="5" width="150" height="15" /> 
    <rect x="0" y="185" rx="5" ry="5" width="100" height="15" /> 
    <rect x="0" y="235" rx="5" ry="5" width="80" height="24" /> 
    <rect x="115" y="230" rx="5" ry="5" width="32" height="32" />

  </ContentLoader> ) : (<> 
  { onFavorite && (
  <div className={CardStyle.favourite}>
        <img 
        src={isFavorite ? '/img/heartliked.svg' : '/img/heartunliked.svg'}
        alt='unliked'
        onClick={onLike}/>
      </div>
  )}
    <img width='100%' height={135} src={imageUrl} alt='sneaker'/>
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
      <div className="d-flex flex-column">
        <span>Цена:</span>
        <b>{price}</b>
      </div>
      { onPlus && 
          <img className={CardStyle.plus}
           onClick={onClickPlus}
           src={isItemInCart(id)
           ? "/img/btn-checked.svg" : "/img/btn-plus.svg" }
           alt='plus' 
           />}
      </div>
      </>
      )}
    </div>
);
}

export default Card;