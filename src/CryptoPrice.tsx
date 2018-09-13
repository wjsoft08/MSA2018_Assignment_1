import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as React from "react";


interface IState {
    imageFiles: any[],
    results: any,
    items: any[]
    isLoaded: boolean,
    inputLoaded: boolean,
    inputResult: any,
    inputItem: any,
    inputText: any
}

export default class CryptoPrice extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            items: [],
            imageFiles: [],
            results: "",
            isLoaded: false,
            inputResult: "",
            inputItem: [],
            inputText: 'Enter',
            inputLoaded: false
        };

        this.handleInput = this.handleInput.bind(this);
    }


    public componentDidMount() {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc`)
            .then(result => result.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            })
    }


    public addList(num: number) {
        const name = this.state.items[num].id;
        const rank = this.state.items[num].market_cap_rank;
        const price = this.state.items[num].current_price;
        const imageLink = this.state.items[num].image;
        const volume = this.state.items[num].total_volume;
        const supply = this.state.items[num].circulating_supply;
        const priceChange = this.state.items[num].price_change_percentage_24h;

        return (
            <div>
                <ListItem>

                    <img className="coinIcon" src={imageLink} alt={"image not available"} />
                    <Grid container={true} spacing={8}>
                        <Grid item={true} xs={2} className="centreText">
                            <p>
                                <h3><b>
                                    {name}<br />
                                </b></h3>
                                #{rank}<br />
                            </p>
                        </Grid>
                        <Grid item={true} xs={2} className="centreText">
                            <p>
                                <h3><b>
                                    Price_USD<br />
                                </b></h3>
                                {price}<br />
                            </p>
                        </Grid>
                        <Grid item={true} xs={2} className="centreText">
                            <p>
                                <h3><b>
                                    Volume<br />
                                </b></h3>
                                {volume}<br />
                            </p>
                        </Grid>
                        <Grid item={true} xs={2} className="centreText">
                            <p>
                                <h3><b>
                                    Circulating Supply<br />
                                </b></h3>
                                {supply}<br />
                            </p>
                        </Grid>
                        <Grid item={true} xs={2} className="centreText">
                            <p>
                                <h3><b>
                                    Change(24h)%<br />
                                </b></h3>
                                {priceChange}<br />
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


    public handleInput(event: any) {
        if (event.key === 'Enter') {
            fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=` + event.target.value)
                .then(result => result.json())
                .then(json => {
                    this.setState({
                        inputLoaded: true,
                        inputItem: json,
                    })
                })

            const { inputLoaded } = this.state;
            if (inputLoaded) {
                this.render();
            }
        }
    }

    public makeSearchResult() {
        const { inputLoaded } = this.state;

        if (!inputLoaded) {
            return (
                <div>
                    <br />
                </div>
            )
        } else {
            if (this.state.inputItem.length === 0 ) {
                return (
                    <div>
                        Results Could Not Be Found<br />
                    </div>
                )
            } else {
                const name = this.state.inputItem[0].id;
                const rank = this.state.inputItem[0].market_cap_rank;
                const marketCap = this.state.inputItem[0].market_cap;
                const price = this.state.inputItem[0].current_price;
                const priceHi = this.state.inputItem[0].high_24h;
                const priceLow = this.state.inputItem[0].low_24h;
                const imageLink = this.state.inputItem[0].image;
                const volume = this.state.inputItem[0].total_volume;
                const supply = this.state.inputItem[0].circulating_supply;
                const priceChangePercentagae = this.state.inputItem[0].price_change_percentage_24h;
                const priceChange = this.state.inputItem[0].price_change_24h;
                return (
                    <div>
                        <List>
                            <p>
                                <img className="coinIcon" src={imageLink} alt={"image not available"} />
                                <h3><b>
                                    #{rank}<br />
                                </b></h3>
                                <h3><b>
                                    {name}<br />
                                </b></h3>
                                Price_USD: {price}<br />
                                Market Cap: {marketCap}<br />
                                High_24h: {priceHi}<br />
                                Low_24h: {priceLow}<br />
                                Volume_24h: {volume}<br />
                                Supply: {supply}<br />
                                Change(24h)%: {priceChangePercentagae}<br />
                                Change(24h): {priceChange}<br />
                            </p>
                        </List>
                    </div>
                )
            }
        }
    }

    public InsetDividers() {
        const item = [];
        for (let i = 0; i < 100; i++) {
            item.push(this.addList(i))
        }
        return (
            <div>
                <Grid container={true} >
                    <Grid item={true} xs={2} className="centreText">
                        <p>
                            <h3><b>
                                Search<br />
                            </b></h3>
                            <input onKeyPress={this.handleInput} />
                            <br />
                            {this.makeSearchResult()}
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

        if (!isLoaded) {
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

}