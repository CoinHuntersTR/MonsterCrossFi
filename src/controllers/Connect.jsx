import { useState } from "react";
import {verifyNetwork} from "./verifyNetwork.js";
import { ethers } from "ethers";

function Connect({sendProvider, sendWallet}) {

    const [account, setAccount] = useState("")
    const [menuBarActive, setMenuBarActive] = useState(false) 

    async function connect() {

        if (!window.ethereum) {
            window.alert("Install Metamask")
            if(confirm("Metamask Download")) document.location = 'https://metamask.io/download/';
        }
        await verifyNetwork();
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []).then((accounts) => {
            let first = accounts[0].slice(0, 5)
            let last = accounts[0].slice(-5)
            setAccount(first + "..." + last);
        }).catch((err) => {console.log(err)})
        const signer = await provider.getSigner();
        sendProvider(provider)
        const walletAddress = await signer.getAddress();
        sendWallet(walletAddress);
    }

    function myFunction() {
        if(menuBarActive == false) {
            setMenuBarActive(true)
        } else {
            setMenuBarActive(false)
        }
    }

    return ( 
        <div>
            <section className="bg-gray-900 w-full">
                <header id="header" className="py-4 lg:py-6 text-lighty font-gabriela">
                    <div className="container flex justify-between space-x-4 lg:space-x-16 items-start">
                        <a href="/" className="flex flex-col items-center lg:ml-4">
                            <p className="text-2xl lg:text-3xl font-bold tracking-widest text-transparent bg-gradient-to-r bg-clip-text from-blue-800 to-gray-200">F*CK BEAR</p>
                        </a>
                        <div className="block md:hidden pr-4 text-white">
                            <div id="menubutton" className="containerSec" onClick={myFunction}>
                                <div className="bar1"></div>
                                <div className="bar2"></div>
                                <div className="bar3"></div>
                            </div>
                        </div>
                        <nav className="hidden md:flex lg:flex justify-between flex-1 pl-10">
                            <div className="flex items-center lg:text-md space-x-2 lg:space-x-8 drop-shadow-xl text-white">
                                <a href="https://crossfi.org/" target="_blank" className="hover:text-blue-500 transition duration-500 tracking-widest"><i className="fa-brands fa-hive"></i> CrossFi</a>
                                <a href="https://testnet-faucet-nft.vercel.app/" target="_blank" className="hover:text-white transition duration-500 tracking-widest text-blue-500"><i className="fa-solid fa-faucet"></i> Faucet</a>
                                <a href="https://crossfi-nft-raffle.vercel.app/" target="_blank" className="hover:text-white transition duration-500 tracking-widest text-yellow-500"><i className="fa-solid fa-clover"></i> NFT RAFFLE APP</a>
                                <a href="#contact" className="hover:text-blue-500 transition duration-500 tracking-widest">Contact</a>
                            </div>
                            <p className="text-white"></p>
                            <div className="pr-4">
                                <div className="text-center hover:text-gega-melon transition duration-500 tracking-widest rounded-lg border-2 border-white px-1 py-1">
                                    <button className="text-white hover:text-yellow-500 transition duration-500 font-bold" onClick={ () => {
                                        if (account) return; 
                                        connect() }}>
                                        {account ? account 
                                        : "Connect Wallet"}
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div> 
                    <header id="menubar" className={`${menuBarActive ? "text-white font-gemunu uppercase change pt-2" : "text-white font-gemunu uppercase hidden pt-2"}`}>
                        <nav className="">
                            <div className="flex flex-col items-end space-y-1 pr-2">
                                <a href="https://crossfi.org" target="_blank" className="hover:text-yellow-500 transition duration-500 tracking-widest"><i className="fa-brands fa-hive"></i> CrossFi</a>
                                <a href="https://testnet-faucet-nft.vercel.app/" target="_blank" className="hover:text-yellow-500 transition duration-500 tracking-widest"><i className="fa-solid fa-faucet"></i> Faucet</a>
                                <a href="https://crossfi-nft-raffle.vercel.app/" target="_blank" className="hover:text-yellow-500 transition duration-500 tracking-widest"><i className="fa-solid fa-clover"></i> NFT Raffle App</a>
                                <a href="#contact" className="hover:text-blue-500 transition duration-500 tracking-widest">Contact</a>
                                <button className="hover:text-gega-melon transition duration-500 tracking-widest rounded-lg border-2 border-white px-1 py-1" onClick={ () => {
                                    if (account) return; 
                                    connect() }}>
                                    {account ? account : "Connect Wallet"}
                                </button>
                            </div>
                        </nav>
                    </header>
                </header>
            </section>

        </div> 
     );
}

export default Connect; 