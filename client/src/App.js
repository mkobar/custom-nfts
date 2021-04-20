import React, { useState, useEffect } from "react";
import { loadWeb3, loadBlockchainData } from "./components/InitWeb3";
import axios from "axios";
const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [tokens, setTokens] = useState([]);
  const mint = async () => {
    const hash = "QmaXYnASq5cdxkWcdCNmdghLXHHJyNqzRqbPuWX3LoZSzw";
    await contract.methods
      .mint(`https://gateway.pinata.cloud/ipfs/${hash}`)
      .send({ from: accounts[0] });
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData().then((res) => {
      const web3 = res.web3;
      const accounts = res.accounts;
      const contract = res.contract;
      setWeb3(web3);
      setAccount(accounts);
      setContract(contract);
      console.log(contract);
      const tokens = [];
      for (let i = 1; i <= 3; i++) {
        console.log(tokens);
        contract.methods
          .tokenURI(i)
          .call()
          .then((token) => {
            console.log(token);
            axios.get(token).then((data) => tokens.push(data.data));
          });
      }
      setTokens(tokens);
    });
  }, []);

  return (
    <div>
      {!web3 ? (
        <div>Loading Web3, accounts, and contract...</div>
      ) : (
        <div>
          {accounts !== null ? (
            accounts[0] === "0xf3692cd76999c860afb8714e3cfb114b152c44bc" ? (
              <button onClick={mint}>mint</button>
            ) : (
              <p>You are not owner</p>
            )
          ) : null}
          {tokens.length !== 0
            ? tokens.map((token, index) => <p key={index}>{token.name}</p>)
            : null}
        </div>
      )}
    </div>
  );
};

export default App;
