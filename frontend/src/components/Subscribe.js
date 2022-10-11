import mail from '../assets/images/mail.svg'

export default function Subscribe() {
    return (
        <section className="subscribe">
            <div className="subscribe-left">
                <h3>Subscribe for updates</h3>
                <p>Subscribe for exclusive early sale access and new arrivals.</p>
                <div className="subscribe-category">
                    <span>Women</span>
                    <span>Men</span>
                    <span>Girls</span>
                    <span>Boys</span>
                </div>
                <div className="subscribe-mail">
                    <div className="mail">Email</div>
                    <div className="subscribe-mail-input">
                        <input type="text" />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="subscribe-right">
                <img src={mail} alt="nice man" />
            </div>
        </section>
    )
}
