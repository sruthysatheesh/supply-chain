let contract;
let web3;

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const contractABI = await fetch('./abi/abi.json').then(res => res.json()).then(data => data.abi);
const contractAddress = await fetch('./address/contractAddress.txt')
  .then(res => res.text())
  .then(text => text.trim());

    contract = new web3.eth.Contract(contractABI, contractAddress);
  } else {
    alert("Please install MetaMask!");
  }
});

document.getElementById('farmerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const farmerId = document.getElementById('farmerId').value;
  const farmerName = document.getElementById('farmerName').value;
  const product = document.getElementById('product').value;

  const accounts = await web3.eth.getAccounts();
  const from = accounts[0];

  try {
    await contract.methods.addFarmer(farmerId, farmerName, product).send({ from });
    document.getElementById('status').textContent = "Farmer added successfully! ヽ(•‿•)ノ";
    document.getElementById('farmerForm').reset();
  } catch (err) {
    console.error(err);
    document.getElementById('status').textContent = "Transaction failed. (≧ヘ≦ )";
  }
});


document.getElementById('getFarmerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchId = document.getElementById('searchFarmerId').value;

  try {
    const result = await contract.methods.getFarmer(searchId).call();
    const name = result[0];
    const product = result[1];

    document.getElementById('status').textContent = `👨‍🌾 Farmer: ${name}, Product: ${product}`;
  } catch (err) {
    console.error("Error fetching farmer:", err);
    document.getElementById('status').textContent = "Farmer not found. (≧ヘ≦ )";
  }
});
