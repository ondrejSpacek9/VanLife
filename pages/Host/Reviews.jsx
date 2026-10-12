import React from "react"
import { BsStarFill } from "react-icons/bs"

export default function Reviews() {
    const reviewsData = [
        {
            rating: 5,
            name: "Elliot",
            date: "3. ledna 2023",
            text: "Beach Bum je naprosto skvělá dodávka! Tak pohodlná cesta. Měli jsme ji 2 týdny a nebyl s ní jediný problém. Při převzetí byla perfektně čistá a pronajímatel je velmi příjemný a vstřícný. Vřele doporučuji!",
            id: "1",
        },
        {
            rating: 5,
            name: "Sandy",
            date: "12. prosince 2022",
            text: "Modest Explorer jsme na cesty využili už potřetí a naprosto ho milujeme! Žádné výtky, absolutně dokonalé!",
            id: "2",
        },
    ]

    return (
        <section className="host-reviews">
            <div className="top-text">
                <h2>Vaše recenze</h2>
                <p>
                    Posledních <span>30 dní</span>
                </p>
            </div>
            <img
                className="graph"
                src="/assets/images/reviews-graph.png"
                alt="Graf hodnocení"
            />
            <h3>Recenze (2)</h3>
            {reviewsData.map((review) => (
                <div key={review.id}>
                    <div className="review">
                        {[...Array(review.rating)].map((_, i) => (
                            <BsStarFill className="review-star" key={i} />
                        ))}
                        <div className="info">
                            <p className="name">{review.name}</p>
                            <p className="date">{review.date}</p>
                        </div>
                        <p>{review.text}</p>
                    </div>
                    <hr />
                </div>
            ))}
        </section>
    )
}
