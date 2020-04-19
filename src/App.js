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
      }
    }

    async componentDidMount() {
      // const accounts = await web3.eth.getAccounts();
      // console.log(web3);
      // console.log(accounts);

      /** when working to metamask provider, don't have to set the "from" property **/
      const manager = await lottery.methods.manager().call();
      this.setState({ manager });
    }

    render() {
        return (
            <div className="App">
              <h1>Lottery Contract</h1>
              <p>this contract is managed by: <strong>{this.state.manager}</strong></p>
            </div>
        );
    }

}

export default App;
