import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { genders } from "../db/gender";
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

export const fetchFilteredProducts = createAsyncThunk("search/fetchFilteredProducts",
    async ({ category: cat, brand, gender, price }) => {
        const isBrand = typeof brand === "string"
        // const isCategory = typeof cat === "string"
        const isGender = typeof gender === "string"
        // const isPrice = typeof price === "string"
        console.log(gender); // undefined
        if (isBrand && isGender) {
            console.log('isBrand and isGender');
            const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}&gender=${gender}`)
            return data
        } else if (isBrand) {
            console.log('isBrand');
            const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}`)
            return data
        } else if (isGender) {
            console.log('isGender');
            const { data } = await Axios.get(`/search/?cat=${cat}&gender=${gender}`)
            return data
        } else {
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
        productsPageClothes: [],
        brandsData: [],
        gendersData: [],
        selectedBrands: [],
        selectedGenders: [],
        selectedPrices: [],
        isSelectedBrandsEmpty: true,
        isSelectedGendersEmpty: true,
        // isSelectedPricesEmpty: false,
        // ==================
        basket: [],
        filterGenderCombiner: [],
        filterBrandCombiner: [],
        filterPriceCombiner: [],
        filterItemIdBox: [],
        loading: true,
        productItem: {},
        genderFilterObj: {},
        priceFilterObj: {},
        brandFilterObj: {},
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
            state.isSelectedBrandsEmpty = false

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
        setFilteredProducts: (state, { payload }) => {
            state.productsPageClothes = state.data.filter(item => item.category === payload)
        },
        resetSelectedGenders: (state) => {
            state.selectedGenders = []
            // state.isSelectedBrandsEmpty = true
        },
        resetSelectedBrands: (state) => {
            state.selectedBrands = []
        },

        // ================
        resetFilterBar: (state) => {
            state.filterGenderCombiner = []
            state.filterBrandCombiner = []
            state.filterPriceCombiner = []
            state.filterItemIdBox = []
            state.genderFilterObj = {}
            state.brandFilterObj = {}
            state.priceFilterObj = {}
        },
        setProductItem: (state, { payload } = state.productItem) => {
            state.productItem = payload
        },
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
        filterPrice: (state, { payload }) => {
            state.priceFilterObj = { ...state.priceFilterObj, ...payload }
            // { "50$-150$":true , "0$-50$":false }
            for (let key in state.priceFilterObj) {
                if (state.priceFilterObj[key] === true) {
                    state.filterPriceCombiner.push(key)
                } else {
                    state.filterPriceCombiner.splice(state.filterPriceCombiner.indexOf(key), 1)
                }
            }
            state.filterPriceCombiner = [...new Set(state.filterPriceCombiner)]
        },
        filterBrand: (state, { payload }) => {
            state.brandFilterObj = { ...state.brandFilterObj, ...payload }
            // { mavi:true, bershka:false }
            for (let key in state.brandFilterObj) {
                if (state.brandFilterObj[key] === true) {
                    state.filterBrandCombiner.push(key)
                } else {
                    state.filterBrandCombiner.splice(state.filterBrandCombiner.indexOf(key), 1)
                }
            }
            state.filterBrandCombiner = [...new Set(state.filterBrandCombiner)]
        },
        filterGender: (state, { payload }) => {
            state.genderFilterObj = { ...state.genderFilterObj, ...payload }
            // { male:true, female:true, child:false }
            for (let key in state.genderFilterObj) {
                if (state.genderFilterObj[key] === true) {
                    state.filterGenderCombiner.push(key)
                } else {
                    state.filterGenderCombiner.splice(state.filterGenderCombiner.indexOf(key), 1)
                }
            }
            state.filterGenderCombiner = [...new Set(state.filterGenderCombiner)]
        },
        renderFilter: (state) => {
            // filterCombiner = ["female","male"]
            // if no filterItem checked
            if (state.filterBrandCombiner.length === 0 &&
                state.filterGenderCombiner.length === 0 &&
                state.filterPriceCombiner.length === 0
            ) {
                state.productsPageClothes = state.data.filter(item => item.category === state.categoryName)
                // filterlerin hamsini silinnen sonra yeniden her hansisa filteri secende butun filterlerin icini resetleyirik
                state.filterGenderCombiner = []
                state.filterBrandCombiner = []
                state.filterPriceCombiner = []
                state.filterItemIdBox = []
                state.genderFilterObj = {}
                state.brandFilterObj = {}
                state.priceFilterObj = {}
                return
            }


            state.data.map(item => {
                if (state.filterGenderCombiner.length > 0 &&
                    state.filterBrandCombiner.length > 0 &&
                    state.filterPriceCombiner.length > 0) {
                    if (state.filterGenderCombiner.includes(item.gender) &&
                        state.filterBrandCombiner.includes(item.brand)) {
                        if (state.filterPriceCombiner.includes("0$-50$")) {
                            if (item.price > 0 && item.price <= 50) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("50$-150$")) {
                            if (item.price > 50 && item.price <= 150) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("150$-350$")) {
                            if (item.price > 150 && item.price <= 350) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("350$-2250$")) {
                            if (item.price > 350 && item.price <= 2250) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                    }
                }
                if (state.filterGenderCombiner.length > 0 &&
                    state.filterBrandCombiner.length === 0 &&
                    state.filterPriceCombiner.length === 0) {
                    if (state.filterGenderCombiner.includes(item.gender)) {
                        state.filterItemIdBox.push(item.id)
                    }
                }

                if (state.filterGenderCombiner.length === 0 &&
                    state.filterBrandCombiner.length > 0 &&
                    state.filterPriceCombiner.length === 0) {
                    if (state.filterBrandCombiner.includes(item.brand)) {
                        state.filterItemIdBox.push(item.id)
                    }
                }

                if (state.filterGenderCombiner.length === 0 &&
                    state.filterBrandCombiner.length === 0 &&
                    state.filterPriceCombiner.length > 0) {
                    if (state.filterPriceCombiner.includes("0$-50$")) {
                        if (item.price > 0 && item.price <= 50) {
                            state.filterItemIdBox.push(item.id)
                        }
                    }
                    if (state.filterPriceCombiner.includes("50$-150$")) {
                        if (item.price > 50 && item.price <= 150) {
                            state.filterItemIdBox.push(item.id)
                        }
                    }
                    if (state.filterPriceCombiner.includes("150$-350$")) {
                        if (item.price > 150 && item.price <= 350) {
                            state.filterItemIdBox.push(item.id)
                        }
                    }
                    if (state.filterPriceCombiner.includes("350$-2250$")) {
                        if (item.price > 350 && item.price <= 2250) {
                            state.filterItemIdBox.push(item.id)
                        }
                    }
                }

                if (state.filterGenderCombiner.length > 0 &&
                    state.filterBrandCombiner.length > 0 &&
                    state.filterPriceCombiner.length === 0) {
                    if (state.filterGenderCombiner.includes(item.gender) &&
                        state.filterBrandCombiner.includes(item.brand)) {
                        state.filterItemIdBox.push(item.id)
                    }
                }

                if (state.filterGenderCombiner.length === 0 &&
                    state.filterBrandCombiner.length > 0 &&
                    state.filterPriceCombiner.length > 0) {
                    if (state.filterBrandCombiner.includes(item.brand)) {
                        // console.log('isleyir');
                        if (state.filterPriceCombiner.includes("0$-50$")) {
                            if (item.price > 0 && item.price <= 50) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("50$-150$")) {
                            if (item.price > 50 && item.price <= 150) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("150$-350$")) {
                            if (item.price > 150 && item.price <= 350) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("350$-2250$")) {
                            if (item.price > 350 && item.price <= 2250) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                    }
                }
                if (state.filterGenderCombiner.length > 0 &&
                    state.filterBrandCombiner.length === 0 &&
                    state.filterPriceCombiner.length > 0) {
                    if (state.filterGenderCombiner.includes(item.gender)) {
                        if (state.filterPriceCombiner.includes("0$-50$")) {
                            if (item.price > 0 && item.price <= 50) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("50$-150$")) {
                            if (item.price > 50 && item.price <= 150) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("150$-350$")) {
                            if (item.price > 150 && item.price <= 350) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                        if (state.filterPriceCombiner.includes("350$-2250$")) {
                            if (item.price > 350 && item.price <= 2250) {
                                state.filterItemIdBox.push(item.id)
                            }
                        }
                    }
                }
                return item
            });

            // state.filterItemIdBox = [...new Set(state.filterItemIdBox)]

            // deyeri sifirlayiriq ve yeniden yaziriq
            state.productsPageClothes = []

            // for dongusu ancaq sonuncu deyeri qaytarmasin deye ...state.productsPageClothes bele yaziriq
            for (let filterId of state.filterItemIdBox) {
                state.productsPageClothes = [
                    ...state.productsPageClothes,
                    ...state.data.filter(item => item.id === filterId && item.category === state.categoryName)
                ]
            }
            state.filterItemIdBox = []
        }
    },
    extraReducers: {
        [fetchClothesData.pending]: (state) => {
            state.pending = true
            state.error = false
        },
        [fetchClothesData.fulfilled]: (state, { payload }) => {
            console.log('fulfilled');
            state.pending = false
            state.data = payload

        },
        [fetchClothesData.rejected]: (state, action) => {
            console.log('rejected');
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
            console.log('fetchFilteredProducts fullfilled');
            state.productsPageClothes = payload
        },
        [fetchBrands.fulfilled]: (state, { payload }) => {
            console.log('brands fullfilled');
            state.brandsData = payload
        },
        [fetchGenders.fulfilled]: (state, { payload }) => {
            console.log('genders fullfilled');
            state.gendersData = payload
        },
        [fetchGenders.rejected]: (state, { payload }) => {
            console.log(state);
            
        },
    }
})


export const { resetFilterBar, renderFilter, filterBrand, filterPrice, filterGender, showMoreClothesItems, showLessClothesItems, setFavoriteInFavBoxToTrue, removeFromBasket, addToBasket, increaseProductItemCount, decreaseProductItemCount, setProductItemSize, showBar, hideBar, setFilteredProducts, setCategoryName, setProductItem, addToFavBox, removeFromFavBox, changeIsFav, setProductItemColor, selectBrands, checkSelectedBrands, resetSelectedGenders, resetSelectedBrands, selectGenders, checkSelectedGenders } = clothesSlice.actions

export default clothesSlice.reducer



