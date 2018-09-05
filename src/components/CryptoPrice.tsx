import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as React from "react";


interface IState {
    imageFiles: any[],
    results: any,
    items: any[]
    isLoaded: boolean
  }

export default class CryptoPrice extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
      
        this.state = {
          items: [],
          imageFiles: [],
          results: "",
          isLoaded: false,
        };
      }


      public componentDidMount(){
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`)
           .then(result=>result.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      })
    }


    public addList(num:number) {
        const name = this.state.items[num].id;
        const rank = this.state.items[num].market_cap_rank;
        const price = this.state.items[num].current_price;
        const imageLink = this.state.items[num].image;
        const volume = this.state.items[num].total_volume;
        const supply = this.state.items[num].circulating_supply;
        const priceChange = this.state.items[num].price_change_24h;

        return (
            <div>
            <ListItem>
                
                <img className="coinIcon" src={imageLink} alt={"image not available"}/>
                <Grid container={true} spacing={8}>
                    <Grid item={true} xs={2} className="centreText">
                        <p>
                            <h3><b>
                                {name}<br/>
                            </b></h3>
                            #{rank}<br/>
                        </p>
                    </Grid>
                    <Grid item={true} xs={2} className="centreText">
                        <p>
                            <h3><b>
                                Price_USD<br/>
                            </b></h3>
                            {price}<br/>
                        </p>
                    </Grid>
                    <Grid item={true} xs={2} className="centreText">
                        <p>
                            <h3><b>
                                Volume<br/>
                            </b></h3>
                            {volume}<br/>
                        </p>
                    </Grid>
                    <Grid item={true} xs={2} className="centreText">
                        <p>
                            <h3><b>
                                Circulating Supply<br/>
                            </b></h3>
                            {supply}<br/>
                        </p>
                    </Grid>
                    <Grid item={true} xs={2} className="centreText">
                        <p>
                            <h3><b>
                                Change(24)<br/>
                            </b></h3>
                            {priceChange}<br/>
                        </p>
                    </Grid>
                </Grid>


              </ListItem>
              <li>
                <Divider inset={true} />
              </li>
              <Divider inset={true} component="li" />
            </div>
        );
    }


    public loopInfo(){
        let j = "";
        for (let i = 0; i < 100; i++) {
            j += this.addList(i);
        }
        return j;
    }



    public InsetDividers() {
        const item = [];
        for (let i = 0; i < 100; i++){
            item.push(this.addList(i))
        }
        return (
          <div>
              <Grid container={true} >
                    <Grid item={true} xs={2} className="centreText">
                        <p>
                            <h3><b>
                                Search<br/>
                            </b></h3>
                            bar<br/>
                        </p>
                    </Grid>
                    <Grid item={true} xs={9} className="centreText">
                        <List>
                            {item}
                        <li>
                            <Divider inset={true} />
                        </li>
                        </List>
                    </Grid>
                </Grid>
          </div>
        );
      }






    public render() {

        const { isLoaded } = this.state;

        if(!isLoaded) {
            return <div>Loading...</div>
        }

        else {
            return (
                <div className="centreText">
                <div>
                    {this.InsetDividers()}
                </div>
                </div>

            );
        }
    }


    /*  <ul>
      {items.map(item => (
      <li key={item.id}>
          Name:{item.id} | Rank: {item.market_cap_rank}
      </li>
      ))};

  </ul>*/
}