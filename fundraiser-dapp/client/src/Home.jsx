import React, {useState, useEffect} from "react";
import FactoryContract from "./contracts/FundraiserFactory"
import getWeb3 from "./getWeb3";
import FundraiserCard from "./FundraiserCard"

const Home = () => {
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    init()
  }, []);

  const init = async () => {
    try {
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      )
      setContract(instance);
      setAccounts(accounts)

      const funds = await instance.methods.fundraisers(10, 0).call();
      setFunds(funds);
    } catch (err) {
      alert("Failed to load web3, accounts, or contract. Check console for details.");
      console.error(err);
    }
  }

  const displayFundraisers = () =>
    funds.map((fundraiser) => <FundraiserCard fundraiser={fundraiser}/>)

  return (
    <div className="main-container">
      {displayFundraisers()}
    </div>
  )
}

export default Home;
