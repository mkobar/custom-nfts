import React, { useState, useEffect } from "react";
import { loadWeb3, loadBlockchainData } from "./components/InitWeb3";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [exampleResponse, setExampleResponse] = useState(null);

  const runExample = async () => {
    await contract.methods.set(5).send({ from: accounts[0] });
    const response = await contract.methods.get().call();
    setExampleResponse(response);
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData().then((res) => {
      const web3 = res.web3;
      console.log(web3);
      const accounts = res.accounts;
      const contract = res.contract;
      setWeb3(web3);
      setAccount(accounts);
      setContract(contract);
    });
  }, []);

  return (
    <div>
      {!web3 ? (
        <div>Loading Web3, accounts, and contract...</div>
      ) : (
        <div>
          <button onClick={runExample}>Set Value</button>
          <h1>{exampleResponse}</h1>
        </div>
      )}
    </div>
  );
};

export default App;
