import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import WaitingGif from './WaitingGif'
import { useDispatch, useSelector } from "react-redux";
import { changeIsFav, showMoreClothesItems, showLessClothesItems, likeProduct } from "../redux/clothesSlice";
import { Axios } from "../servicesAPI";
import Favorites from './../pages/Favorites/index';
import { fetchMe } from "../redux/userSlice";

export default function Clothes() {
    const dispatch = useDispatch()
    const clothes = useSelector(state => state.clothes)
    const { user } = useSelector((state) => state.users)
    const [homePageClothes, setHomePageClothes] = useState([])
    const [favs, setFavs] = useState(user?.favorites) //bunu isle
    const navigate = useNavigate();
    console.log(user?.favorites); // like edende bu deyismir
    console.log(clothes?.favoriteBox); // like edende bu deyisir
    // console.log(clothes.favoriteBox); yenilenmis favoriteBox burdadi
    const hasLiked = (item) => user?.favorites.some(({ _id }) => _id === item._id)

    // setHomePageClothes -a getdata birbasa dusmurdu deye useeffect yaratdim
    useEffect(() => {
        setHomePageClothes(clothes.data?.slice(0, clothes.numOfItem))
    }, [clothes.data, clothes.numOfItem]);

    // useEffect(() => {
    //     if (user) {
    //         console.log(user);
    //         setFavs(user.favorites)
    //     }
    // }, [user]);

    function itemInfo(item) {
        navigate(`/product_item/${item._id}`)
    }
    function showMoreFoo() {
        dispatch(showMoreClothesItems())
    }

    function showLessFoo() {
        dispatch(showLessClothesItems())
    }
    // useEffect(() => {
    //     dispatch(fetchMe())
    // }, [clothes.favoriteBox])


    async function handleLike(product, userId) {
       await dispatch(likeProduct({ product, userId }))
        dispatch(fetchMe())
    }

    return (
        <section className="clothes-home">
            <div className="container">
                <h1 className="title">Best choice clothes</h1>
                <div className="clothes">
                    {clothes.pending && <WaitingGif />}
                    {clothes.error === true && <h1>something went wrong</h1>}
                    {!clothes.pending && homePageClothes?.map(item => {
                        const { _id, images, name, price, category, brand, desc } = item
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

                                                <i onClick={() => handleLike(item, user._id)}
                                                    className={hasLiked(item)
                                                        ? "filled-heart"
                                                        : "fas fa-heart"}>
                                                    {hasLiked(item) ? <FaHeart /> : ""}
                                                </i>
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
