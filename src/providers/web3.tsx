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
  isGoerli: false,
  connectWallet: async () => {},
  disconnect: () => {},
  switchToGoerli: async () => {},
});

export const useWeb3 = () => useContext(Web3Context);

const getEthersProvider = () => {
  if (typeof window.ethereum !== "undefined") {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isGoerli, setIsGoerli] = useState<boolean>(false);
  const [provider, setProvider] = useState(null as BrowserProvider | null);
  const [signer, setSigner] = useState(null as JsonRpcSigner | null);
  const [address, setAddress] = useState(null as string | null);

  const connectWallet = async () => {
    const ethersProvider = getEthersProvider();
    if (ethersProvider) {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const ethersSigner = await ethersProvider.getSigner();
      const gotAddress = await ethersSigner.getAddress();

      setProvider(ethersProvider);
      setSigner(ethersSigner);
      setAddress(gotAddress);
      setIsConnected(true);

      localStorage.setItem("isConnected", "true");

      await checkNetwork();
    }
  };

  const disconnect = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setIsConnected(false);
    localStorage.removeItem("isConnected");
  };

  const checkNetwork = async () => {
    const ethersProvider = getEthersProvider();

    if (ethersProvider) {
      const network = await ethersProvider.getNetwork();
      setIsGoerli(Number(network.chainId) === 5);
    }
  };

  const switchToGoerli = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }],
    });
  };

  useEffect(() => {
    if (localStorage.getItem("isConnected")) connectWallet();

    window.ethereum?.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        connectWallet();
      } else {
        disconnect();
      }
    });

    window.ethereum?.on("chainChanged", () => window.location.reload());

    return () => window.ethereum?.removeAllListeners();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        address,
        isConnected,
        isGoerli,
        connectWallet,
        disconnect,
        switchToGoerli,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};