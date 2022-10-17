import React, { useEffect } from 'react'
import Brand from './Brand'
import ProductCards from './ProductCards';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { renderFilter, showBar, hideBar, filterGender, filterBrand, filterPrice, fetchFilteredProducts, selectBrands, checkSelectedBrands, resetSelectedBrands } from '../../redux/clothesSlice'
import { useNavigate } from 'react-router';
import CardSkeleton from './ProductSkeleton';
import Skeleton from 'react-loading-skeleton';

export default function Products() {
    const query = () => {
        return new URLSearchParams(window.location.search)
    }
    const categoryName = query().get('cat')

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const { productsPageClothes, isSelectedBrandsEmpty, filterBarIsVisible, selectedBrands, brandsData } = useSelector(state => state.clothes)
    const [rotateArrowGender, setRotateArrowGender] = useState(true)
    const [rotateArrowBrand, setRotateArrowBrand] = useState(true)
    const [rotateArrowPrice, setRotateArrowPrice] = useState(true)
    const [refetch, setRefetch] = useState(true)

    function showFilterBar() {
        dispatch(showBar())
    }

    function hideFilterBar() {
        dispatch(hideBar())
    }

    function filterClothesByGender(e) {
        dispatch(filterGender({ [e.target.value]: e.target.checked }))
        dispatch(renderFilter())
    }

    useEffect(() => {
        if (selectedBrands.length > 0) {
            const brands = selectedBrands.join(",")
            navigate(`/search/?cat=${categoryName}&brand=${brands}`)
            dispatch(fetchFilteredProducts({ category: categoryName, brand: brands }))
        }
        if(isSelectedBrandsEmpty){
            console.log({isSelectedBrandsEmpty});
            dispatch(fetchFilteredProducts({ category: categoryName }))
            dispatch(resetSelectedBrands())
        }  
    }, [refetch]);

    function filterClothesByBrand(brand) {
        dispatch(selectBrands(brand))
        dispatch(checkSelectedBrands())
        setRefetch(prev => !prev)
    }

    function filterClothesByPrice(e) {
        dispatch(filterPrice({ [e.target.value]: e.target.checked }))
        dispatch(renderFilter())
    }

    return (
        <section className='products container'>
            {productsPageClothes.length === 0
                ? <Skeleton width="380px" height="20px" />
                : <h3 className="search_results">{productsPageClothes?.length} results are listed for the search "{categoryName}"</h3>}
            <div className="products-wrapper">
                <div className={`products__filterBar ${filterBarIsVisible ? "position-left" : ""}`}>
                    <i className='filter-back' onClick={hideFilterBar}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                    </i>
                    <div className="filterItem">
                        <div className="filter-gender"
                            onClick={() => setRotateArrowGender(prev => !prev)} >
                            <span>Gender</span>
                            <i className={`far fa-chevron-down ${rotateArrowGender ? "rotate180" : "rotate0"}`}></i>
                        </div>
                        <div className={`option ${rotateArrowGender ? "d-block" : "d-none"}`}>
                            <div className="male-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='gender'
                                    value='male'
                                    onChange={filterClothesByGender}
                                />
                                <span>male</span>
                            </div>
                            <div className="female-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='gender'
                                    value='female'
                                    onChange={filterClothesByGender}
                                />
                                <span>female</span>
                            </div>
                            <div className="child-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name="gender"
                                    value='child'
                                    onChange={filterClothesByGender}
                                />
                                <span>child</span>
                            </div>
                        </div>
                    </div>
                    <div className="filterItem">
                        <div onClick={() => setRotateArrowBrand(prev => !prev)} className="filter-brand">
                            <span>Brand</span>
                            <i className={`far fa-chevron-down ${rotateArrowBrand ? "rotate180" : "rotate0"}`}></i>
                        </div>
                        <div className={`option ${rotateArrowBrand ? "d-block" : "d-none"}`}>
                            <Brand filterClothesByBrand={filterClothesByBrand} />
                        </div>
                    </div>
                    <div className="filterItem">
                        <div onClick={() => setRotateArrowPrice(prev => !prev)} className="filter-price">
                            <span>Price</span>
                            <i className={`far fa-chevron-down ${rotateArrowPrice ? "rotate180" : "rotate0"}`}></i>
                        </div>
                        <div className={`option ${rotateArrowPrice ? "d-block" : "d-none"}`}>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="0$-50$"
                                    onChange={filterClothesByPrice}
                                />
                                <span>0$-50$</span>
                            </div>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="50$-150$"
                                    onChange={filterClothesByPrice}
                                />
                                <span>50$-150$</span>
                            </div>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="150$-350$"
                                    onChange={filterClothesByPrice}
                                />
                                <span>150$-350$</span>
                            </div>
                            <div className="price-option">
                                <input
                                    className='chkbox'
                                    type="checkbox"
                                    name='price'
                                    value="350$-2250$"
                                    onChange={filterClothesByPrice}
                                />
                                <span>350$-2250$</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='filter-shortbar'>
                    <i className='filter-icon' onClick={showFilterBar}>
                        <FontAwesomeIcon icon={faFilter} />
                    </i>
                </div>
                <div className="products-box"
                    style={{ width: `${filterBarIsVisible ? "68%" : ""}` }} >
                    <ProductCards />
                </div>
            </div>
        </section>
    )
}
