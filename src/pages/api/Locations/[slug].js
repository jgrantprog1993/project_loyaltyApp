// @ts-nocheck
const {locations } = require('./data.json')

export default (req, res) => {
    const location = locations.filter(location => location.slug === req.query.slug)
    res.status(200).json(location)
} 

