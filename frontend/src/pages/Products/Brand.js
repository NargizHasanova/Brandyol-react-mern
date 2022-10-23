import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from './../../redux/clothesSlice';
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'


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
                <FormGroup>
                    {brandsData.map((item) => {
                        if (item.brand.toLowerCase().includes(brandValue.toLowerCase())) {
                            return (
                                <FormControlLabel
                                    style={{ margin: '-7px -10px' }}
                                    key={item._id}
                                    control={
                                        <Checkbox
                                            checked={item.selected}
                                            onChange={() => filterClothesByBrand(item.brand)}
                                        />
                                    }
                                    label={item.brand}
                                />
                            )
                        }
                    })}
                </FormGroup>
            </div>
        </>
    )
}
