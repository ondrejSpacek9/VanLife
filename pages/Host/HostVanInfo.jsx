import React from "react"
import { useOutletContext } from "react-router-dom"
import { vanTypeLabels } from "../../utils"

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()
    
    return (
        <section className="host-van-detail-info">
            <h4>Název: <span>{currentVan.name}</span></h4>
            <h4>Kategorie: <span>{vanTypeLabels[currentVan.type] ?? currentVan.type}</span></h4>
            <h4>Popis: <span>{currentVan.description}</span></h4>
            <h4>Viditelnost: <span>Veřejná</span></h4>
        </section>
    )
}