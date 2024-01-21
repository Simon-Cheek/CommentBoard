const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


let id_assign = 2;

let comments = [
    {
        _id: 0,
        user: 'User1',
        comment: 'This thing is so cool! Wow, look at this!',
        rating: 4
    }, {
        _id: 1,
        user: 'User2',
        comment: 'Nice!',
        rating: 3
    }
];

// function to calculate average score, called upon every GET request for the home page

const calcAverageScore = (comments) => {
    let totalScore = 0;
    for (comment of comments) {
        totalScore += comment.rating;
    }
    return totalScore / comments.length;
}





app.get('/', (req, res) => {
    const avgScore = calcAverageScore(comments);
    res.render('home.ejs', { comments, avgScore });
});


app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/comment/:_id', (req, res) => {
    const { _id } = req.params;
    const comment = comments.find(com => com._id === parseInt(_id));
    if (!comment) {
        console.log('oops');
        res.redirect('/');
    } else {
        res.render('edit.ejs', { comment });
    }
});

app.patch('/comment/:_id', (req, res) => {
    const { _id } = req.params;
    const newText = req.body.commentEdit;
    const comment = comments.find(com => com._id === parseInt(_id));
    comment.comment = newText;
    res.redirect('/');
});

app.delete('/comment/:_id', (req, res) => {
    const { _id } = req.params;
    comments = comments.filter(c => c._id != _id);
    res.redirect('/');
});


app.post('/', (req, res) => {
    const { username: user, content: comment } = req.body;
    let rating = parseInt(req.body.rating);
    let newId = id_assign;
    id_assign++;
    comments.push({ _id: newId, user, comment, rating });
    res.redirect('/');
})



app.listen(port, () => {
    console.log(`Listening on Port ${port}!`);
});

// implement feature to allow comments to give x/5 rating and then post average rating (use star icons?)