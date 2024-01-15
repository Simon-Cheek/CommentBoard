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
        id: 0,
        user: 'User1',
        comment: 'This thing is so cool! Wow, look at this!'
    }, {
        id: 1,
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

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(com => com.id === parseInt(id));
    res.render('edit.ejs', { comment });
});


app.post('/', (req, res) => {
    const { username: user, content: comment } = req.body;
    let newId = comments.length;
    comments.push({ id: newId, user, comment, });
    console.log(comments);
    res.redirect('/');
})



app.listen(port, () => {
    console.log(`Listening on Port ${port}!`);
});