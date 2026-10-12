import React from "react"
import bgImg from "../assets/images/about-hero.png"
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div className="about-page-container">
            <img src={bgImg} className="about-hero-image" alt="Dodávka v přírodě" />
            <div className="about-page-content">
                <h1>Proč se mačkat v sedanu, když si můžete odpočinout v dodávce?</h1>
                <p>Naším posláním je oživit vaše cesty pronájmem dokonalé cestovní dodávky. Naše dodávky procházejí před každou cestou kontrolou, aby vaše plány proběhly bez zádrhelu. (Tažné zařízení se platí zvlášť 😉)</p>
                <p>Náš tým tvoří nadšenci do vanlife, kteří z vlastní zkušenosti znají kouzlo cestování po světě na 4 kolech.</p>
            </div>
            <div className="about-page-cta">
                <h2>Váš cíl na vás čeká.<br />Vaše dodávka je připravena.</h2>
                <Link className="link-button" to="/vans">Prohlédnout naše dodávky</Link>
            </div>
        </div>
    );
}