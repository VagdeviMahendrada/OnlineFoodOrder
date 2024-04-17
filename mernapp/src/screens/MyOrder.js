import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/user/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log(response.orderData)
            setorderData(response.orderData)
        })



        // await res.map((data)=>{
        //    console.log(data)
        // })


    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                {<div className='row'>
                    {orderData !== {} && Array(orderData).map((data) => {
                        console.log(data)
                        return (
                            data.order_data ?
                                data.order_data.slice(0).reverse().map((item) => {
                                    console.log(item)
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div >
                                                    {arrayData.Order_data ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_data}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-9 col-md-6 col-lg-3 w-100' >
                                                            <div className="card mt-3" style={{ maxHeight: "360px" }}>
                                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    })}
                </div>}


            </div>

            <Footer />
        </div>
    )
}