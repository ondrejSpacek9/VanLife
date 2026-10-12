import React from "react"

export default function Income() {
    const transactionsData = [
        { amount: 720, date: "3. 1. 2023", id: "1" },
        { amount: 560, date: "12. 12. 2022", id: "2" },
        { amount: 980, date: "3. 12. 2022", id: "3" },
    ]
    return (
        <section className="host-income">
            <h1>Příjmy</h1>
            <p>
                Posledních <span>30 dní</span>
            </p>
            <h2>$2 260</h2>
            <img
                className="graph"
                src="/assets/images/income-graph.png"
                alt="Graf příjmů"
            />
            <div className="info-header">
                <h3>Vaše transakce (3)</h3>
                <p>
                    Last <span>30 days</span>
                </p>
            </div>
            <div className="transactions">
                {transactionsData.map((item) => (
                    <div key={item.id} className="transaction">
                        <h3>${item.amount}</h3>
                        <p>{item.date}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
