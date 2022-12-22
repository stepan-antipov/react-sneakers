import React from 'react';
import Card from'../components/Card/Card';
import axios from 'axios';

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
            <section className="card-section">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card key={index}
                    loading={isLoading}
                    {...item}
                    />
                ))} 
            </section>
        </main>
    </div>)}


export default Orders;