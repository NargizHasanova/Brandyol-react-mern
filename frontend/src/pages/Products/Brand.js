import { useState } from 'react';

const brandName = [
    { brand: "Mavi" },
    { brand: "Bershka" },
    { brand: "DeFacto" },
    { brand: "Stradivarius" },
    { brand: "Lacoste" },
    { brand: "Pull & Bear" },
    { brand: "Colin's" },
    { brand: "Mango" },
    { brand: "Mayoral" },
    { brand: "New Laviva" },
    { brand: "New Balance" },
    { brand: "Koton" },
    { brand: "Penti" },
    { brand: "LC Waikiki" },
    { brand: "Nike" },
    { brand: "Asics" },
    { brand: "Mizuno" },
    { brand: "Julude" },
    { brand: "Loft" },
    { brand: "D-Paris" },
    { brand: "Jument" },
    { brand: "Ekol" },
    { brand: "Escada" },
    { brand: "Lukas" },
    { brand: "Tommy Hilfiger" },
    { brand: "Dockers" },
    { brand: "Mudo" },
    { brand: "Only" },
    { brand: "DeepSea" },
    { brand: "Ramsey" },
    { brand: "Vitrin" },
    { brand: "Benetton" },
    { brand: "Efor" },
    { brand: "Chima" },
    { brand: "Robin" },
    { brand: "Gusto" },
    { brand: "Avva" },
    { brand: "Meteor" },
    { brand: "Solisto" },
    { brand: "Guttavo" },
    { brand: "Lorenso" },
    { brand: "Sinistro" },
    { brand: "Emroli" },
    { brand: "Lampardo" },
    { brand: "Filorio" },
    { brand: "Mers" },
    { brand: "Poppins" },
]

export default function Brand({filterClothesByBrand}) {
    const [brandValue, setBrandValue] = useState("")
    return (
        <>
            <input className='brand-search'
                value={brandValue}
                onChange={(e) => setBrandValue(e.target.value)}
                type="text"
                placeholder='choose brand' />
            <div className="brand-stock">
                {brandName.map((item, index) => {
                    if (item.brand.toLowerCase().includes(brandValue.toLowerCase())) {
                        return (
                            <div key={index} className="brand-option">
                                <input
                                    name="brand"
                                    className='chkbox'
                                    type="checkbox"
                                    value={item.brand}
                                    onChange={filterClothesByBrand}
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
