import React from "react"
import {
    Link,
    useSearchParams,
    useLoaderData,
    Await
} from "react-router-dom"
import { getVans } from "../../api"
import { vanTypeLabels } from "../../utils"

export function loader() {
    return { vans: getVans() }
}

/**
 * Úkol: odstraňte ruční ošetření chyb a veškerý React state,
 * který už nepotřebujeme, a nastavte ošetření pomocí
 * errorElement pro následující cesty:
 * - /vans
 * - /vans/:id
 * - /host/vans
 * - /host/vans/:id
 * 
 * Pamatujte: před časem jsme vytvořili komponentu <Error />,
 * kterou byste měli moci znovu použít.
 */

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderVanElements(vans) {
        const displayedVans = typeFilter
            ? vans.filter(van => van.type === typeFilter)
            : vans

        const vanElements = displayedVans.map(van => (
            <div key={van.id} className="van-tile">
                <Link
                    to={van.id}
                    state={{
                        search: `?${searchParams.toString()}`,
                        type: typeFilter
                    }}
                >
                    <img alt={van.name} src={van.imageUrl} />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}<span>/den</span></p>
                    </div>
                    <i className={`van-type ${van.type} selected`}>{vanTypeLabels[van.type] ?? van.type}</i>
                </Link>
            </div>
        ))
        return (
            <>
                <div className="van-list-filter-buttons">
                    <button
                        onClick={() => handleFilterChange("type", "simple")}
                        className={
                            `van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`
                        }
                    >Základní</button>
                    <button
                        onClick={() => handleFilterChange("type", "luxury")}
                        className={
                            `van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`
                        }
                    >Luxusní</button>
                    <button
                        onClick={() => handleFilterChange("type", "rugged")}
                        className={
                            `van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`
                        }
                    >Terénní</button>

                    {typeFilter ? (
                        <button
                            onClick={() => handleFilterChange("type", null)}
                            className="van-type clear-filters"
                        >Zrušit filtr</button>
                    ) : null}

                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <h1>Prozkoumejte naši nabídku dodávek</h1>
            <React.Suspense fallback={<h2>Načítání dodávek...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderVanElements}
                </Await>
            </React.Suspense>
        </div>
    )
}