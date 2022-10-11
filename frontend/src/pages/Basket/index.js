import BasketItem from './BasketItem';
import { useSelector } from 'react-redux';
import EmptyBasket from './EmptyBasket';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function Basket() {
    const clothes = useSelector(state => state.clothes)
    const users = useSelector(state => state.users)
    const navigate = useNavigate()

    const totalCardPrice = clothes.basket.reduce((acc, item) => {
        return (item.count * item.price) + acc
    }, 0)

    function payOrder() {
        if(users.signedIn === false){
            navigate("/sign-in")
        }else{
            console.log("successfull payment");
        }
    }

    return (

        clothes.basket.length >= 1 ?
            <div className="basket container">
                <h1 className="title basket-title">My Basket({clothes.basket.length})</h1>
                <div className="basket-container">
                    <div className="basket-items" style={{ width: `${clothes.basket.length <= 0 ? "100%" : ""}` }}>
                        <BasketItem />
                    </div>
                    <div className="basket-paycard" style={{ display: `${clothes.basket.length > 0 ? "block" : "none"}` }}>
                        <h1 className="paycard-title">Order Summary</h1>
                        <div className="paycard-price">
                            <p>Subtotal</p>
                            <span>{totalCardPrice}$</span>
                        </div>
                        <div className="paycard-shipping-price">
                            <p>Estimated Shipping</p>
                            <span>6.90$</span>
                        </div>
                        <div className="paycard-shipping-discount">
                            <p>Shipping Discount</p>
                            <span>-6.90$</span>
                        </div>
                        <div className="paycard-price-total">
                            <p><b>Total</b></p>
                            <span><b>{totalCardPrice}$</b></span>
                        </div>
                        <div className='btn-paycard'>
                            <button onClick={payOrder}>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>
            : <EmptyBasket />
    )
}
