import React from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
import { getVan } from "../../api"
import { vanTypeLabels } from "../../utils"

export function loader({ params }) {
    return getVan(params.id)
}

export default function VanDetail() {
    const location = useLocation()
    const van = useLoaderData()

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            > <span>Zpět na {type === "all" ? "všechny" : (vanTypeLabels[type] ?? type).toLowerCase()} dodávky</span></Link>

            <div className="van-detail">
                <img alt={van.name} src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>
                    {vanTypeLabels[van.type] ?? van.type}
                </i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/den</p>
                <p>{van.description}</p>
                <button className="link-button">Pronajmout tuto dodávku</button>
            </div>

        </div>
    )
}