function addRowLock(flightId){
    return `SELECT * FROM FLIGHTS WHERE FLIGHTS.id = ${flightId} FOR UPDATE`;
}

module.exports = {
    addRowLock
}