import { useNavigate } from 'react-router';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from 'react-redux';
import { resetFilterBar, setFilteredProducts, setCategoryName, fetchCategories, fetchFilteredProducts } from '../redux/clothesSlice';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import { useEffect, useState } from 'react';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function HeaderBtm() {
   const { categoriesData: categories, productsPageClothes } = useSelector(state => state.clothes)
   const dispatch = useDispatch()
   const navigate = useNavigate();

   function selectCategory(category) {
      // dispatch(setFilteredProducts(category))
      // dispatch(setCategoryName(category))
      // dispatch(resetFilterBar())
      dispatch(fetchFilteredProducts({ category: category }))
      navigate(`/search/?cat=${category}`)
   }

   useEffect(() => {
      dispatch(fetchCategories())
   }, []);

   return (
      <section className='headerBtm container'>
         {categories.length > 0 && <Swiper
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
            {categories?.map(item => {
               return (
                  <SwiperSlide
                     className="swiper-slide header-categories"
                     key={item._id}
                     onClick={() => selectCategory(item.cat)}
                  >
                     {item.cat}
                  </SwiperSlide>
               )
            })}
         </Swiper>}
      </section>
   )
}
