import WaitingGif from '../../components/WaitingGif'
import { useNavigate } from 'react-router';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Axios } from '../../servicesAPI';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Favorites() {
    const dispatch = useDispatch()
    const { pending } = useSelector(state => state.clothes)
    const [favorites, setFavorites] = useState([])
    const [refetch, setRefetch] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const { data } = await Axios.get("/products")
            setFavorites(data.filter(item => item.favorite === true))
        })()
    }, [refetch]);

    function itemInfo(item) {
        navigate(`/product_item/${item._id}`)
    }

    async function removeFromFavorites(singleItem) {

        await Axios.put(`/editProduct/${singleItem._id}`, {
            category: singleItem.category,
            brand: singleItem.brand,
            gender: singleItem.gender,
            name: singleItem.name,
            desc: singleItem.desc,
            price: singleItem.price,
            selected: singleItem.selected,
            images: singleItem.images,
            size: singleItem.size,
            color: singleItem.color,
            count: singleItem.count,
            favorite: !singleItem.favorite
        })
        setRefetch(prev => !prev)
    }

    return (
        <section className="clothes-home clothes-home-favorites">
            {pending && <WaitingGif />}
            {!pending && favorites.length > 0 ?
                <div className="container">
                    <h1 className="title">Favorites List</h1>
                    <div className="clothes clothes-favorite">

                        {favorites?.map(item => {
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
                                                    <i
                                                        onClick={() => removeFromFavorites(item)} className="filled-heart">
                                                        <FaHeart />
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
                        })}

                    </div>
                </div>
                : <h1 className='title' style={{ textAlign: 'center' }}>empty list</h1>}
        </section>
    )
}
