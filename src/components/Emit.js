import React, { Component }  from 'react';
import List from "./List";
//import {connect} from "react-redux";

import { ReactComponent as High } from '../public/High.svg';
import { ReactComponent as Medium } from '../public/Medium.svg';
import { ReactComponent as Low } from '../public/Low.svg';
import axios from 'axios';
import ModalTask from './ModalTask.js';
import {Client, Identity, KeyInfo, ThreadID } from '@textile/hub';
import { Database, Collection, JSONSchema } from '@textile/threads-database';
import { collect } from 'streaming-iterables';
import { ReactComponent as Trash } from '../public/Trash.svg';

class Emit extends Component {
    constructor(props) {
        super(props);
    }

    handleDel = async(event) => {
        const all = this.props.tasks.find({name: 'Parul' });
        for (const task of await collect(all)) {
            //let test_key = task.key.toString();
            //console.log("test_key: ", test_key);
            if( task.value.title === this.props.title) {
                await this.props.tasks.delete(task.value._id);
                this.props.emitter();
                
            }
        
      }
    }

    render() {
        return (<button onClick={this.handleDel}>
            <Trash/>
            </button>)
        
    }
}

export default Emit;