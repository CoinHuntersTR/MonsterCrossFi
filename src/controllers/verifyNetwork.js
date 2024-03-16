export const verifyNetwork = async () => {

    // Sepolia Network Verifying
    const crossfiID = await '0x103D';
    const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
    
    if (chainId === crossfiID){
        console.log("Bravo!, you are on the correct network")
        
    } else {
  
        console.log("oulalal, switch to the correct network");
        
        try {
        
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: crossfiID}],
            });
            console.log("You have succefully switched to CrossFi Testnet")
        
        } catch (switchError) {
            
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                console.log("This network is not available in your metamask, please add it")

                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                        { chainId: '0x103D', 
                        chainName:'CrossFi Testnet Chain',
                        rpcUrls:['https://rpc.testnet.ms'],
                        nativeCurrency: {
                        symbol:'XFI', // 2-6 characters long
                    decimals: 18
                    }
                        
                        }],
                    });
                    } catch (addError) {
                        // handle "add" error
                        console.log(addError);
                    }
            }
        }
    }
};