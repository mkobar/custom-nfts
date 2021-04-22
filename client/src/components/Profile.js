import React from "react";
import { Link } from "react-router-dom";
function Profile({ account, tokens }) {
  return (
    <div>
      {account !== null ? <h1>Hello, {account[0]}</h1> : null}
      <h2>Here are your tokens</h2>
      {tokens.length !== 0 ? (
        tokens.map((token, index) => (
          <React.Fragment key={index}>
            <img key={index} width="15%" src={token.image} alt={token.image} />
            <h2 key={index}>{token.name}</h2>
            <p key={index}>{token.desc}</p>
          </React.Fragment>
        ))
      ) : (
        <p>
          Nothing Here! <Link to="/">Go get some</Link>
        </p>
      )}
    </div>
  );
}

export default Profile;

// import React from 'react'

// function Profile() {
//     return (
//         <div>

//         </div>
//     )
// }

// export default Profile;
