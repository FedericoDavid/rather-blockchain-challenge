import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { BrowserProvider, JsonRpcSigner, ethers } from "ethers";

export const Web3Context = createContext({
  provider: null as BrowserProvider | null,
  signer: null as JsonRpcSigner | null,
  address: null as string | null,
  isConnected: false,
  connectWallet: async () => {},
  disconnect: () => {},
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState(null as BrowserProvider | null);
  const [signer, setSigner] = useState(null as JsonRpcSigner | null);
  const [address, setAddress] = useState(null as string | null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const ethersSigner = await ethersProvider.getSigner();
      const gotAddress = await ethersSigner.getAddress();

      setProvider(ethersProvider);
      setSigner(ethersSigner);
      setAddress(gotAddress);
      setIsConnected(true);
      localStorage.setItem("isConnected", "true");
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem("isConnected");
  };

  useEffect(() => {
    if (localStorage.getItem("isConnected")) connectWallet();

    window.ethereum?.on("accountsChanged", (accounts: any) => {
      if (accounts.length > 0) {
        connectWallet();
      } else {
        disconnect();
      }
    });

    window.ethereum?.on("chainChanged", () => {
      window.location.reload();
    });

    return () => {
      window.ethereum?.removeAllListeners();
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        address,
        isConnected,
        connectWallet,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
