const NUM_MATCHES = 1000

async function main() {
    const data = await fetch('http://localhost:8080/api/player')
    const players = await data.json()
    console.log(players)

    for (let i = 0; i < NUM_MATCHES; i++) {
        const player1 = players[Math.floor(Math.random() * players.length)]
        const player2 = players[Math.floor(Math.random() * players.length)]

        let winner, looser, draw
        const outcome = Math.random()

        if (outcome < 0.45) {
            winner = player1
            looser = player2
            draw = false
        } else if (outcome < 0.9) {
            winner = player2
            looser = player1
            draw = false
        } else {
            winner = player1
            looser = player2
            draw = true
        }

        await fetch('http://localhost:8080/api/match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                winner: winner.id,
                looser: looser.id,
                draw: draw
            })
        })

        if (draw) {
            console.log(`Match ${i + 1}: ${player1.id} vs ${player2.id} - Draw!`)
        } else {
            console.log(`Match ${i + 1}: ${player1.id} vs ${player2.id} - ${winner.id} wins!`)
        }
    }

    const data2 = await fetch('http://localhost:8080/api/player')
    const players2 = await data2.json()
    console.log(players2)
}

main()