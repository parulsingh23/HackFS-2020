
import React, { Component }  from 'react';
//import './App.css';
import UserDashboard from "./UserDashboard.js";
import { SupervisorDashboard } from "./SupervisorDashboard.js"; 
/* import NavBar from "./NavBar.js"; */
import { Home } from "./Home.js"; 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navigation } from './Navigation.js';
import {Libp2pCryptoIdentity} from '@textile/threads-core';

import axios from 'axios';
const Box = require("3box");
class App extends Component {

  state = {
    title: '',
    description: '',
    identity: null,
    isloggedin: false
  }

  //below is from https://docs.textile.io/tutorials/hub/libp2p-identities/
  getIdentity = async () => {
    /**
     * Initialize the 3Box API uses Metamask
     * This will allow the user to sign their transactions
     * Using Metamask and 3Box directly
     */
    const box = await Box.create(window.ethereum);
    //const [address] = await window.ethereum.enable();
    //const [address] = await window.ethereum.eth_requestAccounts();
    const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' }) ;
    
    await box.auth([], { address });
    // Note: sometimes, openSpace returns early... caution
    const space = await box.openSpace('io-textile-dropzone');
    await box.syncDone;
    console.log('dState ', this.state);
    try {
      console.log('aState ', this.state);
        // We'll try to restore the private key if it's available
        var storedIdent = await space.private.get('identity');
        if (storedIdent === null) {
            throw new Error('No identity');
        }
        const _identity = await Libp2pCryptoIdentity.fromString(storedIdent);
        //return identity;
        this.setState({identity: _identity, isloggedin: true});

    }
    catch (e) {
      console.log('bState ', this.state);
        /**
         * If the stored identity wasn't found, create a new one.
         */
        const _identity = await Libp2pCryptoIdentity.fromRandom();
        const identityString = _identity.toString();
        await space.private.set('_identity', identityString);
        //return identity;
        this.setState({identity: _identity, isloggedin: true});
    }
    console.log('cState ', this.state);
};

 

  handleChange = ({target}) => {
    const { name, value } = target;
    /* const target = event.target;
    const name = target.name;
    const value = target.value; */

    this.setState({
      [name] : value
    });
  }

  

  

  

  
  render() {
    console.log('State ', this.state);
    
      return (
        <BrowserRouter>
          
          <div className="App-container">
            
            <Navigation />
            
            <Switch>
             
              {/* <Route path='/' component={Home} run={this.getIdentity.bind(this)}/> */}
              <Route path='/' render={() => <Home run={this.getIdentity.bind(this)}/>} exact/>
              <Route path='/UserDashboard' render={() => <UserDashboard identity={this.state.identity}/>} />
              <Route path='/SupervisorDashboard' render={() => <SupervisorDashboard identity={this.state.identity}/>} />
            
            </Switch>
  
            
            
          </div>
          {/* <button onClick={this.getIdentity}>Login</button> */}
          </BrowserRouter>
      )
    
    
  }

}

/* function App() {
  
  return (

    <div className="App">
      const {lists} = this.props;
      <h2>Hello</h2>
      <List title="Test"/>
      { lists.map(list => <List title={list.title} cards={list.cards}/> )}
    <High/>
    <Medium/>
    <Low />
    

    </div>
  );
} */


export default App;
