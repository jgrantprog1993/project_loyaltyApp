// @ts-ignore

const {offers } = require('./data.json')

// @ts-ignore
export default (req, res) => {
    res.status(200).json(offers)
}