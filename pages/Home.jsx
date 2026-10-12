import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="home-container">
            <h1>Vy máte plány na cesty, my máme dodávky na cesty.</h1>
            <p>Přidejte do života dobrodružství a připojte se k hnutí #vanlife. Pronajměte si dokonalou dodávku pro dokonalý road trip.</p>
            <Link to="vans">Najděte svou dodávku</Link>
        </div>
    )
};