// SPDX-License-Identifier: MIT

pragma solidity ^0.8.28;

contract FarmerRegistry{
    struct Farmer{
        string farmerId;
        string name;
        string product;
    }

    mapping(string => Farmer) public farmers;

    function addFarmer(string memory _id, string memory _name, string memory _product) public{
        farmers[_id] = Farmer(_id, _name, _product);
    }

    function getFarmer(string memory _id) public view returns(string memory, string memory){
        Farmer memory f = farmers[_id];
        return(f.name, f.product);
    }
}