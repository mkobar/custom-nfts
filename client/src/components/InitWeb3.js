import Web3 from "web3";
import SimpleContract from "../contracts/SimpleContract.json";

export async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else if (window.web3) {
    window.web3 = new Web3(window.ethereum);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask"
    );
  }
}
export async function loadBlockchainData() {
  const web3 = window.web3;
  const ethereum = window.ethereum;
  const accounts = await ethereum.request({ method: "eth_accounts" });
  const networkId = await web3.eth.net.getId();
  const networkData = SimpleContract.networks[networkId];
  if (networkData) {
    const abi = SimpleContract.abi;
    const address = networkData.address;
    const contract = new web3.eth.Contract(abi, address);
    return { web3, accounts, contract };
  } else {
    window.alert("Smart contract not deployed to detected network.");
  }
}
