import React, {Component} from 'react';
import List from "./List";

import { ReactComponent as High } from '../public/High.svg';
import { ReactComponent as Medium } from '../public/Medium.svg';
import { ReactComponent as Low } from '../public/Low.svg';
import axios from 'axios';
import ModalTask from './ModalTask.js';
import {Client, Identity, KeyInfo, ThreadID } from '@textile/hub';
import { Database, Collection, JSONSchema } from '@textile/threads-database';
import { collect } from 'streaming-iterables';

export class SupervisorDashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            lists :[],
            intervalIsSet: false,
            idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        wantapproval: [],
        active: [], 
        wantcheckoff: [],
        gotData: false
        }
    }

    keyinfo = {
        key: process.env.REACT_APP_USER_API_KEY,
        secret: process.env.REACT_APP_USER_API_SECRET
    };
  
    db = null;
  
    threadID = null;
  
    tasks=null;
    client=null;
  
    //a KeyInfo object above to connect to the API
    authorize = async() => {
        
        const client = await Client.withKeyInfo(this.keyinfo);
        await client.getToken(this.props.identity);
        this.client= client;
        console.log(client);
      }

      init = async() => {
        const _db = await Database.withKeyInfo(this.keyinfo, 'threads.tasks.demo');
            this.db= _db; 
          console.log(_db);
      }
      emitter = () => {

        this.db.emitter.on('**', async(update) => {
          console.log(update) // Logs the following updates...
          this.get_and_sep_Tasks();
          this.forceUpdate();
        })
        
      }
    
      //start Thread for Tasks
      startThread = async () => {
          const _threadID = ThreadID.fromRandom(); //added this myself to generate random threadID
          //Database.randomIdentity()
          await this.db.start(this.props.identity, {_threadID});
          this.threadID = _threadID;
          //await this.db.start(this.props.identity, {this.threadID});
          console.log(_threadID);
          //await db.start(identity, {threadID: threadID});
          //console.log(threadID);
        }

        getOrCreatecollection  = async() => {
            const {collections} = this.db;
            const existing = await collections.get('Tasks');
            this.tasks = existing;
            console.log(this.tasks);
            /* if (existing) {
                this.tasks = existing;
            } else {
                //const _Tasks = await this.db.newCollection('Task', this.taskSchema);
                const _Tasks = await this.db.newCollectionFromObject('Tasks', this.obj);
                this.tasks = _Tasks;
                console.log(_Tasks);
            } */
            
          }


          get_and_sep_Tasks = async() => {
            const all = this.tasks.find({ supervisor: 'Parul' });
            await this.setState( { wantapproval: [],
              active: [], 
              wantcheckoff: []});
            for (const task of await collect(all)) {
              console.log("keys: ", task.key.toString());
              if(task.value._type==='Requesting Approval') {
                this.setState( prevState => {return { wantapproval: prevState.wantapproval.concat(task)}});
              }
              if(task.value._type==='Active') {
                this.setState( prevState => {return { active: prevState.active.concat(task)}});
              }
              if(task.value._type==='Requested Checkoff') {
                this.setState( prevState => {return { wantcheckoff: prevState.wantcheckoff.concat(task)}});
              }
          
              this.setState({gotData: true});
          
              
            }
          
          }

    async componentDidMount() {
        await this.authorize();
        await this.init();
        await this.startThread();
        await this.getOrCreatecollection();
        await this.get_and_sep_Tasks();
      }

    
        

        render() {

            if(this.state.gotData === true) {
              return(
              <div className="UserDashboard">
                <div className="Manual mt-5 d-flex">Supervisor Dashboard</div>
                  <div className="UserDashboard-lists" style={this.styles.container} > 
                   <List title="Requesting Approval" cards={this.state.wantapproval} tasks={this.tasks} emitter={this.emitter.bind(this)}/>
                   <List title="Active" cards={this.state.active} tasks={this.tasks} emitter={this.emitter.bind(this)}/>
                   <List title="Requested Checkoff" cards={this.state.wantcheckoff} tasks={this.tasks} emitter={this.emitter.bind(this)}/>
                   
                   
                   {/* <Emit emitter={this.emitter.bind(this)} tasks={this.tasks}></Emit> */}
      {/*           { this.state.lists.map(list => (<List title={list.title} cards={list.cards}/> ))}
       */}          
                  </div>
              </div>)
            } else {
                return(<div className="Manual mt-5 d-flex justify-content-left UserDashboard">In the Process of Updating</div>
          )
            }
      
              /* return (
                <div className="UserDashboard">
                  <div className="UserDashboard-lists" style={styles.container}  > 
                 { this.state.lists.map(list => (<List title={list.title} cards={list.cards}/> ))}
               
                  </div>
                 <button onClick={() => this.putDataToDB('alpha', 'make breakfast', 'oatmeal', 'beta', '20 Jan 2020')}>Update </button> 
                <ModalTask {...this.state}/>
              <High/>
              <Medium/>
              <Low />
              <button onClick={this.getIdentity}>set identity</button>
              <button onClick={this.authorize}>authorize</button>
              <button onClick={this.init}>init</button>
              <button onClick={this.startThread}>startThread</button>
              <button onClick={this.collectionFromSchema}>collectionFromSchema</button>
              <button onClick={this.getOrCreatecollection}>getOrCreatecollection</button>
              <button onClick={this.put_example_date}>put_example_date</button>
              <button onClick={this.getTasks}>getTasks</button>
              <button onClick={this.createQuery}>createQuery</button>
              <button onClick={this.createQuery_2}>createQuery_2</button>
                </div>
              )
            } */
      }
      styles = {
        container: {
          display: "flex",
          flexDirection: "row"
      
        }
      };
    }
