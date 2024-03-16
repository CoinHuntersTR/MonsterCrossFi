function ShowBuyers({player, buyerC}) {

    let first = player.player.slice(0, 5)
    let last = player.player.slice(-5)
    let playerAddress = first + "..........." + last

    return ( 
        <div>
            <div className="flex flex-row space-x-4">
                <h3>Player {buyerC} :</h3>
                <p>{playerAddress}</p>
            </div>
        </div>
     );
}

export default ShowBuyers;