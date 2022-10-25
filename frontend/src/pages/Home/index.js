import Categories from '../../components/Categories';
import Clothes from '../../components/Clothes';
import Slider from '../../components/Slider'
import Subslider from '../../components/Subslider';
import Faq from '../../components/Faq';

export default function Home() {
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
