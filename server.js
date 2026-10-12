import { createServer, Model, Response } from "miragejs"


createServer({
    models: {
        vans: Model,
        users: Model
    },

    seeds(server) {
        server.create("van", { id: "1", name: "Modest Explorer", price: 60, description: "Modest Explorer je dodávka navržená tak, aby vás dostala z domu do přírody. Tahle krasavice je vybavena solárními panely, kompostovací toaletou, nádrží na vodu a kuchyňkou. Smyslem je, že si sbalíte svůj domov a vyrazíte na víkend nebo i na déle!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" })
        server.create("van", { id: "2", name: "Beach Bum", price: 80, description: "Beach Bum je dodávka inspirovaná surfaři a cestovateli. Vznikla jako přenosný domov na cestách, ale s několika skvělými vychytávkami, které v běžném obytňáku nenajdete.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" })
        server.create("van", { id: "3", name: "Reliable Red", price: 100, description: "Reliable Red je dodávka stvořená pro cestování. Uvnitř je pohodlná a útulná, se spoustou místa, kde se můžete natáhnout. Je tu malá kuchyňka, takže si v případě potřeby můžete uvařit. Budete se cítit jako doma, jakmile do ní vstoupíte.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" })
        server.create("van", { id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder je dokonalá dodávka pro cestování a zážitky. Díky výšce stropu 2,1 m se v ní můžete postavit a máte nad hlavou spoustu místa. Podlaha je z krásného sklolaminátu (GRP), který se snadno čistí a je velmi odolný. Velké zadní okno a velká boční okna zajišťují, že je uvnitř opravdu světlo a dobře se větrá.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "789" })
        server.create("van", { id: "5", name: "The Cruiser", price: 120, description: "The Cruiser je dodávka pro ty, kdo rádi cestují v pohodlí a luxusu. Díky mnoha oknům, prostornému interiéru a dostatku úložného prostoru nabízí Cruiser krásný výhled, ať jedete kamkoli.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" })
        server.create("van", { id: "6", name: "Green Wonder", price: 70, description: "S touto dodávkou posunete cestování na další úroveň. Green Wonder je udržitelné vozidlo, které je ideální pro lidi hledající stylový a ekologický dopravní prostředek, se kterým se dostanou kamkoli.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" })
        server.create("user", { id: "123", email: "b@b.com", password: "p123", name: "Bob" })
    },

    routes() {
        this.namespace = "api"
        this.logging = false
        this.timing = 1000
        this.passthrough("https://firestore.googleapis.com/**")

        this.get("/vans", (schema, request) => {
            // return new Response(400, {}, {error: "Chyba při načítání dat"})
            return schema.vans.all()
        })

        this.get("/vans/:id", (schema, request) => {
            const id = request.params.id
            return schema.vans.find(id)
        })

        this.get("/host/vans", (schema, request) => {
            // Prozatím napevno zadané hostId
            return schema.vans.where({ hostId: "123" })
        })

        this.get("/host/vans/:id", (schema, request) => {
            // Prozatím napevno zadané hostId
            const id = request.params.id
            return schema.vans.findBy({ id, hostId: "123" })
        })

        this.post("/login", (schema, request) => {
            const { email, password } = JSON.parse(request.requestBody)
            // Tohle je extrémně naivní verze autentizace. V reálném světě to
            // prosím nedělejte a nikdy neukládejte hesla v čitelné podobě
            // do databáze 😇
            const foundUser = schema.users.findBy({ email, password })
            if (!foundUser) {
                return new Response(401, {}, { message: "Uživatel s těmito přihlašovacími údaji nebyl nalezen!" })
            }

            // Přinejmenším neposílejte heslo zpět klientovi 😅
            foundUser.password = undefined
            return {
                user: foundUser,
                token: "Dobrou chuť k pizze, tady jsou vaše tokeny."
            }
        })
    }
})