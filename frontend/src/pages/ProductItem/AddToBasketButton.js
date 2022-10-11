import React, { useState } from 'react';
import ReactiveButton from 'reactive-button';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../../redux/clothesSlice';

export default function AddToBasketButton({productItem}) {
    const dispatch = useDispatch()
    // const { productItem } = useSelector(state => state.clothes)
    const [state, setState] = useState('idle');

    const onClickHandler = () => {
        setState('loading');
        setTimeout(() => {
            setState('success');
        }, 2000);
    }

    function addBasket() {
        dispatch(addToBasket())
    }

    return (
        <ReactiveButton
            buttonState={state}
            onClick={() => {
                onClickHandler()
                addBasket()
            }}
            color={'primary'}
            idleText={'Add To Basket'}
            loadingText={'Loading'}
            successText={'Success'}
            errorText={'Error'}
            type={'button'}
            className={`addToBasketBtn ${(!productItem.size.length || !productItem.color.length) && 'disabledAddToBasketBtn'}`}
            style={{ borderRadius: '5px' }}
            outline={false}
            shadow={false}
            rounded={false}
            size={'normal'}
            block={false}
            // messageDuration={2000}
            disabled={(!productItem.size.length || !productItem.color.length) ? true : false}
            buttonRef={null}
            width={null}
            height={null}
            animation={true}
        />
    );
}
