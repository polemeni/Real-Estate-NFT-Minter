import './App.css';
import myPropertyABI from './MyPropertyABI.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const myPropertyAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
// CONNECTING
const [accounts, setAccounts] = useState([]);
const [addressRecipient, setAddressRecipient] = useState("");
const [tokenURI, setTokenURI] = useState(""); // CAUTION: NOT TO BE CONFUSED WITH  the _setTokenURI method in the Soilidity contract

async function connectAccounts() {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    setAccounts(accounts);
  }
}

useEffect(() => {
  connectAccounts();
}, []);

// MINTING
async function handleMint(address_recipient, token_URI) {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      myPropertyAddress,
      myPropertyABI.abi,
      signer
    );
    try {
      const response = await contract.mintNFT(address_recipient, token_URI)
      console.log('response: ', response);
    } catch(err) {
      console.log('error: ', err);
    }

  }else {

  }
}

  return (
    <div className="App">
      <h1>Mint your property as an NFT!</h1>
      <form>
        <h2>Input your wallet address:</h2>
        <input
          type="text"
          placeholder="0x..."
          onChange={(event) => setAddressRecipient(event.target.value)}
        />
        <h2>Input your Token's URI:</h2>
        <input
          classname = "uri-input"
          style = {{width: "237px"}}
          type ="text"
          placeholder="Input IPFS URL"
          onChange={(event) => setTokenURI(event.target.value)}
        />
        <h2>Now mint your NFT!</h2>
      </form>
      {accounts.length && (
        <div>
          <button onClick={() => handleMint(addressRecipient, tokenURI)}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
