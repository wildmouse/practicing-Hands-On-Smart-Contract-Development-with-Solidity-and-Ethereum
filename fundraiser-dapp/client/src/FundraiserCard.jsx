import React, {useEffect, useState} from "react"
import makeStyles from "@material-ui/core/styles/makeStyles";
import Web3 from "web3";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FundraiserContract from "./contracts/Fundraiser"

const useStyles = makeStyles({
  card: {
    maxWidth: 450,
    height: 400
  },
  media: {
    height: 140
  }
})

const FundraiserCard = ({ fundraiser }) => {
  const classes = useStyles();
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState(null)
  const [fundName, setFundname] = useState(null)
  const [description, setDescription] = useState(null)
  const [totalDonations, setTotalDonations] = useState(null)
  const [donationCount, setDonationCount] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [url, setURL] = useState(null)

  useEffect(() => {
    if (fundraiser) {
      init(fundraiser)
    }
  }, [fundraiser])

  const init = async (fundraiser) => {
    try {
      console.log(web3)
      const fund = fundraiser;
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract( FundraiserContract.abi, fund )
      setContract(instance);
      setAccounts(accounts);

      const name = await instance.methods.name().call()
      const description = await instance.methods.description().call()
      const totalDonations = await instance.methods.totalDonations().call()
      const imageURL = await instance.methods.imageURL().call()
      const url = await instance.methods.url().call()

      setFundname(name)
      setDescription(description)
      setImageURL(imageURL)
      setTotalDonations(totalDonations)
      setURL(url)
    } catch(err) {
      alert("Failed to load web3, accounts, or contract. Check console for details.")
      console.log(err) ;
    }
  }

  return (
    <div className="fundraiser-card-container">
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imageURL}
            title="Fundraiser Image"
          />
          <CardContent>
            <Typography gutterButtom variant="h5" component="h2">
              {fundName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <p>{description}</p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View More
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default FundraiserCard;
