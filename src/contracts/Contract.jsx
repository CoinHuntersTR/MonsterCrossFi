import { ethers } from "ethers";
import {RAFFLE_ADDRESS} from "../constants/address.js";
import {RAFFLE_ABI} from "../constants/abi.js";

export const Contract = () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(RAFFLE_ADDRESS, RAFFLE_ABI, signer);
    return contract;
}