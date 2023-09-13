import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../Utilities/localStorage";
import Cart from "../cart/cart";

const Bottles = () => {

        const [bottles, setBottles] = useState([]);
        const [cart, setCart] = useState([]);

        useEffect(() =>{
            fetch('bottle.json')
            .then(res => res.json())
            .then(data => setBottles(data))
        }, [])

        // load cart from local storage
        useEffect(() => {
            console.log("cALL EFFECT", bottles.length)
            if(bottles.length){
                const storedCart = getStoredCart();
                console.log(storedCart, bottles)

                const savedCart = [];
                for(const id of storedCart){
                    console.log(id);
                    const bottle = bottles.find(bottle => bottle.id === id);
                    if(bottle){
                        savedCart.push(bottle);
                    }
                }
                console.log('Saved Cart', savedCart);
                setCart(savedCart);
            }

        },[bottles])

        const handleAddCart = bottle =>{
            const newCart = [...cart, bottle];
            setCart(newCart);
            addToLS(bottle.id);
        }

        const handleRemoveFromCart = id => {
            // visual cart remove
            const remainingCart = cart.filter(bottle => bottle.id !== id);
            setCart(remainingCart);
            // remove from LS 
            removeFromLS(id);
        }
    

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottle =><Bottle
                key={bottle.id}
                handleAddCart={handleAddCart}

                bottle={bottle}
                ></Bottle>)
            }
            </div>
        </div>
    );
};
export default Bottles;