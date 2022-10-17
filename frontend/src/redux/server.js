import { Axios } from "../servicesAPI"

export const fetchFilteredProduct = async ({ category: cat, brand }) => {
    const isBrand = typeof brand === "string"
    const isCategory = typeof cat === "string"

    if (isBrand && isCategory) {
        console.log('isBrand && isCategory');
        const { data } = await Axios.get(`/search/?cat=${cat}&brand=${brand}`)
        return data
    } else if (isCategory) {
        console.log('isCategory');
        const { data } = await Axios.get(`/search/?cat=${cat}`)
        return data
    }
}
