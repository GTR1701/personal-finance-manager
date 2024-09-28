export function round(numberToRound: number, roundingDirection?: "up" | "down", roundingPrecision?: number): number {
    if (roundingDirection === "up") {
        let remainder = 0
        if (roundingPrecision) {
            remainder = Math.ceil((numberToRound % 1) * Math.pow(10, roundingPrecision))
            remainder = remainder / Math.pow(10, roundingPrecision)
        }
        return Math.ceil(numberToRound) + remainder
    } else if (roundingDirection === "down") {
        let remainder = 0
        if (roundingPrecision) {
            remainder = Math.ceil((numberToRound % 1) * Math.pow(10, roundingPrecision))
            remainder = remainder / Math.pow(10, roundingPrecision)
        }
        return Math.floor(numberToRound) + remainder
    } else {
        let remainder = 0
        if (roundingPrecision) {
            remainder = Math.ceil((numberToRound % 1) * Math.pow(10, roundingPrecision))
            remainder = remainder / Math.pow(10, roundingPrecision)
        }
        return Math.round(numberToRound) + remainder
    }
}