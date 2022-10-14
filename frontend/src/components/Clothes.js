import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import WaitingGif from './WaitingGif'
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteInFavBoxToTrue, changeIsFav, setCategoryName, addToFavBox, setProductItem, removeFromFavBox, showMoreClothesItems, showLessClothesItems } from "../redux/clothesSlice";

export default function Clothes() {
    const dispatch = useDispatch()
    const clothes = useSelector(state => state.clothes)
    const [homePageClothes, setHomePageClothes] = useState([])
    const navigate = useNavigate();
    //setHomePageClothes -a getdata birbasa dusmurdu deye useeffect yaratdim
    useEffect(() => {
        setHomePageClothes(clothes.data?.slice(0, clothes.numOfItem))
    }, [clothes.data, clothes.numOfItem]);

    function itemInfo(item) {
        // dispatch(setCategoryName(item.category))
        // dispatch(setProductItem(item))
        navigate(`product_item/${item._id}`)
    }
    function showMoreFoo() {
        dispatch(showMoreClothesItems())
    }

    function showLessFoo() {
        dispatch(showLessClothesItems())
    }

    function addToFavorites(id, singleItem) {
        dispatch(changeIsFav(id))
        dispatch(addToFavBox(singleItem))
        dispatch(setFavoriteInFavBoxToTrue())
    }

    function removeFromFavorites(id) {
        dispatch(changeIsFav(id))
        dispatch(removeFromFavBox(id))
    }

    return (
        <section className="clothes-home">
            <div className="container">
                <h1 className="title">Best choice clothes</h1>
                <div className="clothes">
                    {clothes.pending && <WaitingGif />}
                    {clothes.error === true && <h1>something went wrong</h1>}
                    {!clothes.pending && homePageClothes?.map(item => {
                        const { _id, images, name, price, category, brand, desc, favorite } = item
                        return (
                            <div key={_id} className="clothes__item">
                                <div className="clothes__img">
                                    <img src={images[0]} alt="product" />
                                    <div className="clothes__layer">
                                        <div className="layer__inner">
                                            <div className="layer-desc">
                                                <i className="fas fa-share-alt"></i>
                                                <i onClick={() => itemInfo(item)}
                                                    className="far fa-search">
                                                </i>
                                                {!favorite &&
                                                    <i onClick={() => addToFavorites(_id, item)}
                                                        className="fas fa-heart">
                                                    </i>}
                                                {favorite &&
                                                    <i onClick={() => removeFromFavorites(_id)}
                                                        className="filled-heart"><FaHeart />
                                                    </i>}
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
                    }
                </div>
            </div>
            {homePageClothes.length !== clothes.data.length &&
                <div className="show-more" onClick={showMoreFoo}>
                    Show More
                    <i className="fas fa-chevron-down"></i>
                </div>}
            {homePageClothes.length === clothes.data.length &&
                <div className="show-more" onClick={showLessFoo}>
                    Show Less
                    <i className="fas fa-chevron-up"></i>
                </div>}
        </section>
    )
}
