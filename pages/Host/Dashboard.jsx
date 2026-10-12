import React from "react"
import { Link, Await, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"
import { BsStarFill } from "react-icons/bs"

export async function loader({ request }) {
    await requireAuth(request)
    return { vans: getHostVans() }
}

export default function Dashboard() {
    const loaderData = useLoaderData()

    function renderVanElements(vans) {
        const hostVansEls = vans.map((van) => (
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Fotka dodávky ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/den</p>
                </div>
                <Link to={`vans/${van.id}`}>Zobrazit</Link>
            </div>
        ))

        return (
            <div className="host-vans-list">
                <section>{hostVansEls}</section>
            </div>
        )
    }

    return (
        <>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Vítejte!</h1>
                    <p>Příjmy za posledních <span>30 dní</span></p>
                    <h2>$2 260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Hodnocení</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5,0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Vaše nabízené dodávky</h2>
                    <Link to="vans">Zobrazit vše</Link>
                </div>
                <React.Suspense fallback={<h3>Načítání...</h3>}>
                    <Await resolve={loaderData.vans}>{renderVanElements}</Await>
                </React.Suspense>
            </section>
        </>
    )
}
