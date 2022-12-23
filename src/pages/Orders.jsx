import React from 'react';
import Card from'../components/Card/Card';
import axios from 'axios';
import {Link} from 'react-router-dom'

 function Orders() {
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function showOrders() {
            try{
                const {data} = await axios.get('https://638355396e6c83b7a990e6ac.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                console.log(orders)
                setIsLoading(false)
            } catch(error) {
                console.log(error)    
            }
        }

        showOrders()
    }, [])


     return (
     <div>
        <main className="content">
            <div className="top">
                 <h1>Мои заказы</h1>
            </div>
            {orders.length > 0 ? (
            <section className="card-section">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card key={index}
                    loading={isLoading}
                    {...item}
                    />
                ))} 
            </section>)
            : (<section className='emptyOrders'> 
            <div className='orders-info'>
                <div className='favorites-smile'><img src="/img/sadSmile2.jpg"></img></div>
                <h2>У вас нет заказов</h2>
                <p>Вы не оформили ни одного заказа</p>
                <Link to="/">
                    <button className='greenButton buttonMargin'><img src="/img/arrowLeft.svg"></img>Вернуться назад</button>
                </Link>
            </div>
        </section>)}

        </main>
    </div>)}


export default Orders;