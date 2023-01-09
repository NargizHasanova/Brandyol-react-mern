import { useNavigate } from 'react-router';
import { FaPerbyte, FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineBook, AiOutlineMessage, AiOutlineLogout, AiOutlineQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { fetchClothesData, resetFilters } from '../redux/clothesSlice';

export default function HeaderTop() {
    const dispatch = useDispatch()
    const { basket } = useSelector(state => state.clothes)
    const { isAuthorized, user } = useSelector(state => state.users)
    const navigate = useNavigate();

    function goHome() {
        dispatch(resetFilters())
        dispatch(fetchClothesData())
        navigate("/")
    }

    function goToBasketPage() {
        navigate("/basket")
    }
    
    function logOut() {
        dispatch(logout())
        window.location.reload()
        navigate("/")
    }

    function checkFavs(){
        if(!user){
            navigate("/login")
        }
    }

    return (
        <div className="header_top">
            <div className="header_top-left">
                <div onClick={goHome} className="logo">
                    <h3 style={{ fontWeight: 700 }}>brandyol</h3>
                </div>
            </div>
            <div className="header_top-middle">
                {/* <select name="" id="">
                    <option value="">EN</option>
                    <option value="">RU</option>
                    <option value="">AZ</option>
                </select> */}
                <div className="header-search" >
                    <input type="text" name="" id="" placeholder='search' />
                    <i className="far fa-search"></i>
                </div>
            </div>

            <div className="header_top-right">
                <div className="sign">
                    <Link to="/login">
                        <i className="far fa-user"></i>
                        {isAuthorized && <span>Account</span>}
                        {!isAuthorized && <span>Sign In</span>}
                    </Link>
                    {isAuthorized &&
                        <ul className='login-dropdown'>
                            <Link to="/">
                                <span className='mail'>{user?.email}</span>
                            </Link>
                            <Link to="/">
                                <AiOutlineBook />
                                <span>my orders</span>
                            </Link>
                            <Link to="/">
                                <FaPerbyte />
                                <span>my actions</span>
                            </Link>
                            <Link to="/">
                                <AiOutlineMessage />
                                <span>messages</span>
                            </Link>
                            <Link to="/">
                                <FaRegMoneyBillAlt />
                                <span>discount card</span>
                            </Link>
                            <Link to="/">
                                <AiOutlineQuestionCircle />
                                <span>questions</span>
                            </Link>
                            <Link to="/">
                                <AiOutlineLogout />
                                <span onClick={logOut}>log out</span>
                            </Link>
                        </ul>
                    }

                </div>
                <div className="sign" onClick={checkFavs}>
                    <Link to="/favorites">
                        <i className="far fa-heart"></i>
                        <span>Favorites</span>
                    </Link>
                </div>
                <div onClick={goToBasketPage} className="home-shop-card">
                    <i className="far fa-shopping-cart shop-card"></i>
                    <span>Basket</span>
                    {basket.length > 0 && <span className='shop-counter'>{basket.length}</span>}
                </div>
            </div>
        </div>

    )
}
