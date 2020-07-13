import React, { useEffect, useState} from "react";
import FactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom"
import NewFundraiser from "./NewFundraiser"
import Home from "./Home"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const App = () => {
  const [state, setState] = useState({ web3: null, accounts: null, contract: null});
  const [storageValue, setStorageValue] = useState(0);

  useEffect(() => {
    const init = async() => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        setState({ web3, accounts, contract: instance })
      } catch(err) {
        alert("Failed to load web3, accounts, or contract. Check console for details.");
        console.error(err);
      }
    }
    init()
  }, [])

  const useStyles = makeStyles({
    root: {
      fixGrow: 1
    }
  });

  const classes = useStyles();

  const runExample = async () => {
    const { accounts, contract } = state;
  }

  return (
    <Router>
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </Typography>
            <NavLink className="nav-link" to="/new/">New Fundraiser</NavLink>
          </Toolbar>
        </AppBar>

        <Route path="/" exact component={Home} />
        <Route path="/new/" exact component={NewFundraiser} />
      </div>
    </Router>
  )
}

export default App;
