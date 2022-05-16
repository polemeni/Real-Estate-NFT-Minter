import './App.css';
import myPropertyABI from './MyPropertyABI.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const myPropertyAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
// CONNECTING
const [accounts, setAccounts] = useState([]);
const [address_recipient, setAddress_recipient] = useState("");
// const [tokenURI, setTokenURI] = useState(""); // CAUTION: NOT TO BE CONFUSED WITH  the _setTokenURI method in the Soilidity contract

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
// async function handleMint(address_recipient, tokenURI)
async function handleMint(a_r) {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      myPropertyAddress,
      myPropertyABI.abi,
      signer
    );
    try {
      // const response = await contract.mintNFT (address_recipient, tokenURI)
      const response = await contract.mintNFT(a_r, 'https://gateway.pinata.cloud/ipfs/QmRveoxkUWxfvfGtnB9HGxVGmrdA1u4T4JZBbvZR91s1Vr')
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
        <h2>Input your wallet address then press "Mint"</h2>
        <input
          type="text"
          placeholder="0x..."
          onChange={(event) => setAddress_recipient(event.target.value)}
        />
      </form>
      {accounts.length && (
        <div>
          <button onClick={() => handleMint(address_recipient)}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
