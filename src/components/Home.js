import React, {Component} from 'react';
import {Libp2pCryptoIdentity} from '@textile/threads-core';
import axios from 'axios';
import './Home.css';
const Box = require("3box");

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <body className="Body">
            <div className="Manual mt-5 d-flex justify-content-left">
                <h3>Welcome to the Blockchain version of kanban</h3>
                <h5 className="part">Bringing a More <em>Secure</em>, <em>Trustworthy</em>, and <em>Acessible</em> Task Management Tool to Optimize Productivity</h5>
                <button onClick={this.props.run} className="button1">Login</button>
                
            </div>
            </body>
        )
    }
}