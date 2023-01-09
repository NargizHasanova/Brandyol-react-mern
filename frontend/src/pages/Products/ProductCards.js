import React from 'react'
import { useNavigate } from 'react-router';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import CardSkeleton from './ProductSkeleton';
import { fetchMe, likeProduct } from '../../redux/userSlice';

export default function ProductCards() {
    const dispatch = useDispatch()
    const { productsPageClothes, filterBarVisible } = useSelector(state => state.clothes)
    const users = useSelector((state) => state.users)
    const hasLiked = (item) => users?.favoriteBox?.some(({ _id }) => _id === item._id)
    const navigate = useNavigate();

    function itemInfo(item) {
        navigate(`/product_item/${item._id}`)
    }

    async function handleLike(product, userId) {
        if(!userId) {
            navigate("/login")
            return
        }
        await dispatch(likeProduct({ product, userId })) // await coxda geseng isleyir!
        dispatch(fetchMe()) // fetchMe yazmayanda userId ikinci handleLikeda niyese undefined qaytarir,cunki user._id [object object] olur
    }

    return (
        productsPageClothes.length === 0
            ?
            <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </>
            : (
                productsPageClothes?.map(item => {
                    const { _id, images, name, price, category, brand, desc, favorite } = item
                    return (
                        <div key={_id}
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
                                            {!hasLiked(item) &&
                                                <i onClick={() => handleLike(item, users?.user?._id)} className="fas fa-heart"></i>}
                                            {hasLiked(item) &&
                                                <i onClick={() => handleLike(item, users?.user?._id)} className="filled-heart"><FaHeart /></i>}
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
