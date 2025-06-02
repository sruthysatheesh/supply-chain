const express = require('express');
const Web3 = require('web3').default;
const app = express();
const path = require('path');

// Connect to your Besu node (update the URL if needed)
const web3 = new Web3('http://localhost:8545');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const latest = Number(await web3.eth.getBlockNumber());
  const blocks = [];
  

  for (let i = latest; i > latest - 10 && i >= 0; i--) {
    const block = await web3.eth.getBlock(i);
    blocks.push(block);
  }

  res.render('index', { blocks });
});

app.get('/block/:number', async (req, res) => {
  const block = await web3.eth.getBlock(parseInt(req.params.number), true);

  // Convert transaction values to ETH in advance
  block.transactions = block.transactions.map(tx => ({
    ...tx,
    valueInEth: web3.utils.fromWei(tx.value, 'ether')
  }));

  res.render('block', { block });
});


app.listen(3000, () => console.log('Block explorer running at http://localhost:3000'));
