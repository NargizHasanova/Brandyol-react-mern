import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import AddToBasketButton from './AddToBasketButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button } from 'antd';
import 'antd/dist/antd.css';
import sizeChart from '../../assets/images/size-chart.jpg'
import { useMediaQuery } from 'react-responsive'
import { useSelector, useDispatch } from 'react-redux';
import { increaseProductItemCount, decreaseProductItemCount, setSingleProduct, setProductColor, setProductSize, changeIsFav, removeFromFavBox, addToFavBox, fetchFilteredProducts, resetFilters, fetchClothesData, changeSingleProductFav, likeProduct } from '../../redux/clothesSlice';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import Swiper core and required modules
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';
import { Axios } from '../../servicesAPI';

// install Swiper modules
SwiperCore.use([FreeMode, Navigation, Thumbs]);

const content = (
    <div className='size-table'>
        <img src={sizeChart} alt={sizeChart} />
    </div>
);


export default function ProductItem({
    src,
    width,
    height,
    magnifierHeight = 180,
    magnifieWidth = 300,
    zoomLevel = 1.7
}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { singleProduct, favoriteBox } = useSelector(state => state.clothes)
    const { user } = useSelector((state) => state.users)
    const { id: productId } = useParams()
    const liked = favoriteBox?.some(({ _id }) => _id === productId)

    const [hasLiked, setHasLiked] = useState(liked)




    useEffect(() => {
        if (productId) {
            Axios.get(`/products/${productId}`)
                .then(({ data }) => dispatch(setSingleProduct(data)))
                .catch(err => console.log(err))
        }
    }, []);
    // useEffect(() => {
    //     if (user) {
    //         console.log(user);
    //         setFavs(user.favorites)
    //     }
    // }, [user]);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    //zoom image on hover
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    //responsive
    const mediaMax1024 = useMediaQuery({ query: '(max-width: 1024px)' })

    function plusItemCount() {
        dispatch(increaseProductItemCount())
    }
    function minusItemCount() {
        dispatch(decreaseProductItemCount())
    }
    function selectColor(color) {
        dispatch(setProductColor(color))
    }

    function selectSize(size) {
        dispatch(setProductSize(size))
    }


    async function changeFavorites(singleProduct, userId) {
        console.log(singleProduct,userId);
        dispatch(likeProduct({ singleProduct, userId }))
        setHasLiked(!hasLiked)
    }

    function selectCategory(category) {
        dispatch(fetchFilteredProducts({ category: category }))
        dispatch(resetFilters())
        navigate(`/search/?cat=${category}`)
    }

    return (
        singleProduct && <>
            <div className="path container">
                <Link to="/" className="path-home" href="index.html">Home</Link>
                <i className="fas fa-angle-double-right"></i>
                <span onClick={() => selectCategory(singleProduct.category)} className="path-home" href="index.html">{singleProduct.category}</span>
                <i className="fas fa-angle-double-right"></i>
                <span className="path-productItem" href="products.html">Product</span>
            </div>

            <section className="productItem container">
                <div className="productItem__left">
                    <Swiper
                        style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="mySwiper2">
                        <SwiperSlide>
                            {mediaMax1024 ? <img src={singleProduct.images[0]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={singleProduct.images[0]}
                                        onMouseEnter={(e) => {
                                            // update image size and turn-on magnifier
                                            const elem = e.currentTarget;
                                            const { width, height } = elem.getBoundingClientRect();
                                            setSize([width, height]);
                                            setShowMagnifier(true);
                                        }}
                                        onMouseMove={(e) => {
                                            // update cursor position
                                            const elem = e.currentTarget;
                                            const { top, left } = elem.getBoundingClientRect();

                                            // calculate cursor position on the image
                                            const x = e.pageX - left - window.pageXOffset;
                                            const y = e.pageY - top - window.pageYOffset;
                                            setXY([x, y]);
                                        }}
                                        onMouseLeave={() => {
                                            // close magnifier
                                            setShowMagnifier(false);
                                        }}
                                        alt={"img"}
                                    />
                                    <div
                                        style={{
                                            display: showMagnifier ? "" : "none",
                                            position: "absolute",
                                            // prevent magnifier blocks the mousemove event of img
                                            pointerEvents: "none",
                                            // set size of magnifier
                                            height: `${magnifierHeight}px`,
                                            width: `${magnifieWidth}px`,
                                            // move element center to cursor pos
                                            top: `${y - magnifierHeight / 2}px`,
                                            left: `${x - magnifieWidth / 2}px`,
                                            opacity: "1", // reduce opacity so you can verify position
                                            border: "1px solid lightgray",
                                            backgroundColor: "white",
                                            backgroundImage: `url(${singleProduct.images[0]})`,
                                            backgroundRepeat: "no-repeat",

                                            //calculate zoomed image size
                                            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                                                }px`,

                                            //calculate position of zoomed image.
                                            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                                            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                                        }}
                                    ></div>
                                </div>
                            }
                        </SwiperSlide>
                        <SwiperSlide>
                            {mediaMax1024 ? <img src={singleProduct.images[1]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={singleProduct.images[1]}
                                        onMouseEnter={(e) => {
                                            // update image size and turn-on magnifier
                                            const elem = e.currentTarget;
                                            const { width, height } = elem.getBoundingClientRect();
                                            setSize([width, height]);
                                            setShowMagnifier(true);
                                        }}
                                        onMouseMove={(e) => {
                                            // update cursor position
                                            const elem = e.currentTarget;
                                            const { top, left } = elem.getBoundingClientRect();

                                            // calculate cursor position on the image
                                            const x = e.pageX - left - window.pageXOffset;
                                            const y = e.pageY - top - window.pageYOffset;
                                            setXY([x, y]);
                                        }}
                                        onMouseLeave={() => {
                                            // close magnifier
                                            setShowMagnifier(false);
                                        }}
                                        alt={"img"}
                                    />
                                    <div
                                        style={{
                                            display: showMagnifier ? "" : "none",
                                            position: "absolute",
                                            // prevent magnifier blocks the mousemove event of img
                                            pointerEvents: "none",
                                            // set size of magnifier
                                            height: `${magnifierHeight}px`,
                                            width: `${magnifieWidth}px`,
                                            // move element center to cursor pos
                                            top: `${y - magnifierHeight / 2}px`,
                                            left: `${x - magnifieWidth / 2}px`,
                                            opacity: "1", // reduce opacity so you can verify position
                                            border: "1px solid lightgray",
                                            backgroundColor: "white",
                                            backgroundImage: `url(${singleProduct.images[1]})`,
                                            backgroundRepeat: "no-repeat",

                                            //calculate zoomed image size
                                            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                                                }px`,

                                            //calculate position of zoomed image.
                                            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                                            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                                        }}
                                    ></div>
                                </div>
                            }
                        </SwiperSlide>
                        <SwiperSlide>
                            {mediaMax1024 ? <img src={singleProduct.images[2]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={singleProduct.images[2]}
                                        onMouseEnter={(e) => {
                                            // update image size and turn-on magnifier
                                            const elem = e.currentTarget;
                                            const { width, height } = elem.getBoundingClientRect();
                                            setSize([width, height]);
                                            setShowMagnifier(true);
                                        }}
                                        onMouseMove={(e) => {
                                            // update cursor position
                                            const elem = e.currentTarget;
                                            const { top, left } = elem.getBoundingClientRect();

                                            // calculate cursor position on the image
                                            const x = e.pageX - left - window.pageXOffset;
                                            const y = e.pageY - top - window.pageYOffset;
                                            setXY([x, y]);
                                        }}
                                        onMouseLeave={() => {
                                            // close magnifier
                                            setShowMagnifier(false);
                                        }}
                                        alt={"img"}
                                    />
                                    <div
                                        style={{
                                            display: showMagnifier ? "" : "none",
                                            position: "absolute",
                                            // prevent magnifier blocks the mousemove event of img
                                            pointerEvents: "none",
                                            // set size of magnifier
                                            height: `${magnifierHeight}px`,
                                            width: `${magnifieWidth}px`,
                                            // move element center to cursor pos
                                            top: `${y - magnifierHeight / 2}px`,
                                            left: `${x - magnifieWidth / 2}px`,
                                            opacity: "1", // reduce opacity so you can verify position
                                            border: "1px solid lightgray",
                                            backgroundColor: "white",
                                            backgroundImage: `url(${singleProduct.images[2]})`,
                                            backgroundRepeat: "no-repeat",

                                            //calculate zoomed image size
                                            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                                                }px`,

                                            //calculate position of zoomed image.
                                            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                                            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                                        }}
                                    ></div>
                                </div>
                            }
                        </SwiperSlide>
                        <SwiperSlide>
                            {mediaMax1024 ? <img src={singleProduct.images[3]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={singleProduct.images[3]}
                                        onMouseEnter={(e) => {
                                            // update image size and turn-on magnifier
                                            const elem = e.currentTarget;
                                            const { width, height } = elem.getBoundingClientRect();
                                            setSize([width, height]);
                                            setShowMagnifier(true);
                                        }}
                                        onMouseMove={(e) => {
                                            // update cursor position
                                            const elem = e.currentTarget;
                                            const { top, left } = elem.getBoundingClientRect();

                                            // calculate cursor position on the image
                                            const x = e.pageX - left - window.pageXOffset;
                                            const y = e.pageY - top - window.pageYOffset;
                                            setXY([x, y]);
                                        }}
                                        onMouseLeave={() => {
                                            // close magnifier
                                            setShowMagnifier(false);
                                        }}
                                        alt={"img"}
                                    />
                                    <div
                                        style={{
                                            display: showMagnifier ? "" : "none",
                                            position: "absolute",
                                            // prevent magnifier blocks the mousemove event of img
                                            pointerEvents: "none",
                                            // set size of magnifier
                                            height: `${magnifierHeight}px`,
                                            width: `${magnifieWidth}px`,
                                            // move element center to cursor pos
                                            top: `${y - magnifierHeight / 2}px`,
                                            left: `${x - magnifieWidth / 2}px`,
                                            opacity: "1", // reduce opacity so you can verify position
                                            border: "1px solid lightgray",
                                            backgroundColor: "white",
                                            backgroundImage: `url(${singleProduct.images[3]})`,
                                            backgroundRepeat: "no-repeat",

                                            //calculate zoomed image size
                                            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                                                }px`,

                                            //calculate position of zoomed image.
                                            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                                            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                                        }}
                                    ></div>
                                </div>
                            }
                        </SwiperSlide>
                        <SwiperSlide>
                            {mediaMax1024 ? <img src={singleProduct.images[4]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={singleProduct.images[4]}
                                        onMouseEnter={(e) => {
                                            // update image size and turn-on magnifier
                                            const elem = e.currentTarget;
                                            const { width, height } = elem.getBoundingClientRect();
                                            setSize([width, height]);
                                            setShowMagnifier(true);
                                        }}
                                        onMouseMove={(e) => {
                                            // update cursor position
                                            const elem = e.currentTarget;
                                            const { top, left } = elem.getBoundingClientRect();

                                            // calculate cursor position on the image
                                            const x = e.pageX - left - window.pageXOffset;
                                            const y = e.pageY - top - window.pageYOffset;
                                            setXY([x, y]);
                                        }}
                                        onMouseLeave={() => {
                                            // close magnifier
                                            setShowMagnifier(false);
                                        }}
                                        alt={"img"}
                                    />
                                    <div
                                        style={{
                                            display: showMagnifier ? "" : "none",
                                            position: "absolute",
                                            // prevent magnifier blocks the mousemove event of img
                                            pointerEvents: "none",
                                            // set size of magnifier
                                            height: `${magnifierHeight}px`,
                                            width: `${magnifieWidth}px`,
                                            // move element center to cursor pos
                                            top: `${y - magnifierHeight / 2}px`,
                                            left: `${x - magnifieWidth / 2}px`,
                                            opacity: "1", // reduce opacity so you can verify position
                                            border: "1px solid lightgray",
                                            backgroundColor: "white",
                                            backgroundImage: `url(${singleProduct.images[4]})`,
                                            backgroundRepeat: "no-repeat",

                                            //calculate zoomed image size
                                            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel
                                                }px`,

                                            //calculate position of zoomed image.
                                            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                                            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                                        }}
                                    ></div>
                                </div>
                            }
                        </SwiperSlide>
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        className="mySwiper">
                        <SwiperSlide>
                            <img src={singleProduct.images[0]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={singleProduct.images[1]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={singleProduct.images[2]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={singleProduct.images[3]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={singleProduct.images[4]} />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="productItem__right">
                    <h1 className="product-name">{singleProduct.name}</h1>
                    <div className="product-stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i> (7)
                    </div>
                    <p>Availability: <span>In Stock</span></p>
                    <div className="productItem-price">${singleProduct.price}</div>
                    <ul className="vestibulum">
                        <li>{singleProduct.category}</li>
                        <li>{singleProduct.brand}</li>
                        <li>{singleProduct.desc}</li>
                        <div className="color">Color:</div>
                    </ul>
                    <ul className="color-list">
                        <li className={`white ${singleProduct.color === "white" ? "border-blue" : ""}`}
                            onClick={() => selectColor("white")}></li>
                        <li className={`dark-orange ${singleProduct.color === "yellow" ? "border-blue" : ""}`}
                            onClick={() => selectColor("yellow")}></li>
                        <li className={`blue ${singleProduct.color === "blue" ? "border-blue" : ""}`}
                            onClick={() => selectColor("blue")}></li>
                        <li className={`red ${singleProduct.color === "red" ? "border-blue" : ""}`}
                            onClick={() => selectColor("red")}></li>
                    </ul>
                    <div className="color">Size:</div>
                    <ul className="sizes">
                        <li className={singleProduct.size === "XS" ? "border-blue" : ""}
                            onClick={() => selectSize("XS")}>XS</li>
                        <li className={singleProduct.size === "S" ? "border-blue" : ""}
                            onClick={() => selectSize("S")}>S</li>
                        <li className={singleProduct.size === "M" ? "border-blue" : ""}
                            onClick={() => selectSize("M")}>M</li>
                        <li className={singleProduct.size === "L" ? "border-blue" : ""}
                            onClick={() => selectSize("L")}>L</li>
                        <li className={singleProduct.size === "XL" ? "border-blue" : ""}
                            onClick={() => selectSize("XL")}>XL</li>
                        <li className={singleProduct.size === "XXL" ? "border-blue" : ""}
                            onClick={() => selectSize("XXL")}>XXL</li>
                    </ul>
                    <div className="vishList">
                        <span className='vishlist-span'>
                            {!hasLiked
                                ? <span
                                    className='vishlist-span-inner'
                                    onClick={() => changeFavorites(singleProduct, user._id)}>
                                    <i className="far fa-heart"></i>Add to Wishlist
                                </span>
                                : <span
                                    className='fontawesome-span'
                                    onClick={() => changeFavorites(singleProduct, user._id)}>
                                    <i className='colored-heart'>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </i>Added to Wishlist
                                </span>}
                        </span>

                        <Popover content={content} trigger="click">
                            <Button className='size-shart'><i className="fal fa-table"></i>View Size Chart</Button>
                        </Popover>
                    </div>
                    <div className="add-product">
                        <div className="product-count">
                            <i onClick={minusItemCount} className="fas fa-minus minus"></i>
                            <span>{singleProduct.count}</span>
                            <i onClick={plusItemCount} className="fas fa-plus plus"></i>
                        </div>
                        <AddToBasketButton singleProduct={singleProduct} />
                        {/* <button onClick={addToBasket}>Add To Basket</button> */}
                    </div>
                </div>
            </section>
            {/* <section className="info container">
                <div className="info__top">
                    <h3 className="title map-title-active">DESCRIPTIONS</h3>
                    <h3 className="title">INFORMATION</h3>
                    <h3 className="title">REVIEWS</h3>
                </div>
                <div className="info__bottom">
                    <p className="description">
                        Quisque quis ipsum venenatis, fermentum ante volutpat, ornare enim. Phasellus molestie risus non aliquet cursus. Integer vestibulum mi lorem, id hendrerit ante lobortis non. Nunc ante ante, lobortis non pretium non, vulputate vel nisi. Maecenas dolor
                        elit, fringilla nec turpis ac, auctor vulputate nulla. Phasellus sed laoreet velit. Proin fringilla urna vel mattis euismod. Etiam sodales, massa non tincidunt iaculis, mauris libero scelerisque justo, ut rutrum lectus urna sit amet
                        quam. Nulla maximus vestibulum mi vitae accumsan.
                    </p>
                    <div className="information">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Size</td>
                                    <td>XS / S / M / L</td>
                                </tr>
                                <tr>
                                    <td>Color</td>
                                    <td>White/ Black/ Teal/ Brown</td>
                                </tr>
                                <tr>
                                    <td>Properties</td>
                                    <td>Colorful Dress</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="reviews">
                        <h2>1 REVIEW FOR ROLF ROUND</h2>
                        <div className="user-review">
                            <div className="user-img">
                                <img src="./assets/img/avartar.png" alt="" />
                            </div>
                            <div className="user-desc">
                                <div className="desc-title">
                                    <p><strong>Cobus Bester</strong> - June 7, 2013</p>
                                    <div className="user-stars">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <span>(1)</span>
                                    </div>
                                </div>
                                <p className="user-text">
                                    Simple and effective design. One of my favorites.
                                </p>
                            </div>
                        </div>
                        <div className="review-middle">
                            <p>ADD A REVIEW</p>
                            <p>
                                Your email address will not be published. Required fields are marked <span>*</span>
                            </p>
                        </div>
                        <div className="rating">
                            <p>Your rating</p>
                            <div className="rating-scale">
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <div className="rate">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <form className="form" action="">
                            <div className="review-textarea">
                                <label className="textarea" htmlFor="textarea">Your review <span>*</span></label
                                >
                                <textarea name="textarea" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="review-name">
                                <label htmlFor="name">Name <span>*</span></label>
                                <input type="text" />
                            </div>
                            <div className="review-email">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="email" />
                            </div>
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            </section> */}
            {/* <section className="also-productItem container">
                <h2>YOU MAY ALSO LIKE</h2>
                <hr />
                { <div className="swiper mySwiper4">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <img src="./assets/img/also.jpg" alt="" />
                                <div className="slider__middle-img-desc">
                                    <h5>Rolf Round</h5>
                                    <div className="rate">
                                        <div className="star">
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                        </div>
                                        <div className="star-num">(3)</div>
                                    </div>
                                    <div className="discount">
                                        <del>$65</del>
                                        <span>$45</span>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <img src="./assets/img/also2.jpg" alt="" />
                                <div className="slider__middle-img-desc">
                                    <h5>Aluminium Plant</h5>
                                    <div className="rate">
                                        <div className="star">
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                        </div>
                                        <div className="star-num">(3)</div>
                                    </div>
                                    <div className="discount">
                                        <del>$65</del>
                                        <span>$45</span>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <img src="./assets/img/also3.jpg" alt="" />
                                <div className="slider__middle-img-desc">
                                    <h5>Foyer Back</h5>
                                    <div className="rate">
                                        <div className="star">
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                        </div>
                                        <div className="star-num">(3)</div>
                                    </div>
                                    <div className="discount">
                                        <del>$65</del>
                                        <span>$45</span>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <img src="./assets/img/also4.jpg" alt="" />
                                <div className="slider__middle-img-desc">
                                    <h5>Go Gray</h5>
                                    <div className="rate">
                                        <div className="star">
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                        </div>
                                        <div className="star-num">(3)</div>
                                    </div>
                                    <div className="discount">
                                        <del>$65</del>
                                        <span>$45</span>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <img src="./assets/img/also5.jpg" alt="" />
                                <div className="slider__middle-img-desc">
                                    <h5>Rolf White</h5>
                                    <div className="rate">
                                        <div className="star">
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                        </div>
                                        <div className="star-num">(3)</div>
                                    </div>
                                    <div className="discount">
                                        <del>$65</del>
                                        <span>$45</span>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <img src="./assets/img/also6.jpg" alt="" />
                                <div className="slider__middle-img-desc">
                                    <h5>Ameris Sore</h5>
                                    <div className="rate">
                                        <div className="star">
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fas fa-star filled-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                            <i className="fal fa-star empty-star"></i>
                                        </div>
                                        <div className="star-num">(3)</div>
                                    </div>
                                    <div className="discount">
                                        <del>$65</del>
                                        <span>$45</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-pagination"></div>
                    </div> }
            </section> */}
        </>
    )
}
