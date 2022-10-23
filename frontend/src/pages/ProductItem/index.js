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
import { setProductItemSize, setProductItemColor, addToFavBox, changeIsFav, removeFromFavBox, increaseProductItemCount, decreaseProductItemCount, setFilteredProducts, setCategoryName, resetFilterBar, setProductItem } from '../../redux/clothesSlice';

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
    const clothes = useSelector(state => state.clothes)
    const [productItem, setProductItem] = useState(null);
    const { id: productId } = useParams()

    useEffect(() => {
        if (productId) {
            Axios.get(`/products/${productId}`)
                .then(({ data }) => {
                    console.log(data);
                    setProductItem(data)
                }).catch(err => console.log(err))
        }
    }, []);


    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [bgColorOfSizeXS, setBgColorOfSizeXS] = useState(false);
    const [bgColorOfSizeS, setBgColorOfSizeS] = useState(false);
    const [bgColorOfSizeM, setBgColorOfSizeM] = useState(false);
    const [bgColorOfSizeL, setBgColorOfSizeL] = useState(false);
    const [bgColorOfSizeXL, setBgColorOfSizeXL] = useState(false);
    const [bgColorOfSizeXXL, setBgColorOfSizeXXL] = useState(false);
    const [colorWhite, setColorWhite] = useState(false);
    const [colorYellow, setColorYellow] = useState(false);
    const [colorBlue, setColorBlue] = useState(false);
    const [colorRed, setColorRed] = useState(false);
    //zoom image on hover
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    //navigate
    const navigate = useNavigate();
    //responsive
    const mediaMax1024 = useMediaQuery({ query: '(max-width: 1024px)' })

    function plusItemCount() {
        dispatch(increaseProductItemCount())
    }

    function minusItemCount() {
        dispatch(decreaseProductItemCount())
    }

    function selectWhite() {
        dispatch(setProductItemColor("#fff"))
        setColorWhite(prev => !prev)
        setColorBlue(false)
        setColorRed(false)
        setColorYellow(false)
    }
    function selectYellow() {
        dispatch(setProductItemColor("#C38C39"))
        setColorYellow(prev => !prev)
        setColorBlue(false)
        setColorRed(false)
        setColorWhite(false)
    }
    function selectBlue() {
        dispatch(setProductItemColor("#5F9185"))
        setColorBlue(prev => !prev)
        setColorWhite(false)
        setColorRed(false)
        setColorYellow(false)
    }
    function selectRed() {
        dispatch(setProductItemColor("#AD4F45"))
        setColorRed(prev => !prev)
        setColorBlue(false)
        setColorWhite(false)
        setColorYellow(false)
    }

    function selectXS() {
        dispatch(setProductItemSize('XS'))
        setBgColorOfSizeXS(prev => !prev)
        setBgColorOfSizeS(false);
        setBgColorOfSizeM(false);
        setBgColorOfSizeL(false);
        setBgColorOfSizeXL(false);
        setBgColorOfSizeXXL(false);
    }
    function selectS() {
        dispatch(setProductItemSize('S'))
        setBgColorOfSizeS(prev => !prev)
        setBgColorOfSizeXS(false);
        setBgColorOfSizeM(false);
        setBgColorOfSizeL(false);
        setBgColorOfSizeXL(false);
        setBgColorOfSizeXXL(false);
    }
    function selectM() {
        dispatch(setProductItemSize('M'))
        setBgColorOfSizeM(prev => !prev)
        setBgColorOfSizeS(false);
        setBgColorOfSizeXS(false);
        setBgColorOfSizeL(false);
        setBgColorOfSizeXL(false);
        setBgColorOfSizeXXL(false);
    }
    function selectL() {
        dispatch(setProductItemSize('L'))
        setBgColorOfSizeL(prev => !prev)
        setBgColorOfSizeS(false);
        setBgColorOfSizeM(false);
        setBgColorOfSizeXS(false);
        setBgColorOfSizeXL(false);
        setBgColorOfSizeXXL(false);
    }
    function selectXL() {
        dispatch(setProductItemSize('XL'))
        setBgColorOfSizeXL(prev => !prev)
        setBgColorOfSizeS(false);
        setBgColorOfSizeM(false);
        setBgColorOfSizeL(false);
        setBgColorOfSizeXS(false);
        setBgColorOfSizeXXL(false);
    }
    function selectXXL() {
        dispatch(setProductItemSize('XXL'))
        setBgColorOfSizeXXL(prev => !prev)
        setBgColorOfSizeS(false);
        setBgColorOfSizeM(false);
        setBgColorOfSizeL(false);
        setBgColorOfSizeXL(false);
        setBgColorOfSizeXS(false);
    }

    function addToFavorites() {
        // dispatch(changeIsFav(productItem._id))
        // dispatch(addToFavBox(productItem))
    }

    function removeFromFavorites() {
        // dispatch(changeIsFav(productItem._id))
        // dispatch(removeFromFavBox(productItem._id))
    }

    function selectCategory() {
        // dispatch(setFilteredProducts(productItem.category))
        // dispatch(setCategoryName(productItem.category))
        // dispatch(resetFilterBar())
        // navigate("/products")
    }

    return (
        productItem && <>
            <div className="path container">
                <Link to="/" className="path-home" href="index.html">Home</Link>
                <i className="fas fa-angle-double-right"></i>
                <span onClick={selectCategory} className="path-home" href="index.html">{productItem.category}</span>
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
                            {mediaMax1024 ? <img src={productItem.images[0]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={productItem.images[0]}
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
                                            backgroundImage: `url(${productItem.images[0]})`,
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
                            {mediaMax1024 ? <img src={productItem.images[1]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={productItem.images[1]}
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
                                            backgroundImage: `url(${productItem.images[1]})`,
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
                            {mediaMax1024 ? <img src={productItem.images[2]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={productItem.images[2]}
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
                                            backgroundImage: `url(${productItem.images[2]})`,
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
                            {mediaMax1024 ? <img src={productItem.images[3]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={productItem.images[3]}
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
                                            backgroundImage: `url(${productItem.images[3]})`,
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
                            {mediaMax1024 ? <img src={productItem.images[4]} />
                                : <div
                                    style={{
                                        position: "relative",
                                        height: height,
                                        width: width
                                    }}
                                >
                                    <img
                                        src={productItem.images[4]}
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
                                            backgroundImage: `url(${productItem.images[4]})`,
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
                            <img src={productItem.images[0]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={productItem.images[1]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={productItem.images[2]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={productItem.images[3]} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={productItem.images[4]} />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="productItem__right">
                    <h1 className="product-name">{productItem.name}</h1>
                    <div className="product-stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i> (7)
                    </div>
                    <p>Availability: <span>In Stock</span></p>
                    <div className="productItem-price">${productItem.price}</div>
                    <ul className="vestibulum">
                        <li>{productItem.category}</li>
                        <li>{productItem.brand}</li>
                        <li>{productItem.desc}</li>
                        <div className="color">Color:</div>
                    </ul>
                    <ul className="color-list">
                        <li className={`white ${colorWhite ? "border-blue" : ""}`}
                            onClick={selectWhite}></li>
                        <li className={`dark-orange ${colorYellow ? "border-blue" : ""}`}
                            onClick={selectYellow}></li>
                        <li className={`blue ${colorBlue ? "border-blue" : ""}`}
                            onClick={selectBlue}></li>
                        <li className={`red ${colorRed ? "border-blue" : ""}`}
                            onClick={selectRed}></li>
                    </ul>
                    <div className="color">Size:</div>
                    <ul className="sizes">
                        <li className={bgColorOfSizeXS ? `clicked-size-btn` : ""} onClick={selectXS}>XS</li>
                        <li className={bgColorOfSizeS ? `clicked-size-btn` : ""} onClick={selectS}>S</li>
                        <li className={bgColorOfSizeM ? `clicked-size-btn` : ""} onClick={selectM}>M</li>
                        <li className={bgColorOfSizeL ? `clicked-size-btn` : ""} onClick={selectL}>L</li>
                        <li className={bgColorOfSizeXL ? `clicked-size-btn` : ""} onClick={selectXL}>XL</li>
                        <li className={bgColorOfSizeXXL ? `clicked-size-btn` : ""} onClick={selectXXL}>XXL</li>
                    </ul>
                    <div className="vishList">
                        <span className='vishlist-span'>
                            {!productItem.favorite ?
                                <span
                                    className='vishlist-span-inner'
                                    onClick={addToFavorites}>
                                    <i className="far fa-heart"></i>Add to Wishlist
                                </span>
                                : <span
                                    className='fontawesome-span'
                                    onClick={removeFromFavorites}>
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
                            <span>{productItem.count}</span>
                            <i onClick={plusItemCount} className="fas fa-plus plus"></i>
                        </div>
                        <AddToBasketButton productItem={productItem} />
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
