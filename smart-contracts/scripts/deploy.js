const fs = require("fs");
require("dotenv").config();
const { ethers, artifacts } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with:", deployer.address);

  const FarmerRegistry = await ethers.getContractFactory("FarmerRegistry");
  const contract = await FarmerRegistry.deploy();

  // This works in Hardhat and most EVMs
  await contract.waitForDeployment?.(); // if ethers v6

  console.log("Contract deployed to:", contract.target);

  fs.writeFileSync("address/contractAddress.txt", contract.target);

  const artifact = await hre.artifacts.readArtifact("contracts/FarmerRegistry.sol:FarmerRegistry");
  fs.writeFileSync("abi/abi.json", JSON.stringify(artifact, null, 2));
}

main().catch((error) => {
  console.error("Error deploying:", error);
  process.exit(1);
});
