import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from '../servicesAPI';

export const fetchClothesData = createAsyncThunk("clothes/fetchClothes",
    async () => {
        const { data } = await Axios.get("/products")
        return data
    }
)

export const fetchCategories = createAsyncThunk("categories/fetchCategories",
    async () => {
        const { data } = await Axios.get(`/categories`)
        return data
    }
)

export const fetchBrands = createAsyncThunk("brands/fetchBrands",
    async () => {
        const { data } = await Axios.get(`/brands`)
        return data
    }
)

export const fetchGenders = createAsyncThunk("genders/fetchGenders",
    async () => {
        const { data } = await Axios.get(`/genders`)
        return data
    }
)

export const fetchPrices = createAsyncThunk("prices/fetchPrices",
    async () => {
        const { data } = await Axios.get(`/prices`)
        return data
    }
)

export const fetchHotSales = createAsyncThunk("sales/fetchHotSales",
    async () => {
        const { data } = await Axios.get(`/hotSales`)
        return data
    }
)

export const fetchFilteredProducts = createAsyncThunk("search/fetchFilteredProducts",
    async ({ category: cat, brand, gender, minPrice, maxPrice }) => {
        const isBrand = typeof brand === "string"
        const isGender = typeof gender === "string"
        const isMinPrice = typeof minPrice === "string"

        if (isBrand && isGender && isMinPrice) {
            console.log('isBrand and isGender and isPrice');
            const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}&gender=${gender}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            return data
        }
        else if (isBrand && isGender && !isMinPrice) {
            console.log('isBrand and isGender');
            const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}&gender=${gender}`)
            return data
        }
        else if (isBrand && isMinPrice && !isGender) {
            console.log('isBrand and isPrice');
            const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            return data
        }
        else if (isGender && isMinPrice && !isBrand) {
            console.log('isPrice and isGender');
            const { data } = await Axios.get(`/search/?cat=${cat}&gender=${gender}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            return data
        }
        else if (isBrand && !isGender && !isMinPrice) {
            console.log('isBrand');
            const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}`)
            return data
        }
        else if (isGender && !isBrand && !isMinPrice) {
            console.log('isGender');
            const { data } = await Axios.get(`/search/?cat=${cat}&gender=${gender}`)
            return data
        }
        else if (isMinPrice && !isBrand && !isGender) {
            console.log('isPrice');
            const { data } = await Axios.get(`/search/?cat=${cat}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            return data
        }
        else {
            console.log('fetchFilteredProducts else');
            const { data } = await Axios.get(`/search/?cat=${cat}`)
            return data
        }
    }
)

export const clothesSlice = createSlice({
    name: "clothes",
    initialState: {
        data: [],
        categoriesData: [],
        favoriteBox: [],
        hotSalesData: [],
        singleProduct: null,
        // products list page after clicking on category(ex:t-shirt)(headerBtm comp.)
        productsPageClothes: [],
        // Filters Data
        brandsData: [],
        gendersData: [],
        pricesData: [],
        // Selected Filters 
        selectedBrands: [],
        selectedGenders: [],
        selectedPrices: {},
        // not Selected Filters
        isSelectedBrandsEmpty: true,
        isSelectedGendersEmpty: true,
        isSelectedPricesEmpty: true,
        // ==================
        basket: [],
        loading: true,
        favorite: false,
        numOfItem: 10,
        filterBarIsVisible: false,
        pending: false,
        error: false
    },
    reducers: {
        selectBrands: (state, { payload }) => {
            state.brandsData = state.brandsData.map(item => {
                if (item.brand === payload) {
                    item.selected = !item.selected
                }
                return item
            })
        },
        selectGenders: (state, { payload }) => {
            state.gendersData = state.gendersData.map(item => {
                if (item.gender === payload) {
                    item.selected = !item.selected
                }
                return item
            })
        },
        selectPrices: (state, { payload }) => {
            state.pricesData = state.pricesData.map(item => {
                if (item.minPrice === payload) {
                    item.selected = !item.selected
                } else {
                    item.selected = false
                } // bele yazaraq hemise ancaq bir optionu sececek
                return item
            })
        },
        checkSelectedPrices: (state, { payload }) => {
            state.selectedPrices = {}
            let priceIsEmpty = state.pricesData.every(item => item.selected === false)

            if (priceIsEmpty) {
                state.isSelectedPricesEmpty = true
                return
            }

            state.pricesData.map(item => {
                if (item.selected === true) {
                    state.selectedPrices.minPrice = item.minPrice
                    state.selectedPrices.maxPrice = item.maxPrice
                }
                return item
            })
            state.isSelectedPricesEmpty = false

        },
        checkSelectedGenders: (state, { payload }) => {
            state.selectedGenders = []
            let genderIsEmpty = state.gendersData.every(item => item.selected === false)

            if (genderIsEmpty) {
                state.isSelectedGendersEmpty = true
                return
            }

            state.gendersData.map(item => {
                if (item.selected === true) {
                    state.selectedGenders.push(item.gender)
                }
                return item
            })
            state.isSelectedGendersEmpty = false

            state.selectedGenders = [...new Set(state.selectedGenders)]
        },
        checkSelectedBrands: (state, { payload }) => {
            state.selectedBrands = []
            let brandIsEmpty = state.brandsData.every(item => item.selected === false)

            if (brandIsEmpty) {
                state.isSelectedBrandsEmpty = true
                return
            }

            state.brandsData.map(item => {
                if (item.selected === true) {
                    state.selectedBrands.push(item.brand)
                }
                return item
            })
            state.isSelectedBrandsEmpty = false

            state.selectedBrands = [...new Set(state.selectedBrands)]
        },
        //
        setSingleProduct: (state, { payload }) => {
            state.singleProduct = payload
        },
        // reset all filters
        resetFilters: (state) => {
            state.selectedBrands = []
            state.selectedGenders = []
            state.selectedPrices = {}
            state.isSelectedBrandsEmpty = true
            state.isSelectedGendersEmpty = true
            state.isSelectedPricesEmpty = true
            state.brandsData = state.brandsData.map(item => {
                item.selected = false
                return item
            })
            state.gendersData = state.gendersData.map(item => {
                item.selected = false
                return item
            })
            state.pricesData = state.pricesData.map(item => {
                item.selected = false
                return item
            })
        },

        // ================
        showMoreClothesItems: (state) => {
            state.numOfItem = state.numOfItem + 10
        },
        showLessClothesItems: (state) => {
            state.numOfItem = state.numOfItem - 10
        },
        setProductItemColor: (state, { payload }) => {
            state.productItem.color = payload
            state.data.map(item => {
                if (item.id === state.productItem.id) {
                    item.color = payload
                }
                return item
            })
        },
        setProductItemSize: (state, { payload }) => {
            state.productItem.size = payload
            state.data.map(item => {
                if (item.id === state.productItem.id) {
                    item.size = payload
                }
                return item
            })
        },
        addToBasket: (state) => {
            state.basket = [...new Set([...state.basket, state.productItem])]
        },
        removeFromBasket: (state, { payload }) => {
            state.basket = state.basket.filter(item => item.id !== payload)
        },
        changeIsFav: (state, { payload }) => {
            state.productItem.favorite = !state.productItem.favorite
            state.data.map(item => {
                if (item.id === payload) {
                    item.favorite = !item.favorite
                }
                return item
            })
            state.productsPageClothes.map(item => {
                if (item.id === payload) {
                    item.favorite = !item.favorite
                }
                return item
            })
        },
        addToFavBox: (state, { payload }) => {
            console.log(state.favoriteBox);
            state.favoriteBox = [...new Set([...state.favoriteBox, payload])]
        },
        setFavoriteInFavBoxToTrue: (state) => {
            state.favoriteBox.map(item => {
                item.favorite = true
                return item
            })
        },
        removeFromFavBox: (state, { payload }) => {
            state.favoriteBox = state.favoriteBox.filter(item => item.id !== payload)
        },
        showBar: (state) => {
            state.filterBarIsVisible = true
        },
        hideBar: (state) => {
            state.filterBarIsVisible = false
        },
        increaseProductItemCount: (state, { payload }) => {
            state.productItem.count = state.productItem.count + 1
            state.basket.map(item => {
                if (item.id === payload) {
                    item.count += 1
                }
                return item
            })
        },
        decreaseProductItemCount: (state, { payload }) => {
            if (state.productItem.count > 1) {
                state.productItem.count = state.productItem.count - 1
                state.basket.map(item => {
                    if (item.id === payload) {
                        item.count -= 1
                    }
                    return item
                })
            }
        },
    },
    extraReducers: {
        [fetchClothesData.pending]: (state) => {
            state.pending = true
            state.error = false
        },
        [fetchClothesData.fulfilled]: (state, { payload }) => {
            state.pending = false
            state.data = payload
        },
        [fetchClothesData.rejected]: (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message
            state.pending = false
        },
        [fetchCategories.fulfilled]: (state, { payload }) => {
            state.categoriesData = payload
        },
        [fetchFilteredProducts.pending]: (state, { payload }) => {
            state.productsPageClothes = [] // skeleton gorsensin deye her category seciminde 
        },
        [fetchFilteredProducts.fulfilled]: (state, { payload }) => {
            state.productsPageClothes = payload
        },
        [fetchBrands.fulfilled]: (state, { payload }) => {
            state.brandsData = payload
        },
        [fetchGenders.fulfilled]: (state, { payload }) => {
            state.gendersData = payload
        },
        [fetchPrices.fulfilled]: (state, { payload }) => {
            state.pricesData = payload
        },
        [fetchHotSales.fulfilled]: (state, { payload }) => {
            state.hotSalesData = payload
        },
    }
})


export const { showMoreClothesItems, showLessClothesItems, setFavoriteInFavBoxToTrue, removeFromBasket, addToBasket, increaseProductItemCount, decreaseProductItemCount, setProductItemSize, showBar, hideBar, addToFavBox, removeFromFavBox, changeIsFav, setProductItemColor, selectBrands, checkSelectedBrands, resetSelectedGenders, resetSelectedBrands, selectGenders, checkSelectedGenders, checkSelectedPrices, selectPrices, resetFilters, setSingleProduct } = clothesSlice.actions

export default clothesSlice.reducer



