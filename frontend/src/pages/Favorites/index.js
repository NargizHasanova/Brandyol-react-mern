import WaitingGif from '../../components/WaitingGif'
import { useNavigate } from 'react-router';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe, likeProduct } from '../../redux/userSlice';

export default function Favorites() {
    const dispatch = useDispatch()
    const { pending } = useSelector(state => state.clothes)
    const users = useSelector((state) => state.users)
    const navigate = useNavigate();
    const hasLiked = (item) => users.favoriteBox?.some(({ _id }) => _id === item._id)

    function itemInfo(item) {
        navigate(`/product_item/${item._id}`)
    }

    async function removeFromFavorites(product, userId) { 
        if(!userId) {
            navigate("/login")
            return
        }
        await dispatch(likeProduct({ product, userId })) // await coxda geseng isleyir!
        dispatch(fetchMe())
    }

    return (
        <section className="clothes-home clothes-home-favorites">
            {pending && <WaitingGif />}
            {users?.favoriteBox.length > 0 ?
                <div className="container">
                    <h1 className="title">Favorites List</h1>
                    <div className="clothes clothes-favorite">

                        {users?.favoriteBox?.map(item => {
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
                                                    <i
                                                        onClick={() => removeFromFavorites(item, users?.user?._id, hasLiked(item))} className="filled-heart">
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
