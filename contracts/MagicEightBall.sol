// SPDX-License-Identifier: MIT

pragma solidity 0.8.2;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
import 'openzeppelin-solidity/contracts/utils/Counters.sol';
import 'openzeppelin-solidity/contracts/access/Ownable.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721URIStorage.sol';


contract MagicEightBall is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(uint => address) public tokenIndexToUsers;
    //mapping(uint => string) public questions;
    uint public mintPrice;
    address public ownerAddress;
    
    
    
    struct EightBall {
        address recipientAddress;
        uint tokenIndex;
        string question;
        string answer;
        string uri;
    }
    
    EightBall[] public eightballs;
    
    constructor() public ERC721("MagicEightBall", "M8B") {
        mintPrice = 10000000000000000;
    }

    
    function random() public view returns(uint){
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }
    
    function mintNFT(address recipient, string memory query, string memory predict, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenIndexToUsers[newItemId] = recipient;
        //questions[newItemId] = query;
        
        EightBall memory newEightBall = EightBall({
            recipientAddress:recipient,
            tokenIndex : newItemId,
            question : query,
            answer : predict,
            uri : tokenURI
        });
        eightballs.push(newEightBall);


        return newItemId;
    }
    function publiMint(string memory query, string memory predict, string memory specificUri) public payable returns (uint256){
        require(msg.value >= mintPrice);
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, specificUri);
        tokenIndexToUsers[newItemId] = msg.sender;
        //questions[newItemId] = query;
        EightBall memory newEightBall = EightBall({
            recipientAddress : msg.sender,
            tokenIndex : newItemId,
            question : query,
            answer : predict,
            uri : specificUri
        });
        eightballs.push(newEightBall);


        return newItemId;
    }

    function burnNft(uint tokenId) public returns(bool) {
        require(msg.sender == tokenIndexToUsers[tokenId]);
        _burn(tokenId);
        return true;
    }

    function getEightBalls() public view returns (EightBall[] memory){
        return eightballs;
    }
}