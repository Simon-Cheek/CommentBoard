const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const comments = [
    {
        user: 'User1',
        comment: 'This thing is so cool! Wow, look at this!'
    }, {
        user: 'User2',
        comment: 'Nice!'
    }
]




app.get('/', (req, res) => {
    res.render('home.ejs', { comments });
});


app.get('/new', (req, res) => {
    res.render('new.ejs');
});


app.post('/', (req, res) => {
    console.log('it works!');
    const { username: user, content: comment } = req.body;
    console.log(req.body);
    comments.push({ user, comment });
    console.log(comments);
    res.redirect('/');
})



app.listen(port, () => {
    console.log(`Listening on Port ${port}!`);
});