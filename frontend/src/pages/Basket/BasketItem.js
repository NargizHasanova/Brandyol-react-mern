import EmptyBasket from "./EmptyBasket"
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseProductItemCount, increaseProductItemCount, removeFromBasket } from '../../redux/clothesSlice';

export default function BasketItem() {
    const dispatch = useDispatch()
    const { basket } = useSelector(state => state.clothes)
    const { confirm } = Modal;

    function showPromiseConfirm(id) {
        confirm({
            title: 'Do you want to delete this item?',
            icon: <ExclamationCircleOutlined />,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk() {
                dispatch(removeFromBasket(id))

                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 700);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }

    function plusCount(id) {
        dispatch(increaseProductItemCount(id))
    }

    function minusCount(id) {
        dispatch(decreaseProductItemCount(id))
    }

    return (
        basket.map(item => {
            const { id, images, category, name, price, size, color, count } = item
            return (
                <div key={id} className='basket-item'>
                    <div className="basket-item-img">
                        <img src={images[0]} alt={category} />
                    </div>
                    <div className="basket-item-desc">
                        <div className="basket-item-name">
                            <strong>Product:</strong> {name}</div>
                        <div className="basket-item-color">
                            <strong>Color:</strong>
                            <span
                                className="basket-item-color-span"
                                style={{ background: color }} >
                            </span>
                        </div>
                        <div className="basket-item-size">
                            <strong>Size:</strong> {size}
                        </div>
                    </div>
                    <div className="basket-item-price">
                        <div className="basket-item-count">
                            <span onClick={() => minusCount(id)} className="minus">-</span>
                            <span className="item-count">{count}</span>
                            <span onClick={() => plusCount(id)} className="plus">+</span>
                        </div>
                        <div className="basket-item-total-price">$ {price * count}</div>
                        <div className="basket-item-trash">
                            <Button onClick={() => showPromiseConfirm(id)}>
                                <i className="fal fa-trash-alt"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            )
        })


    )
}
