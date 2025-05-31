let contract;
let web3;

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const contractABI = await fetch('contractABI.json')
  .then(res => res.json())
  .then(data => data.abi); // extract only the ABI array

    const contractAddress = "0x9B8397f1B0FEcD3a1a40CdD5E8221Fa461898517";

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
