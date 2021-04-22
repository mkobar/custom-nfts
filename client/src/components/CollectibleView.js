import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const CollectibleView = ({ contract, totalSupply }) => {
  const { id } = useParams();
  const [isMinted, setMinted] = useState(false);
  const data = totalSupply[Number(id) - 1];

  const getMinted = async () => {
    await contract;
    if (contract !== null) {
      const uri = await contract.methods.tokenURI(Number(id)).call();
      if (typeof uri === "string") {
        setMinted(true);
      }
    }
  };

  useEffect(() => {
    getMinted();
  }, [contract, getMinted]);
  //   const getTokenURI = useCallback(async () => {
  //     let output;
  //     await contract;
  //     if (contract !== null) {
  //       await contract.methods
  //         .tokenURI(Number(id))
  //         .call()
  //         .then(async (data) => {
  //           const url = data;
  //           const tokenURIData = await axios.get(url, {
  //             maxContentLength: "Infinity",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           });
  //           output = tokenURIData.data;
  //         });
  //     }
  //     setData(output);
  //     return output;
  //   }, [axios, contract, id]);

  //   useEffect(() => {
  //     getTokenURI();
  //   }, [contract, getTokenURI]);
  return (
    <div>
      <Link to="/">home</Link>
      {data !== undefined ? (
        <>
          <h1>{data.name}</h1>
          <img width="30%" src={data.image} />
          <p>{data.desc}</p>
        </>
      ) : (
        <h3>loading ...</h3>
      )}
      <h2>isMinted: {isMinted ? "Yes" : "No"}</h2>
      <h2>{id}</h2>
    </div>
  );
};

export default CollectibleView;
