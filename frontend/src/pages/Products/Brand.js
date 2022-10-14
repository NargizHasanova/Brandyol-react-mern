import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from './../../redux/clothesSlice';


export default function Brand({ filterClothesByBrand }) {
    const [brandValue, setBrandValue] = useState("")
    const dispatch = useDispatch()
    const { brandsData } = useSelector(state => state.clothes)


    useEffect(() => {
        dispatch(fetchBrands())
    }, []);


    return (
        <>
            <input className='brand-search'
                value={brandValue}
                onChange={(e) => setBrandValue(e.target.value)}
                type="text"
                placeholder='choose brand' />
            <div className="brand-stock">
                {brandsData.map((item) => {
                    if (item.brand.toLowerCase().includes(brandValue.toLowerCase())) {
                        return (
                            <div key={item._id} className="brand-option">
                                <input
                                    name="brand"
                                    className='chkbox'
                                    type="checkbox"
                                    value={item.brand}
                                    onChange={(e) => filterClothesByBrand(e, item.brand)}
                                />
                                <span>{item.brand}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}
