import trophy from '../assets/images/trophy.svg'
import okk from '../assets/images/qalochka.svg'
import delivery from '../assets/images/delivery.svg'
import support from '../assets/images/support.svg'

export default function Subslider() {
    return (
        <section id="subSlider">
            <div className="subslider-container">
                <div className="subSlider">
                    <div className="subSlider__item">
                        <img src={trophy} alt="trophy" />
                        <div className="subSlider__item--desc">
                            <h3>High Quality</h3>
                            <p>crafted from matria</p>
                        </div>
                    </div>
                    <div className="subSlider__item">
                        <img src={okk} alt="protection" />
                        <div className="subSlider__item--desc">
                            <h3>War Protection</h3>
                            <p>Over 2 years</p>
                        </div>
                    </div>
                    <div className="subSlider__item">
                        <img src={delivery} alt="delivery" />
                        <div className="subSlider__item--desc">
                            <h3>Free Shipping</h3>
                            <p>Orders over 1500 $</p>
                        </div>
                    </div>
                    <div className="subSlider__item">
                        <img src={support} alt="support" />
                        <div className="subSlider__item--desc">
                            <h3>24 / 7 Support</h3>
                            <p>Dedicated support</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
