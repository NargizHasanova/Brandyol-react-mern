import { useState } from 'react';

const faq = [
    {
        question: "What delivery services do you offer?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt quae nesciunt rerum ullam laboriosam. Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
        question: "Can I split my order across multiple delivery addresses?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt quae nesciunt rerum ullam laboriosam."
    },
    {
        question: "Can I add to an existing order?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt quae nesciunt rerum ullam laboriosam Lorem,  ipsum dolor sit amet ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
        question: "When will I be charged for my order?",
        answer: "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
        question: "Where do I find the pin for my gift card?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt quae nesciunt rerum ullam laboriosam Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
        question: "In 2 week’s time I will have finished my treatment?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt quae nesciunt laboriosam Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
        question: "How can i open a dispute?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt quae nesciunt laboriosam Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    },
    {
        question: "Is it possible to get back my money after sale?",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius deserunt quae nesciunt laboriosam Lorem, ipsum dolor sit amet consectetur adipisicing elit."
    }
]

export default function Faq() {
    const [faqData, setFaqData] = useState(() => faq.map(item => ({ ...item, show: false })))

    function showFaqAnswer(question) {
        setFaqData(
            faqData.map(item => {
                if (item.question === question) {
                    item.show = !item.show
                }
                return item
            })
        )
    }

    return (
        <section className="faq">
            <h1 className="title">Frequently asked questions</h1>
            <div className="faq-container">
                {faqData.map((item, index) => {
                    return (
                        <div key={index} onClick={() => showFaqAnswer(item.question)} className="faq-item">
                            <div className="faq-inner">
                                <h3>{item.question}</h3>
                                <i className={`fal ${item.show ? 'fa-minus' : 'fa-plus'}`}></i>
                            </div>
                            <div className={`faq-answer ${item.show ? 'd-block' : 'd-none'}`}>
                                {item.answer}
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>


    )
}

