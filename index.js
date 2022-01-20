import express from 'express';
import data from './data/data.json'

const app = express();
const PORT = 3000;

// this is for the public folder on path /
app.use(express.static('public'));

// this is for the images folder on path /images
app.use('/images', express.static('images'));

app.get('/', (req, res) => res.json(data));

app.get('/item/:id', (req, res, next) => {
    let userId = Number(req.params.id);
    const user = data.filter(u=>u.id == userId)[0];
    res.send(user);
    next();
}, (req, res) => console.log('did you get the right data?')
);

app.post('/newItem', (req, res) => res.send(`a post request with /newItem route on port ${PORT}`));

app.get('/images', (req, res) => {
    //res.send(`a put request with /item route on port ${PORT}`);
    //res.end;
    //res.redirect('http://www.google.com');
    res.download('images/rocket.jpg')
});

app.delete('/item', (req, res) => res.send(`a delete request with /item route on port ${PORT}`));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    //console.log(data);
});