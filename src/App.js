import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

    constructor(props) {
      super(props);

      this.onSubmit = this.onSubmit.bind(this);
      this.state = {
        manager: '',
        players: [],
        contractBalance: '', /** balance is the big-number, initialize with empty string **/
        value: ''
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

      const managerBalance = await web3.eth.getBalance(manager);
      console.log(web3.utils.fromWei(managerBalance, 'ether'));

      this.setState({ manager, players, contractBalance });
    }

    async onSubmit(e) {
        e.preventDefault();

        /** send methods have to manually specify the "from" property **/
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.enter().send({
          from: accounts[0], // assume that first account is the one going send the transaction
          value: web3.toWei(this.state.value, 'ether')
        })
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

              <hr/>

              <form onSubmit={this.onSubmit}>
                <h4>Want to try your luck ?</h4>
                <div>
                  <label>Amount of ether to enter</label>
                  <input  value={this.state.value} onChange={e => this.setState({ value: e.target.value })}/>
                </div>
                <button>Enter</button>
              </form>

            </div>
        );
    }

}

export default App;
