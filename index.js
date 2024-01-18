const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


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
];




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

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const newText = req.body.commentEdit;
    const comment = comments.find(com => com.id === parseInt(id));
    comment.comment = newText;
    res.redirect('/');
});


app.post('/', (req, res) => {
    const { username: user, content: comment } = req.body;
    let newId = comments.length;
    comments.push({ id: newId, user, comment, });
    res.redirect('/');
})



app.listen(port, () => {
    console.log(`Listening on Port ${port}!`);
});