import './App.scss';
import Home from './pages/Home/index';
import ProductItem from './pages/ProductItem';
import Products from './pages/Products';
import Announcement from './components/Announcement';
import ProductCards from './pages/Products/ProductCards';
import Footer from './components/Footer';
import HeaderTop from './components/HeaderTop';
import HeaderBtm from './components/HeaderBtm';
import Basket from './pages/Basket/index';
import { Route, Routes } from 'react-router';
import SignIn from './pages/Sign/SignIn';
import SignUp from './pages/Sign/SignUp';
import Favorites from './pages/Favorites';
import { useDispatch } from 'react-redux';
import { fetchCategories, fetchClothesData, fetchHotSales } from './redux/clothesSlice';
import { useEffect } from 'react';
import { fetchMe } from './redux/userSlice';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMe())
    dispatch(fetchCategories())
    dispatch(fetchHotSales())
    dispatch(fetchClothesData())
  }, [])

  return (
    <>
      <Announcement />
      <HeaderTop />
      <HeaderBtm />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Products />} />
        <Route path="/product_item/:id" element={<ProductItem />} />
        <Route path="/product_cards" element={<ProductCards />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App; 
