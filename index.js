const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


const comments = [
    {
        user: 'Simon593462',
        comment: 'This thing is so cool! Wow, look at this!'
    }, {
        user: 'KaylaWestViolist',
        comment: 'This is so wack.'
    }
]



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));




app.get('/', (req, res) => {
    res.render('home.ejs', { comments });
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}!`);
});