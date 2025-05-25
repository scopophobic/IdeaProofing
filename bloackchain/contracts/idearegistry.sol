// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdeaRegistry {
    struct Idea {
        string ipfsHash;
        address creator;
        uint timestamp;
    }

    Idea[] public ideas;

    function registerIdea(string memory ipfsHash) public {
        ideas.push(Idea(ipfsHash, msg.sender, block.timestamp));
    }

    function getIdea(uint index) public view returns (string memory, address, uint) {
        Idea memory idea = ideas[index];
        return (idea.ipfsHash, idea.creator, idea.timestamp);
    }

    function getIdeaCount() public view returns (uint) {
        return ideas.length;
    }
}
