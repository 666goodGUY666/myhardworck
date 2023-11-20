// web3.js - Example Web3.js Usage

// Import the Web3 library
const Web3 = require('web3');

// Set up an instance of Web3 with an Ethereum node endpoint
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY');

// Example usage of Web3.js to interact with Ethereum blockchain

// Get the latest block number
web3.eth.getBlockNumber()
  .then(blockNumber => {
    console.log('Latest block number:', blockNumber);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Get Ethereum balance for a specific address
const address = '0x1234567890123456789012345678901234567890';
web3.eth.getBalance(address)
  .then(balance => {
    console.log(`Balance of ${address}:`, web3.utils.fromWei(balance, 'ether'), 'ETH');
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Interacting with smart contracts
const contractAddress = '0xContractAddress';
const contractABI = [
  // ... ABI definition of the smart contract
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call a function on the smart contract (example function)
contract.methods.someFunction().call()
  .then(result => {
    console.log('Result of someFunction:', result);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Sending a transaction to a smart contract (example transaction)
const account = '0xYourAccount';
const privateKey = 'YourPrivateKey';

const functionToCall = contract.methods.someFunction();
const encodedABI = functionToCall.encodeABI();

const txObject = {
  from: account,
  to: contractAddress,
  gas: 2000000,
  data: encodedABI,
};

web3.eth.accounts.signTransaction(txObject, privateKey)
  .then(signedTx => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      .on('receipt', receipt => {
        console.log('Transaction receipt:', receipt);
      })
      .on('error', err => {
        console.error('Error sending transaction:', err);
      });
  })
  .catch(err => {
    console.error('Error signing transaction:', err);
  });
