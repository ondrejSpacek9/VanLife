import { redirect } from "react-router-dom"

// České popisky typů dodávek (hodnoty v datech zůstávají anglicky kvůli CSS a filtrům)
export const vanTypeLabels = {
    simple: "Základní",
    luxury: "Luxusní",
    rugged: "Terénní"
}

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin")

    if (!isLoggedIn) {
        throw redirect(
            `/login?message=Nejprve se musíte přihlásit.&redirectTo=${pathname}`
        )
    }
}
