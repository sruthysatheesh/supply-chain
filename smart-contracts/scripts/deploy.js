const fs = require("fs");
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with:", await deployer.getAddress());

  const FarmerRegistry = await hre.ethers.getContractFactory("FarmerRegistry");
  const contract = await FarmerRegistry.deploy();

  await contract.waitForDeployment();

  console.log("Contract deployed to:", contract.target);

  fs.writeFileSync("address/contractAddress.txt", contract.target);

  const artifact = await hre.artifacts.readArtifact("FarmerRegistry");
  fs.writeFileSync("abi/abi.json", JSON.stringify(artifact, null, 2));
}


main().catch((error) => {
  console.error("Error deploying:", error);
  process.exit(1);
});
