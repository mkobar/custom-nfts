import axios from "axios";
import web3 from "web3";
export const currentUserTokens = async (account, contract) => {
  const userTokens = [];
  console.log("%cgood & pushed", "color:#42f554");
  console.log("%cbad", "color:#ff3333");
  for (let i = 1; i <= 3; i++) {
    if (Number(await getOwnerOf(i, contract)) === Number(account)) {
      userTokens.push(await getTokenURI(i, contract));
      console.log(`%c${i}`, `color:#42f554`);
    } else {
      console.log(`%c${i}`, `color:#ff3333`);
    }
  }
  return userTokens;
};

// export const mint = async (
//   hash,
//   metadata,
//   jsonArray,
//   contract,
//   accounts,
//   web3,
//   removePinFromIPFS
// ) => {
//   const amountEth = "0"; //# CHANGE TRANS AMOUNT
//   const output = await contract.methods
//     .mint(hash, metadata)
//     .send({
//       from: accounts[0],
//       value: web3.utils.toWei(amountEth, "ether"),
//     })
//     .once("transactionHash", function (hash) {
//       console.log(hash);
//     })

//     .on("confirmation", function (confNumber, receipt) {
//       console.log(confNumber);
//       console.log(receipt);
//       console.log("what is this");
//     })
//     .on("error", function (error) {
//       console.log(error);
//       console.log(hash);
//       return removePinFromIPFS(hash).then("successfully removed", hash);
//     })
//     .then(function (receipt) {
//       console.log(receipt);
//       const id = jsonArray[1].currentFish.issue.toString();
//       const title = jsonArray[1].currentFish.name;
//       const rarity = jsonArray[1].currentFish.rarity;
//       const color = jsonArray[1].currentFish.base.colorTrait;
//       const imageData = jsonArray[0];
//       addFish(id, title, rarity, color, imageData);
//       console.log("sucessful");
//       return jsonArray[0];
//     });
//   return output;
// };

export const getTokenURI = async (tokenId, contract) => {
  let output;
  await contract.methods
    .tokenURI(tokenId)
    .call()
    .then(async (data) => {
      const url = data;
      const tokenURIData = await axios.get(url, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": "application/json",
        },
      });
      output = tokenURIData.data;
    });
  return output;
};

export const getOwnerOf = async (tokenId, contract) => {
  const owner = await contract.methods
    .ownerOf(tokenId)
    .call()
    .catch((err) => console.warn(err));
  if (owner === undefined) {
    return null;
  }
  return owner;
  // .then((res) => console.log(res));
};

export const getBalanceOf = async (owner, contract) => {
  return Number(await contract.methods.balanceOf(owner).call());
  // .then((res) => console.log(res));
};

export const transferToken = async (buyer, tokenId, contract) => {
  const owner = await getOwnerOf(tokenId, contract);
  console.log(`${buyer} buying ${tokenId} from ${owner}`);
  //   await contract.methods
  //     .approve(buyer, tokenId)
  //     .send({ from: buyer })
  //     .on("receipt", async (receipt) => {
  //       console.log(receipt);
  await contract.methods
    .transferFrom(owner, buyer, tokenId)
    .send({ from: buyer })
    .on("receipt", (receipt) => {
      console.log(receipt);
    });
  // });
};

export const totalSupply = async (contract) => {
  const totalSupply = await contract.methods.totalSupply().call();
  const totalTokens = [];
  for (let i = 1; i <= totalSupply; i++) {
    await contract.methods
      .tokens(i - 1)
      .call()
      .then((token) => totalTokens.push(Number(token)));
    // setTotalTokens((currentTokens) => [tokens, ...currentTokens]);
  }
  return totalTokens;
};

export const displayTotalSupply = async (contract) => {
  const totalSupply = await contract.methods.totalSupply().call();
  const totalTokens = [];
  for (let i = 1; i <= totalSupply; i++) {
    totalTokens.push(
      await getTokenURI(i, contract).then((res) => {
        return res[0];
      })
    );

    // await contract.methods
    //   .tokens(i - 1)
    //   .call()
    //   .then((token) => totalTokens.push(Number(token)));
    // setTotalTokens((currentTokens) => [tokens, ...currentTokens]);
  }
  // console.log(totalTokens);
  return totalTokens;
};
