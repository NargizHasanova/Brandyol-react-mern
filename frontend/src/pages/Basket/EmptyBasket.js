import { Link } from 'react-router-dom'
import empty from '../../assets/images/empty-card.png'

function EmptyBasket() {
  return (
    <div className="basket container">
      <div className="cart cart--empty">
        <h2 className='title'>
          Your basket is empty
        </h2>
        <img src={empty} alt="Empty cart" />
        <Link to="/" className="button-empty button--black">
          <span>Start Shopping</span>
        </Link>
      </div>
    </div>
  )
}

export default EmptyBasket