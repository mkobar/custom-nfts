import React, { useState, useEffect } from "react";
import { loadWeb3, loadBlockchainData } from "./components/InitWeb3";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { currentUserTokens } from "./components/Functions";
import axios from "axios";
import Profile from "./components/Profile";
import CollectibleView from "./components/CollectibleView";
const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const fishes = [
    "QmYUuUcMFPLoyAvcCEcbbtav6CWY8Pz2eNYkfNwnqWWN3R",
    "QmY7g9dAfb4hcsDLJY5S7qQdT4pW81h8isy8xCYyWnKc6W",
    "QmaXYnASq5cdxkWcdCNmdghLXHHJyNqzRqbPuWX3LoZSzw",
  ];
  const [totalSupply, setTotalSupply] = useState([]);
  const [tokens, setTokens] = useState([]);

  const mint = async (id) => {
    const hash = fishes[id];
    console.log(hash);
    await contract.methods
      .mint(`https://gateway.pinata.cloud/ipfs/${hash}`)
      .send({ from: accounts[0] });
  };

  // const getTokens = async (contract) => {
  //   const tokens = [];
  //   for (let i = 1; i <= fishes.length; i++) {
  //     const token = await contract.methods.tokenURI(i).call();
  //     const tokenData = await axios.get(token);
  //     tokens.push(tokenData.data);
  //     // console.log(token);
  //   }
  //   console.log(tokens);
  //   setTotalSupply(tokens);
  // };

  const getTokens = async () => {
    const tokens = [];

    for (let i = 0; i <= fishes.length - 1; i++) {
      const hash = fishes[i];
      const token = `https://gateway.pinata.cloud/ipfs/${hash}`;
      const tokenData = await axios.get(token);
      tokens.push(tokenData.data);
    }
    console.log(tokens);
    setTotalSupply(tokens);
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
      getTokens();
      currentUserTokens(accounts[0], contract).then((tokens) => {
        console.log(tokens);
        setTokens(tokens);
      });
    });
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/profile">
          <Profile tokens={tokens} account={accounts} />
        </Route>
        <Route path="/items/:id">
          <CollectibleView contract={contract} totalSupply={totalSupply} />
        </Route>
        <Route path="/">
          {!web3 ? (
            <div>Loading Web3, accounts, and contract...</div>
          ) : (
            <div>
              <Link to="/profile">profile</Link>
              {totalSupply.map((token, index) => (
                <>
                  <Link to={`/items/${index + 1}`}>
                    <img
                      key={index}
                      width="15%"
                      src={token.image}
                      alt={token.image}
                    />
                  </Link>
                  <button
                    onClick={() => {
                      mint(index);
                      console.log(index, "=>", fishes[index]);
                    }}
                  >
                    Mint Me!
                  </button>
                </>
              ))}
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
