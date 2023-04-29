import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [mintNum, setmintNum] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("livenet");

  const getBasicInfo = async () => {
    const unisat = (window as any).unisat;
    const [address] = await unisat.getAccounts();
    setAddress(address);

    const publicKey = await unisat.getPublicKey();
    setPublicKey(publicKey);

    const balance = await unisat.getBalance();
    setBalance(balance);

    const network = await unisat.getNetwork();
    setNetwork(network);
  };

  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  });
  const self = selfRef.current;
  const handleAccountsChanged = (_accounts: string[]) => {
    if (self.accounts[0] === _accounts[0]) {
      // prevent from triggering twice
      return;
    }
    self.accounts = _accounts;
    if (_accounts.length > 0) {
      setAccounts(_accounts);
      setConnected(true);

      setAddress(_accounts[0]);

      getBasicInfo();
    } else {
      setConnected(false);
    }
  };

  const handleNetworkChanged = (network: string) => {
    setNetwork(network);
    getBasicInfo();
  };

  useEffect(() => {
    const unisat = (window as any).unisat;
    if (unisat) {
      setUnisatInstalled(true);
    } else {
      return;
    }
    unisat.getAccounts().then((accounts: string[]) => {
      handleAccountsChanged(accounts);
    });

    unisat.on("accountsChanged", handleAccountsChanged);
    unisat.on("networkChanged", handleNetworkChanged);

    return () => {
      unisat.removeListener("accountsChanged", handleAccountsChanged);
      unisat.removeListener("networkChanged", handleNetworkChanged);
    };
  }, []);

  if (!unisatInstalled) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <a
            href="https://twitter.com/BRC20_DAO"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              The OpenDAO On Bitcoin
            </p>
          </a>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                window.location.href = "https://unisat.io";
              }}
            >
              Download Unisat Wallet
            </button>
          </div>
        </div>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <h1 className='mb-5 text-3xl md:text-5xl font-semibold'>
            BRC-20 Deneutralization DAO
          </h1>
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-5 lg:text-left">
          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              TOKEN
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              BCDE is a brc-20 token used in the BCDE DAO Ecosystem.
            </p>
          </a>

          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              PASS
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              BCDE Pass is a Pass Inscription awarded to the top 2100 BCDE Token purchasers.
            </p>
          </a>

          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              SWAP
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              BCDE DAO SWAP can bridge any brc-20 to trade on the DEX, which also includes an AMM if any whales or founders want to LP.
            </p>
          </a>

          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              LAUNCHPAD
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Pass Holders will have access to WL for new projects in the BCDE launchpad that will be created in the future.
            </p>
          </a>
          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              BTC L2
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              BCDE will build a Bitcoin layer for smart contracts;it enables smart contracts and  decentralized applications to trustlessly use Bitcoin as an asset and settle transactions on the Bitcoin blockchain.
            </p>
          </a>
        </div>

      </main >

    )
  }

  const unisat = (window as any).unisat;
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          The OpenDAO On Bitcoin
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {connected ? (
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              {address.slice(0, 2)}........{address.slice(-3)}
            </button>
          ) : (
            <div>
              <button
                onClick={async () => {
                  const result = await unisat.requestAccounts();
                  handleAccountsChanged(result);
                }}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Connect Unisat Wallet
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <h1 className='mb-5 text-3xl md:text-5xl font-semibold'>
          BRC-20 Deneutralization DAO
        </h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
        {connected ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SendBitcoin />
          </div>
        ) : (
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            <a
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              rel="noopener noreferrer"
            >
              <h2 className={`mb-3 text-2xl font-semibold`}>
                Mint Info
              </h2>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Total supply: 21,000,000
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                Ecosystem Rewards & Burn: 40%
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                OpenMint: 50%
              </p>
              <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                OG & Airdrop: 10%
              </p>
            </a>
          </div>
        )}
      </div>
    </main >
  )
}

function SendBitcoin() {
  const [toAddress, setToAddress] = useState(
    "bc1pp3jfrpxj9mfxaygse7df4kfx22r4ejlvntlsywj6nh005g45q00sn5wjde"
  );
  const [satoshis, setSatoshis] = useState(70000)
  const [txid, setTxid] = useState("");
  const [spanValue, setSpanValue] = useState('0.0007 BTC')
  let selectValue;
  let doller;
  function selectOnchange(event: any) {
    doller = Number(event.target.value) * 20
    selectValue = Number(event.target.value) * 0.0007
    setSpanValue(selectValue + '  BTC')
    setSatoshis(Number(selectValue) * 100000000)

  }
  return (
    <div >
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Mint Fee (BTC)
            </label>
            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder='0.0007 BTC' />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Repeat Mint
            </label>
            <div className="relative">
              <select id='selectNum' onChange={selectOnchange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Total Mint Fee (BTC)
            </label>
            <span >
              {spanValue}
            </span>
          </div>
        </div>
      </form>
      <div>
        <button className="bg-white hover:bg-gray-100 text-gray-2200 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={async () => {
            try {
              console.log(satoshis)
              const txid = await (window as any).unisat.sendBitcoin(
                toAddress,
                satoshis
              );
              setTxid(txid);
            } catch (e) {
              setTxid((e as any).message);
            }
          }}
        >
          Mint
        </button>

      </div>

    </div>
  );
}
