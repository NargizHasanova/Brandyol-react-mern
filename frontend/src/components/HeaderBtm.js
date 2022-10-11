import { useNavigate } from 'react-router';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from 'react-redux';
import { resetFilterBar, setFilteredProducts, setCategoryName } from '../redux/clothesSlice';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';



// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const categories = [
   {
      "id": 1,
      "cat": "Sports wear"
   },
   {
      "id": 2,
      "cat": "T-Shirt"
   },
   {
      "id": 3,
      "cat": "Jeans"
   },
   {
      "id": 4,
      "cat": "Sweater"
   },
   {
      "id": 5,
      "cat": "Underwear"
   },
   {
      "id": 6,
      "cat": "Shorts"
   },
   {
      "id": 7,
      "cat": "Skirt"
   },
   {
      "id": 8,
      "cat": "Jacket"
   },
   {
      "id": 9,
      "cat": "Blouse"
   },
   {
      "id": 10,
      "cat": "Dress"
   }
]

export default function HeaderBtm() {
   const dispatch = useDispatch()
   const navigate = useNavigate();

   function selectCategory(category) {
      dispatch(setFilteredProducts(category))
      dispatch(setCategoryName(category))
      dispatch(resetFilterBar())
      navigate("products")
   }


   return (
      <section className='headerBtm container'>
         <Swiper
            loop={false}
            grabCursor={true}
            spaceBetween={0}
            breakpoints={{
               0: {
                  slidesPerView: 2,
               },
               375: {
                  slidesPerView: 3,
               },
               560: {
                  slidesPerView: 4,
               },
               640: {
                  slidesPerView: 6,
               },
               830: {
                  slidesPerView: 8,
               },

               1024: {
                  slidesPerView: categories.length,
               }
            }}>
            {categories.map(item => {
               return (
                  <SwiperSlide
                     className="swiper-slide header-categories"
                     key={item.id}
                     onClick={() => selectCategory(item.cat)}
                  >
                     {item.cat}
                  </SwiperSlide>
               )
            })}
         </Swiper>
      </section>
   )
}
