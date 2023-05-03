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
    // let MintButton =  
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
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={() => {
                window.location.href = "https://unisat.io";
              }}
            >
              Download Unisat Wallet
            </button>
          </div>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <a
              className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
              href="https://www.theopendao.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className='italic'>
                Powered By{' '}
              </p>
              <Image
                src="/opendao.svg"
                alt="Opendao Logo"
                className="dark:invert"
                width={24}
                height={24}
                priority
              />
            </a>
          </div>
        </div>
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
          <a href="https://twitter.com/BRC20_DAO" target='_blank'>
            <h1 className='mb-5 text-3xl md:text-5xl font-semibold'>
              BRC-20 Deneutralization DAO
            </h1>
          </a>
        </div>

        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              TOKEN
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Majo is a brc-20 token used in the BRC-20 DAO Ecosystem.
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
              BRC-20 DAO swap can bridge any brc-20 to trade on the dex, which also includes an AMM if any whales or founders want to LP.
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
              Pass Holders will have access to WL for new projects in the launchpad that will be created in the future.
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
              BRC-20 DAO will build a Bitcoin layer for smart contracts;it enables smart contracts and  decentralized applications to trustlessly use Bitcoin as an asset and settle transactions on the Bitcoin blockchain.
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
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-start justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {connected ? (
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              {address.slice(0, 3)}........{address.slice(-3)}
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
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.theopendao.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className='italic'>
              Powered By{' '}
            </p>
            <Image
              src="/opendao.svg"
              alt="Opendao Logo"
              className="dark:invert"
              width={24}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <a href="https://twitter.com/BRC20_DAO" target='_blank'>
          <h1 className='mb-5 text-3xl md:text-5xl font-semibold'>
            $Majo Mint
          </h1>
        </a>
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
            <SendBitcoin  />
          </div>
        ) : (
          <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-1 lg:text-left">
            <div
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
            >
              <h2 className={`mb-3 text-2xl italic`}>
                Total supply: 21,000,000
              </h2>
              <h2 className={`mb-3 text-2xl italic`}>
                - Airdrop: 50%
              </h2>
              <h2 className={`mb-3 text-2xl italic`}>
                - WL Mint: 21%
              </h2>
              <h2 className={`mb-3 text-2xl italic`}>
                - DAO Treasury: 18%
              </h2>
              <h2 className={`mb-3 text-2xl italic`}>
                - Technical Contributor: 5%
              </h2>
              <h2 className={`mb-3 text-2xl italic`}>
                - Marketing: 6%
              </h2>
            </div>
          </div>
        )}
      </div>
    </main >
  )
}


function SendBitcoin() {
  const [toAddress, setToAddress] = useState(
    "bc1pr9hndc9ry890sv0tcgr5yrvvqc83dh05gy92nj63j9ganw9pkaasd2zs56"
  );
  const [satoshis, setSatoshis] = useState(100000)
  const [txid, setTxid] = useState("");
  const [spanValue, setSpanValue] = useState('0.001 BTC')
  const [userAddress,setUserAddress]=useState("")
  const [enableButton,setEnableButton] = useState(true)
  const render = new FileReader()

  const [addressArray,setAddressArray] = useState<string[]>([])
  let selectValue;
  let doller;
  useEffect(()=>{
    fetch('/add.txt')
    .then((res)=>res.text())
    .then((data)=>{
      let my_arr =data.split(/[(\r\n)\r\n]+/)
      setAddressArray(my_arr)
    })
  },[])
 
  const getBaseInfo = async () => {
    const unisat = (window as any).unisat;
    const [userAddress] = await unisat.getAccounts();
    const userAdl=addressArray.filter((object)=>{
      return object===userAddress
     })
     if(userAdl.length&&userAdl.length>0){
      setEnableButton(true)
     }else{
      setEnableButton(false)
     }
   }

   getBaseInfo()
   
   
  
  function selectOnchange(event: any) {
    doller = Number(event.target.value) * 20
    selectValue = Number(event.target.value) * 0.001
    setSpanValue(selectValue + '  BTC')
    setSatoshis(Number(selectValue) * 100000000)

  }
  return (
    <div >
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Mint Fee (10000 $Majo)
            </label>
            <input readOnly className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 focus:outline-none rounded py-3 px-4 mb-3 leading-tight" type="text" placeholder='0.01 BTC' />
          </div>
        </div>
        {/* <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Repeat Mint (max 10 per address)
            </label>
            <div className="relative">
              <select id='selectNum' onChange={selectOnchange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none  focus:border-gray-500" >
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
        </div> */}
        {/* <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              Total Mint Fee (BTC)
            </label>
            <input readOnly value={spanValue} className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:outline-none border-gray-200 rounded py-3 px-4 mb-3 leading-tight" type="text" />
          </div>
        </div> */}
      </form>
      <div>
        {enableButton?(<button 
           
           className="bg-white hover:bg-gray-100 text-gray-2200 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={async () => {
            try {
              const txid = await (window as any).unisat.sendBitcoin(
                toAddress,
                1000000
                // satoshis
              );
              setTxid(txid);
            } catch (e) {
              setTxid((e as any).message);
            }
          }}
        >
          Mint
        </button>):(<button disabled 
           className="bg-white disabled:opacity-25 hover:bg-gray-100 text-gray-2200 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          You are not Whitetlist
        </button>)}
        

      </div>

    </div>
  );
}
