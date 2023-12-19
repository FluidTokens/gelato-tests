import React, { useEffect } from 'react';
import { ethers } from 'ethers';  // Add this line
import { GelatoRelay } from "@gelatonetwork/relay-sdk"

const App = () => {
  useEffect(() => {
    const executeRelay = async () => {
      // Import GelatoRelay and SponsoredCallRequest
      const relay = new GelatoRelay();

      // Set up target address and function signature ABI
      const counter = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
      const abi = [
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "name": "",
              "type": "uint8"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "balance",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            },
            {
              "name": "_spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "name": "remaining",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "payable": true,
          "stateMutability": "payable",
          "type": "fallback"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "_owner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "_spender",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_spender",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_from",
              "type": "address"
            },
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_value",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]


      // Generate payload using front-end provider such as MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      console.log(signer)
      const user = await signer.getAddress();
      const contract = new ethers.Contract(counter, abi, signer);
      console.log(contract)
      const { data } = await contract.populateTransaction.transfer("0xa2C21Ee4DEeF3C7718Dde842D34be2Dc5F651e6F", 100000);
      //console.log(contract.interface)
      //const {data} =await contract.interface.encodeFunctionData('transfer', ["0xa2C21Ee4DEeF3C7718Dde842D34be2Dc5F651e6F", 10000000])
      console.log(data)
      const feeToken = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      // Populate a relay request
      let request = {
        chainId: (await provider.getNetwork()).chainId,
        target: counter,
        feeToken: feeToken,
        data: data,
        user: user,
      };

      console.log(request)
      // Replace 'YOUR_API_KEY' with your actual Gelato Relay API key
      const apiKey = 'skyNU1tSw0pTAhbRrE0M26LpDPDGdmET7Fops63Dm54_';

      // Send the relay request using Gelato Relay
      const relayResponse = await relay.callWithSyncFee(request, apiKey);

      console.log('Relay Response:', relayResponse);
    };

    // Make sure the Ethereum provider is available
    if (window.ethereum) {
      window.ethereum.enable().then(executeRelay);
    } else {
      console.error(
        'Please install MetaMask or another Ethereum provider extension.'
      );
    }
  }, []);

  return (
    <div>
      <h1>Gelato Relay Example</h1>
      {/* Add any additional components or UI elements here */}
    </div>
  );
};

export default App;
