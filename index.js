import express from 'express';
import data from './data/data.json'

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    console.log(data);
});