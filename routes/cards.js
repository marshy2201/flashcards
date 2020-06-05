const express = require('express');
const { data } = require('../data/flashcardData.json');
const { cards } = data;

const router = express.Router();

router.get('/', (req, res) => {
  const randomCardNumber = Math.floor(Math.random() * cards.length);

  res.redirect(`/cards/${randomCardNumber}`);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { side } = req.query;

  const invalidQueryString = !["question", "answer"].includes(side); 
  
  if (!side || invalidQueryString) {
    res.redirect(`/cards/${id}?side=question`);
  } else {
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];

    const templateData = { text, id, side, name };

    if (side === "question") {
      templateData.hint = hint;
    } 

    res.render('card', templateData);
  }
});

module.exports = router;