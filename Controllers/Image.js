import Clarifai from "clarifai";

const handleImage = (db) => (req, res) => {
    const {id} = req.body;
    db('users').where({id})
    .increment('entries' , 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('Error getting entries'));
}
const app = new Clarifai.App({
    apiKey: process.env.API_KEY
  });

export const handleApiCall = (req , res) => {
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json("Couldn't fetch data from Api"))
}



export default handleImage;