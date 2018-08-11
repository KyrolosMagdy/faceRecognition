const clarifai =  require('clarifai');
const app = new Clarifai.App({
    apiKey: 'ca7ec3bc0c3e4e1ca38009f251b92bac'
});
const handleApiCall = (req, res)=>{
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data=> res.json(data))
		.catch (err => res.status(401).json('unable to work with API'))
} 

const handleImage = (req, res, db)=>{
	const {id} = req.body ; 
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}
module.exports = {
	handleImage,
	handleApiCall
}