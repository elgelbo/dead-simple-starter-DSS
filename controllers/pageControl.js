const axios = require('axios');

exports.home = (req, res) => {
  res.render('index', {
    title: 'Home',
    "cat": "hat"
  });
}

exports.asyncPage = async (req, res) => {
  await axios('https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2')
  if (err) next(err);
  res.json('duuude', )
  // await new Promise(resolve => setTimeout(() => resolve(), 50));
  // // Async error!
  // throw new Error('woops');
}

exports.formPage = (req, res) => {
  console.log(req.body);
  res.json(req.body)
}