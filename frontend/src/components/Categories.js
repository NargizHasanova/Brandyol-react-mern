import { useNavigate } from 'react-router';
import cat1 from '../assets/images/cat1.jpeg'
import cat2 from '../assets/images/cat2.jpg'
import cat3 from '../assets/images/cat3.jpeg'
import cat4 from '../assets/images/a3.jpg'
import cat5 from '../assets/images/b6.jpg'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCategoryName, setFilteredProducts } from '../redux/clothesSlice';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);


const hotSell = [
  {
    id: 1,
    category: "Sports wear",
    desc: "SPORT BEST",
    img: cat4
  },
  {
    id: 2,
    category: "T-Shirt",
    desc: "Exclusive T-Shirts!",
    img: cat1
  },
  {
    id: 3,
    category: "Sweater",
    desc: "SWEATER COLLECTION",
    img: cat2
  },
  {
    id: 4,
    category: "Jacket",
    desc: "LIGHT JACKETS",
    img: cat3
  },
  {
    id: 5,
    category: "Jeans",
    desc: "JEANS COLLECTION",
    img: cat5
  },
]

export default function Categories() {
  const dispatch = useDispatch()
  const clothes = useSelector(state => state.clothes)
  const navigate = useNavigate();

  function shopNow(category) {
    dispatch(setFilteredProducts(category))
    dispatch(setCategoryName(category))
    navigate("products")
  }

  return (
    <>
      <section className='categories'>
        <h1 className='title'>Categories</h1>
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          pagination={{
            "clickable": true
          }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            570: {
              slidesPerView: 2,
            },
            885: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper">

          {hotSell.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <div className='categories__item'>
                  <img src={item.img} alt={item.img} />
                  <div className="categories__item_info">
                    <h1 className='categories__item_title'>{item.desc}</h1>
                    <div className="categories__item_btn">
                      <button onClick={() => shopNow(item.category)}>SHOP NOW</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </section>
    </>
  )
}
