import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';

class App extends Component {


    async componentDidMount() {
      const accounts = await web3.eth.getAccounts();
      console.log(web3);
      console.log(accounts);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }

}

export default App;
