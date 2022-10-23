import { useNavigate } from 'react-router';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchFilteredProducts, resetFilters } from '../redux/clothesSlice';

// install Swiper modules
SwiperCore.use([Pagination, Autoplay]);

export default function Categories() {
  const dispatch = useDispatch()
  const { hotSalesData } = useSelector(state => state.clothes)
  const navigate = useNavigate();

  function shopNow(category) {
    dispatch(fetchFilteredProducts({ category: category }))
    dispatch(resetFilters())
    navigate(`/search/?cat=${category}`)
  }

  // console.log(hotSalesData);

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

          {hotSalesData.map(item => {
            return (
              <SwiperSlide key={item._id}>
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
