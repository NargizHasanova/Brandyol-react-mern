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

export const fetchFilteredProducts = createAsyncThunk("search/fetchFilteredProducts",
    async ({ category: cat, brand }) => {
        const isBrand = typeof brand === "string"
        const isCategory = typeof cat === "string"
        console.log(brand);

        if (isBrand && isCategory) {
            const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}`)
            console.log("ikiside true");
            return data
        } else if (isCategory) {
            console.log('category true');
            const { data } = await Axios.get(`/search/?cat=${cat}`)
            console.log(data);
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
        selectedBrands: [],
        basket: [],
        filterGenderCombiner: [],
        filterBrandCombiner: [],
        filterPriceCombiner: [],
        filterItemIdBox: [],
        loading: true,
        // categoryName: "",
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
        // setCategoryName: (state, { payload }) => {
        //     state.categoryName = payload
        // },
        selectBrands: (state, { payload }) => {
            state.brandsData = state.brandsData.map(item => {
                if (item.brand === payload) {
                    item.selected = !item.selected
                }
                return item
            })
        },
        checkSelectedBrands: (state, { payload }) => {
            state.brandsData.map(item => {
                if (item.selected === true) {
                    state.selectedBrands.push(item.brand)
                }
                return item
            })
        },
        setFilteredProducts: (state, { payload }) => {
            state.productsPageClothes = state.data.filter(item => item.category === payload)

        },
        resetFilterBar: (state) => {
            state.filterGenderCombiner = []
            state.filterBrandCombiner = []
            state.filterPriceCombiner = []
            state.filterItemIdBox = []
            state.genderFilterObj = {}
            state.brandFilterObj = {}
            state.priceFilterObj = {}
            // state.data.map(item=>item.)
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
            state.filterGenderCombiner = [...new Set(state.filterGenderCombiner)] // her defe yeni true olanlar ust uste yazilmasin deye(["male","male","female"]) ve productsPageClothesdaki kimi sifirlaya bilmirik deye bele unikal deyerleri qaytaririq (["male","female"]) 
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
        [fetchFilteredProducts.fulfilled]: (state, { payload }) => {
            console.log('fetchFilteredProducts fullfilled');
            state.productsPageClothes = payload
        },
        [fetchBrands.fulfilled]: (state, { payload }) => {
            state.brandsData = payload
        }
    }
})


export const { resetFilterBar, renderFilter, filterBrand, filterPrice, filterGender, showMoreClothesItems, showLessClothesItems, setFavoriteInFavBoxToTrue, removeFromBasket, addToBasket, increaseProductItemCount, decreaseProductItemCount, setProductItemSize, showBar, hideBar, setFilteredProducts, setCategoryName, setProductItem, addToFavBox, removeFromFavBox, changeIsFav, setProductItemColor, selectBrands, checkSelectedBrands } = clothesSlice.actions
export default clothesSlice.reducer



