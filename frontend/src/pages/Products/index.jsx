import React, { useEffect } from 'react'
import Brand from './Brand'
import ProductCards from './ProductCards'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faFilter } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  showBar,
  hideBar,
  fetchFilteredProducts,
  selectBrands,
  checkSelectedBrands,
  selectGenders,
  checkSelectedGenders,
  fetchGenders,
  fetchPrices,
  selectPrices,
  checkSelectedPrices,
  isSelectedPricesEmpty
} from '../../redux/clothesSlice'
import { useNavigate } from 'react-router'
import Skeleton from 'react-loading-skeleton'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function Products() {
  const query = () => {
    return new URLSearchParams(window.location.search)
  }

  const categoryName = query().get('cat')

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const {
    productsPageClothes,
    isSelectedBrandsEmpty,
    gendersData,
    isSelectedGendersEmpty,
    filterBarIsVisible,
    selectedBrands,
    selectedGenders,
    pricesData
  } = useSelector((state) => state.clothes)
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

  function filterClothesByGender(gender) {
    dispatch(selectGenders(gender))
    dispatch(checkSelectedGenders())
    setRefetch((prev) => !prev)
  }

  useEffect(() => {
    dispatch(fetchGenders())
    dispatch(fetchPrices())
  }, [])


  useEffect(() => {
    if (!isSelectedBrandsEmpty && !isSelectedGendersEmpty && !isSelectedPricesEmpty) {
      console.log('brand ve gender var')
      const brands = selectedBrands.join(',')
      const genders = selectedGenders.join(',')
      navigate(`/search/?cat=${categoryName}&brand=${brands}&gender=${genders}&minPrice=${}`)
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          brand: brands,
          gender: genders,
        }),
      )
    } 
    else if (!isSelectedBrandsEmpty && isSelectedGendersEmpty) {
      console.log('ancaq brand var')
      const brands = selectedBrands.join(',')
      navigate(`/search/?cat=${categoryName}&brand=${brands}`)
      dispatch(fetchFilteredProducts({ category: categoryName, brand: brands }))
    }
     else if (isSelectedBrandsEmpty && !isSelectedGendersEmpty) {
      console.log('ancaq gender var')
      const genders = selectedGenders.join(',')
      navigate(`/search/?cat=${categoryName}&gender=${genders}`)
      dispatch(
        fetchFilteredProducts({ category: categoryName, gender: genders }),
      )
    }
     else if (isSelectedBrandsEmpty && isSelectedGendersEmpty) {
      console.log('ikiside empty')
      navigate(`/search/?cat=${categoryName}`)
      dispatch(fetchFilteredProducts({ category: categoryName }))
    }
  }, [refetch])

  function filterClothesByBrand(brand) {
    dispatch(selectBrands(brand))
    dispatch(checkSelectedBrands())
    setRefetch((prev) => !prev)
  }

  function filterClothesByPrice(minPrice, maxPrice) {
    dispatch(selectPrices(minPrice))
    dispatch(checkSelectedPrices())
    setRefetch((prev) => !prev)
  }
  console.log(pricesData);

  return (
    <section className="products container">
      {productsPageClothes.length === 0 ? (
        <Skeleton width="380px" height="20px" />
      ) : (
        <h3 className="search_results">
          {productsPageClothes?.length} results are listed for the search "
          {categoryName}"
        </h3>
      )}
      <div className="products-wrapper">
        <div
          className={`products__filterBar ${
            filterBarIsVisible ? 'position-left' : ''
          }`}
        >
          <i className="filter-back" onClick={hideFilterBar}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </i>
          <div className="filterItem">
            <div
              className="filter-gender"
              onClick={() => setRotateArrowGender((prev) => !prev)}
            >
              <span>Gender</span>
              <i
                className={`far fa-chevron-down ${
                  rotateArrowGender ? 'rotate180' : 'rotate0'
                }`}
              ></i>
            </div>
            <div
              className={`option ${rotateArrowGender ? 'd-block' : 'd-none'}`}
            >
              <FormGroup>
                {gendersData.map((item) => (
                  <FormControlLabel
                    style={{ margin: '-10px' }}
                    key={item._id}
                    control={
                      <Checkbox
                        onChange={() => filterClothesByGender(item.gender)}
                      />
                    }
                    label={item.gender}
                  />
                ))}
              </FormGroup>
            </div>
          </div>
          <div className="filterItem">
            <div
              onClick={() => setRotateArrowBrand((prev) => !prev)}
              className="filter-brand"
            >
              <span>Brand</span>
              <i
                className={`far fa-chevron-down ${
                  rotateArrowBrand ? 'rotate180' : 'rotate0'
                }`}
              ></i>
            </div>
            <div
              className={`option ${rotateArrowBrand ? 'd-block' : 'd-none'}`}
            >
              <Brand filterClothesByBrand={filterClothesByBrand} />
            </div>
          </div>
          <div className="filterItem">
            <div
              onClick={() => setRotateArrowPrice((prev) => !prev)}
              className="filter-price"
            >
              <span>Price</span>
              <i
                className={`far fa-chevron-down ${
                  rotateArrowPrice ? 'rotate180' : 'rotate0'
                }`}
              ></i>
            </div>
            <div
              className={`option ${rotateArrowPrice ? 'd-block' : 'd-none'}`}
            >
              <FormGroup>
                {pricesData.map((item) => (
                  <FormControlLabel
                    style={{ margin: '-10px' }}
                    key={item._id}
                    control={
                      <Checkbox
                        onChange={() =>
                          filterClothesByPrice(item.minPrice, item.maxPrice)
                        }
                      />
                    }
                    label={`${item.minPrice}$-${item.maxPrice}$`}
                  />
                ))}
              </FormGroup>
              {/* <div className="price-option">
                <input
                  className="chkbox"
                  type="checkbox"
                  name="price"
                  value="0$-50$"
                  onChange={filterClothesByPrice}
                />
                <span>0$-50$</span>
              </div>
              <div className="price-option">
                <input
                  className="chkbox"
                  type="checkbox"
                  name="price"
                  value="50$-150$"
                  onChange={filterClothesByPrice}
                />
                <span>50$-150$</span>
              </div>
              <div className="price-option">
                <input
                  className="chkbox"
                  type="checkbox"
                  name="price"
                  value="150$-350$"
                  onChange={filterClothesByPrice}
                />
                <span>150$-350$</span>
              </div>
              <div className="price-option">
                <input
                  className="chkbox"
                  type="checkbox"
                  name="price"
                  value="350$-2250$"
                  onChange={filterClothesByPrice}
                />
                <span>350$-2250$</span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="filter-shortbar">
          <i className="filter-icon" onClick={showFilterBar}>
            <FontAwesomeIcon icon={faFilter} />
          </i>
        </div>
        <div
          className="products-box"
          style={{ width: `${filterBarIsVisible ? '68%' : ''}` }}
        >
          <ProductCards />
        </div>
      </div>
    </section>
  )
}
