import WaitingGif from '../../components/WaitingGif'
import { useNavigate } from 'react-router';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { changeIsFav, removeFromFavBox, setCategoryName, setProductItem } from '../../redux/clothesSlice';

export default function Favorites() {
    const dispatch = useDispatch()
    const { pending, favoriteBox } = useSelector(state => state.clothes)
    const navigate = useNavigate();
    console.log(favoriteBox);

    function itemInfo(item) {
        console.log(item);
        dispatch(setCategoryName(item.category))
        dispatch(setProductItem(item))
        navigate(`/product_item/${item.id}`)
    }

    function removeFromFavorites(id) {
        dispatch(changeIsFav(id))
        dispatch(removeFromFavBox(id))
    }

    return (
        favoriteBox.length > 0 ?
            <section className="clothes-home clothes-home-favorites">
                <div className="container">
                    <h1 className="title">Favorites List</h1>
                    <div className="clothes clothes-favorite">
                        {pending ? <WaitingGif /> : (
                            favoriteBox?.map(item => {
                                const { id, images, name, price, category, brand, desc, favorite } = item
                                return (
                                    <div key={id} className="clothes__item">
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
                                                            onClick={() => removeFromFavorites(id)} className="filled-heart">
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
                            })
                        )}
                    </div>
                </div>
            </section> :
            <h1 className='title' style={{ textAlign: 'center' }}>empty list</h1>
    )
}
