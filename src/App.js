import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        manager: '',
        players: [],
        contractBalance: '', /** balance is the big-number, initialize with empty string **/
      }
    }

    async componentDidMount() {
      // const accounts = await web3.eth.getAccounts();
      // console.log(web3);
      // console.log(accounts);

      /** when working to metamask provider, don't have to set the "from" property **/
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const contractBalance = await web3.eth.getBalance(lottery.options.address);

      console.log(players, contractBalance);

      this.setState({ manager, players, contractBalance });
    }

    render() {
        return (
            <div className="App">
              <h1>Lottery Contract</h1>
              <p>This contract is managed by: <strong>{this.state.manager}</strong></p>
              <p>
                There are currently {this.state.players.length} people entered,<br/>
                competing to win {web3.utils.fromWei(this.state.contractBalance, 'ether')} ether!
              </p>
            </div>
        );
    }

}

export default App;
