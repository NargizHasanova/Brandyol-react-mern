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
} from '../../redux/clothesSlice'
import { useNavigate } from 'react-router'
import Skeleton from 'react-loading-skeleton'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'

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
    selectedPrices,
    pricesData,
    isSelectedPricesEmpty,
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
    if (
      !isSelectedBrandsEmpty &&
      isSelectedGendersEmpty &&
      isSelectedPricesEmpty
    ) {
      console.log('ancaq brand var')
      const brands = selectedBrands.join(',')
      navigate(`/search/?cat=${categoryName}&brand=${brands}`)
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          brand: brands,
        }),
      )
    } else if (
      isSelectedBrandsEmpty &&
      !isSelectedGendersEmpty &&
      isSelectedPricesEmpty
    ) {
      console.log('ancaq gender var')
      const genders = selectedGenders.join(',')
      navigate(`/search/?cat=${categoryName}&gender=${genders}`)
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          gender: genders,
        }),
      )
    } else if (
      isSelectedBrandsEmpty &&
      isSelectedGendersEmpty &&
      !isSelectedPricesEmpty
    ) {
      console.log('ancaq price var')
      const minPrice = selectedPrices.minPrice
      const maxPrice = selectedPrices.maxPrice
      navigate(
        `/search/?cat=${categoryName}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      )
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          minPrice: minPrice,
          maxPrice: maxPrice,
        }),
      )
    } else if (
      !isSelectedBrandsEmpty &&
      !isSelectedGendersEmpty &&
      !isSelectedPricesEmpty
    ) {
      console.log('brand ve gender ve price var')
      const brands = selectedBrands.join(',')
      const genders = selectedGenders.join(',')
      const minPrice = selectedPrices.minPrice
      const maxPrice = selectedPrices.maxPrice
      navigate(
        `/search/?cat=${categoryName}&brand=${brands}&gender=${genders}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      )
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          brand: brands,
          gender: genders,
          minPrice: minPrice,
          maxPrice: maxPrice,
        }),
      )
    } else if (
      !isSelectedBrandsEmpty &&
      isSelectedGendersEmpty &&
      !isSelectedPricesEmpty
    ) {
      console.log('brand ve price var')
      const brands = selectedBrands.join(',')
      const minPrice = selectedPrices.minPrice
      const maxPrice = selectedPrices.maxPrice
      navigate(
        `/search/?cat=${categoryName}&brand=${brands}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      )
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          brand: brands,
          minPrice: minPrice,
          maxPrice: maxPrice,
        }),
      )
    } else if (
      isSelectedBrandsEmpty &&
      !isSelectedGendersEmpty &&
      !isSelectedPricesEmpty
    ) {
      console.log('gender ve price var')
      const genders = selectedGenders.join(',')
      const minPrice = selectedPrices.minPrice
      const maxPrice = selectedPrices.maxPrice
      navigate(
        `/search/?cat=${categoryName}&gender=${genders}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      )
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          gender: genders,
          minPrice: minPrice,
          maxPrice: maxPrice,
        }),
      )
    } else if (
      !isSelectedBrandsEmpty &&
      !isSelectedGendersEmpty &&
      isSelectedPricesEmpty
    ) {
      console.log('gender ve brand var')
      const genders = selectedGenders.join(',')
      const brands = selectedBrands.join(',')
      navigate(`/search/?cat=${categoryName}&gender=${genders}&brand=${brands}`)
      dispatch(
        fetchFilteredProducts({
          category: categoryName,
          gender: genders,
          brand: brands,
        }),
      )
    } else if (
      isSelectedBrandsEmpty &&
      isSelectedGendersEmpty &&
      isSelectedPricesEmpty
    ) {
      console.log('hamisi empty')
      navigate(`/search/?cat=${categoryName}`)
      dispatch(fetchFilteredProducts({ category: categoryName }))
    }
  }, [refetch])

  function filterClothesByBrand(brand) {
    dispatch(selectBrands(brand))
    dispatch(checkSelectedBrands())
    setRefetch((prev) => !prev)
  }

  function filterClothesByPrice(minPrice) {
    dispatch(selectPrices(minPrice))
    dispatch(checkSelectedPrices())
    setRefetch((prev) => !prev)
  }

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
                    key={item._id}
                    control={
                      <Checkbox
                        checked={item.selected}
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
          <div className="filterItem" style={{ height: '257px' }}>
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
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  {pricesData.map((item) => (
                    <FormControlLabel
                      key={item._id}
                      value={item.minPrice}
                      control={
                        <Radio
                          checked={item.selected}
                          onChange={() => filterClothesByPrice(item.minPrice)}
                        />
                      }
                      label={`${item.minPrice}$-${item.maxPrice}$`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
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
