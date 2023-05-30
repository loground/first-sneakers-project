import Card from "../components/Card";
import React from "react";
import axios from "axios";

function Orders () {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
    const { data } = await axios.get('https://645790fc0c15cb14820b9960.mockapi.io/orders');
    setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
    setLoading(false)
      } catch (error) {
        alert ('У нас тут ошибка');
        console.error(error);
      }
  })();
  }, []);

  return (
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1> Мои заказы </h1>
        </div>
      
        <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card 
          key={index}
          loading={isLoading}
          {...item}
          />
          ))}
        </div>
      </div>
    );
}

export default Orders;