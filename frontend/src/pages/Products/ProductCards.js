import React from 'react'
import { useNavigate } from 'react-router';
import WaitingGif from '../../components/WaitingGif'
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsFav, removeFromFavBox, addToFavBox, setProductItem } from '../../redux/clothesSlice'

export default function ProductCards() {
    const dispatch = useDispatch()
    const { productsPageClothes, pending, filterBarVisible } = useSelector(state => state.clothes)

    const navigate = useNavigate();

    function itemInfo(item) {
        // dispatch(setProductItem(item))
        navigate(`/product_item/${item.id}`)
    }

    function addToFavorites(id, singleItem) {
        dispatch(changeIsFav(id))
        dispatch(addToFavBox(singleItem))
    }

    function removeFromFavorites(id) {
        dispatch(changeIsFav(id))
        dispatch(removeFromFavBox(id))
    }

    return (
        pending ? <WaitingGif /> : (
            productsPageClothes?.map(item => {
                const { id, images, name, price, category, brand, desc, favorite } = item
                return (
                    <div key={id}
                        className="clothes__item"
                        style={{ width: `${filterBarVisible ? "30%" : ""}` }}>
                        <div className="clothes__img">
                            <img src={images[0]} alt="product" />
                            <div className="clothes__layer">
                                <div className="layer__inner">
                                    <div className="layer-desc">

                                        {/* === share ===*/}
                                        <i className="fas fa-share-alt"></i>

                                        {/* === search === */}
                                        <i onClick={() => itemInfo(item)} className="far fa-search"></i>

                                        {/* === like === */}
                                        {!favorite &&
                                            <i onClick={() => addToFavorites(id, item)} className="fas fa-heart"></i>}
                                        {favorite &&
                                            <i onClick={() => removeFromFavorites(id)} className="filled-heart"><FaHeart /></i>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clothes__desc">
                            <p>{brand}<span> {category + " "} {desc}</span></p>
                            <div className="stars">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <i className="far fa-star"></i>
                            </div>
                            <div className="clothes-price">${price}</div>
                        </div>
                    </div>
                )
            })
        )
    )
}
