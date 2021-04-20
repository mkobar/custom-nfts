// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleContract is ERC721URIStorage {
      constructor() ERC721("simple", "SC") {
    }
    using Counters for Counters.Counter;
        Counters.Counter private _tokenIds;
    uint[] public tokens;

// ADD string memory metadata
    function mint(string memory metadata) public payable returns (uint256) { //address recipient
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadata);
        tokens.push(newItemId);
        return newItemId;
    }
}