import { expect } from "chai";
import { ethers } from "hardhat";

// A helper utility to get the timestamp.
import { time } from "@nomicfoundation/hardhat-network-helpers";

// We import this type to have our signers typed.
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

// Types from typechain
import { Lock__factory, Lock } from "../typechain-types";

describe("Lock", function () {
  // This represents the time in the future we expect to release the funds locked.
  const UNLOCK_TIME = 10000;

  // The amount of ether we plan to lock.
  const VALUE_LOCKED = ethers.parseEther("0.01");

  // This variable will store the last block timestamp.
  let lastBlockTimeStamp: number;

  // Typechain allow us to type an instance of the Lock contract.
  let lockInstance: Lock;

  // This is the Signer of the owner.
  let ownerSigner: SignerWithAddress;

  // A non owner signed useful to test non owner transactions.
  let otherUserSigner: SignerWithAddress;

  before(async () => {
    // We get the latest block.timestamp using the latest function of time.
    lastBlockTimeStamp = await time.latest();

    // Hardhat provide us with some sample signers that simulate Ethereum accounts.
    const signers = await ethers.getSigners();

    // We simply assign the first signer to ownerSigner
    ownerSigner = signers[0];

    // We assign the second signer to otherUserSigner
    otherUserSigner = signers[1];

    await deployments.fixture(["DeployAll"]);
    const lockDeployment = await deployments.get("Lock");

    lockInstance = Lock__factory.connect(lockDeployment.address, ownerSigner);
  });
});
