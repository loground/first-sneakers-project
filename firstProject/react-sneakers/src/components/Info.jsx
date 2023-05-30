import React from 'react'
import AppContext from '../context';

const Info = ({image, title, description}) => {
    const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className='emptyCart d-flex align-center justify-center flex-column flex'>
      <img className='mb-20' width='120' src={image} alt='empty cart' ></img>
      <h2>{title}</h2>
      <p className='opacity-6'>{description}</p>
      <button onClick={ () => setCartOpened(false)} className='greenButton'> 
      <img  src='img/returnArrow.svg' alt='return'/>
      Вернуться назад
      </button>
      </div>
  )
};

export default Info;
