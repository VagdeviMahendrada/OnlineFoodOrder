import React, { useEffect, useState, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
    let dispatch = useDispatchCart()
    let data = useCart()
    const priceRef = useRef() 
    let options = props.options
    let priceOptions = Object.keys(options)
    let foodItem=props.foodItem

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {
        let food=[]
        for (const item of data){
            if(item.id===foodItem._id){
                food.push(item);
                break;
            }
        }
        // console.log(food.map((item)=>console.log(item.size)))
        if (food.length>0){
            let item;
            food.map((data)=>{
                item = data.size
            })
            if(item===size){
                await dispatch({type:"UPDATE",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty})
                return
            }
            else if(item!==size){
                await dispatch({ type: "ADD", id:props.foodItem._id, name:props.foodItem.name, price: finalPrice, qty:qty, size: size })
                return
                // await console.log(data)
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty:qty, size: size })
    }
    let finalPrice = qty * parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div>
                <div className="card mt-3 mx-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className='container w-100'></div>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5 '>
                            {finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
