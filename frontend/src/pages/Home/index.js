import Categories from '../../components/Categories';
import Clothes from '../../components/Clothes';
import Slider from '../../components/Slider'
import Subslider from '../../components/Subslider';
import Faq from '../../components/Faq';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories, fetchClothesData, fetchHotSales } from '../../redux/clothesSlice';


export default function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchHotSales())
        dispatch(fetchClothesData())
    }, [])

    return (
        <>
            <Slider />
            <Subslider />
            <Categories />
            <Clothes />
            <Faq />
        </>
    )
}
