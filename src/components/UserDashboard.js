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
/*const keyinfo: KeyInfo = {
  //key: b7flvm4v7u7thtgrxi2qnqtojtq
  key: {process.env.USER_API_KEY},
  secret: {process.env.USER_API_SECRET}

};*/
//how to get this securely
//or is the key just the one given by 3Box with Metamask login?
/*
key: fetch(process.env.USER_API_KEY)
  .then((response) => {
    return response.json();
  }),
  secret: fetch(process.env.USER_API_SECRET)
  .then((response) => {
    return response.json();
  })*/
  
class UserDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            lists :[],
            intervalIsSet: false,
            idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
        backlogged: [],
        inprogress: [],
        awaitingapproval: [],
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

  //Attach that database to your Hub account for networking
  /* init = () => {
      //const _db = await Database.withKeyInfo(this.keyinfo, 'threads.tasks.demo');
      (async () => {
        const _db = await Database.withKeyInfo(this.keyinfo, 'threads.tasks.demo');
        this.db= _db; 
      console.log(_db);
        // all of the script.... 
    
    })();
      
  } */

  init = async() => {
    const _db = await Database.withKeyInfo(this.keyinfo, 'threads.tasks.demo');
        this.db= _db; 
      console.log(_db);
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

  
  taskSchema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Task',
      type: 'object',
      properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          supervisor:  { type: 'string' },
          duedate: { type: 'string' },
          _type: { type: 'string' }
      }
    };

  obj = {
      
      _id: '',
      name: '',
      title: '',
      description: '',
      supervisor:  '',
      duedate:'',
      _type: ''
    }

   /*  Card = (rank, suit) => {
    this.rank = rank;
    this.suit = suit;
  };

  obj = (_id, name, title, description, supervisor, duedate, _type) => {
      this._id= _id,
      this. name= name,
      this.title= title,
      this.description= description,
      this.supervisor= supervisor,
      this.duedate=duedate,
      this._type= _type;
  }
 */
  //is a collection in our db
  //only for initializing
  collectionFromSchema = async() => {
      //const _Tasks = await this.db.newCollection('Task', this.taskSchema)
      const _Tasks = await this.db.newCollectionFromObject('Tasks', this.obj);
      this.tasks = _Tasks;
      
  }

  // Requires the started database we generated above
  //should be able to replace the above function
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

put_example_date = async() =>  {
  //const task = this.db.collections.get('Tasks');
  //if (!this.tasks) throw new Error('Collection does not exist')

  // Create an instance for the Collection and then save it
  const task_1 = new this.tasks({
  _id: '',
  name: 'Parul',
  title: 'Draft 2020 Budget',
  description: 'Work with finance department',
  supervisor:  'John',
  duedate:'2020-09-10',
  _type: 'Backlogged' }); // Not yet persisted
  await task_1.save(); // Persist changes to db
  
  /* const task_1 =({
    _id: '',
    name: 'Parul',
    title: 'Draft 2020 Budget',
    description: 'Work with finance department',
    supervisor:  'John',
    duedate:'2020-09-10',
    _type: 'Backlogged' });
 */
  


  
}
/* 
change_1 = () => {
// Modify the `task_1` instance
task_1._type = 'In Progress'
//await task_1.save() // Save changes
(async () => {
  await task_1.save()

  // all of the script.... 

})();
}

change_2 = () => {
  //need to test out below
  // Modify it again
  task_1.duedate = '2020-09-06'

  // Save it from the Collection
  //await this.tasks.save(task_1)
  (async () => {
    await this.tasks.save(task_1);

    // all of the script.... 

})();
}

change_3 = () => {
// Delete it from the Collection
//await this.tasks.delete(task_1._id)
(async () => {
  await this.tasks.delete(task_1._id);

  // all of the script.... 

})();

}
 */

getTasks = async() => {
  const all = this.tasks.find({ name: 'Parul' });
  for (const task of await collect(all)) {
    console.log(`${task.key.toString()}: ${task.value._type}`);
    task.value._type = 'In Progress';
    await this.tasks.save();
    console.log(`${task.key.toString()}: ${task.value._type}`);
  }

  
}

getClear = async() => {
  const all = this.tasks.find({  name: 'Parul'});
  for (const task of await collect(all)) {
    await this.tasks.delete(task.value._id);
    await this.tasks.save();
  }
  this.emitter();
  
}

get_and_sep_Tasks = async() => {
  const all = this.tasks.find({ name: 'Parul' });
  await this.setState( {backlogged: [], inprogress: [], awaitingapproval: []});
  for (const task of await collect(all)) {
    console.log("keys: ", task.key.toString());
    if(task.value._type==='Backlogged') {
      this.setState( prevState => {return { backlogged: prevState.backlogged.concat(task)}});
    }

    if(task.value._type==='In Progress') {
      this.setState( prevState => {return { inprogress: prevState.inprogress.concat(task)}});
    }

    if(task.value._type==='Awaiting Approval') {
      this.setState( prevState => {return { awaitingapproval: prevState.awaitingapproval.concat(task)}});
    }

    this.setState({gotData: true});

  }

}
// Requires the started database we generated above containing the Player collection
updatehelp = async() => {
  await this.tasks.insert({_id: '',
  name: 'Parul',
  title: 'Clean up Github Repo',
  description: 'Update READ.me file',
  supervisor:  'Beth',
  duedate:'2020-08-21',
  _type: 'In Progress'},
  {_id: '',
      name: 'Parul',
      title: 'Plan for Hackathon',
      description: 'Braindump and determine project specifications for',
      supervisor:  'John',
      duedate:'2020-08-11',
      _type: 'In Progress'});

  await this.emitter();
}
createQuery = async () => {
  //this.tasks = this.db.collections.get('Tasks')
  //if (!this.tasks) throw new Error('Collection does not exist')

  await this.tasks.insert(
      {_id: '',
      name: 'Abby',
      title: 'Clean up Github Repo',
      description: 'Update READ.me file',
      supervisor:  'Parul',
      duedate:'2020-08-21',
      _type: 'Requesting Approval'},
      {_id: '',
      name: 'Andrew',
      title: 'Finalize Logo',
      description: 'Collaborate with Design Team for sketches',
      supervisor:  'Parul',
      duedate:'2020-09-18',
      _type: 'Requesting Checkoff'},
      {_id: '',
      name: 'John',
      title: 'Plan for Hackathon',
      description: 'Braindump and determine project specifications for',
      supervisor:  'Parul',
      duedate:'2020-08-11',
      _type: 'Active'},
      {_id: '',
      name: 'Lora',
      title: 'Resarch new Startup Resources',
      description: 'Look into Incubators',
      supervisor:  'Parul',
      duedate:'2020-07-30',
      _type: 'Requesting Approval'}
  )
  // Setup a query
  const query = {
    $or: [
      { duedate: '2020-08-11'},
      { supervisor: 'Lora' },
    ]
  }
  // Get results
  const all = this.tasks.find(query)
  console.log("Looping over to find query's with Lora or date 2020-08-11");
  // Loop over AsyncIterableIterator result and log the names
  for (const { key, value } of await collect(all)) {
    console.log(`${key.toString()}: ${value.name}`)
  }
}

createQuery_2 = async () => {
  //this.tasks = this.db.collections.get('Tasks')
  //if (!this.tasks) throw new Error('Collection does not exist')

  await this.tasks.insert(
      {_id: '',
      name: 'John',
      title: 'Plan Company Retreat',
      description: 'Confirm Caterer',
      supervisor:  'Parul',
      duedate:'2020-09-06',
      _type: 'Active'},
      {_id: '',
      name: 'Beth',
      title: 'Give Demo',
      description: 'Upload on Youtube',
      supervisor:  'Parul',
      duedate:'2020-09-10',
      _type: 'Requested Checkoff'},
      {_id: '',
      name: 'Becca',
      title: 'Research New Blockchain Startups',
      description: 'Pay heed to consumer base',
      supervisor:  'Parul',
      duedate:'2020-07-11',
      _type: 'Active'},
      {_id: '',
      name: 'Albert',
      title: 'Set up Cryptocurrency Payments',
      description: 'Get Metamask Accounts',
      supervisor:  'Parul',
      duedate:'2020-08-20',
      _type: 'Requesting Approval'}
  )
  
  
}

/*
const init = (keyInfo: KeyInfo, threadID: ThreadID) => {
    const db = Database.withKeyInfo(keyInfo, 'threads.chat.demo')
    return db
}
*/
    /* componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval });
        }
      }

      componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
      } */

      getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
          .then((data) => data.json())
          .then((res) => this.setState({ lists: res.data }));
      };

      
       putDataToDB = (name, task_title, task_desc,supervisor, due_date) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
          ++idToBeAdded;
        }
    
        axios.post('http://localhost:3001/api/putData', {
          id: idToBeAdded,
          name: name,
          supervisor,
        task_title: task_title,
        task_desc: task_desc,
        due_date: Date.parse(due_date)
        });
      }; 

     emitter = () => {

        this.db.emitter.on('**', async(update) => {
          console.log(update) // Logs the following updates...
          this.get_and_sep_Tasks();
          this.forceUpdate();
        })
        
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
          <div className="Manual mt-5 d-flex">User Dashboard</div>
            <div className="UserDashboard-lists" style={this.styles.container} > 
             <List title="Backlogged" cards={this.state.backlogged} tasks={this.tasks} emitter={this.emitter.bind(this)}/>
             <List title="In Progress" cards={this.state.inprogress} tasks={this.tasks} emitter={this.emitter.bind(this)}/>
             <List title="Awaiting Approval" cards={this.state.awaitingapproval} tasks={this.tasks} emitter={this.emitter.bind(this)}/>
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


/* const mapStateToProps = state => ({
    lists: state.lists
  }) 
export default connect (mapStateToProps)(UserDashboard);
*/

export default UserDashboard;