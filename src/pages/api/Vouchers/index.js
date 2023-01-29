// @ts-ignore

const { vouchers } = require('./data.json')

// @ts-ignore
export default (req, res) => {
    res.status(200).json(vouchers)
}