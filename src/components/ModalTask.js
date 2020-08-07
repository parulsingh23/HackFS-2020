import React from "react";
import { ReactComponent as Edit } from '../public/Edit.svg';
import "./ModalTask.css";
import ReactModal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from 'moment';
/* import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'; */
import {Client, Identity, KeyInfo, ThreadID } from '@textile/hub';
import { Database, Collection, JSONSchema } from '@textile/threads-database';
import { collect } from 'streaming-iterables';



class ModalTask extends React.Component {
   

    constructor(props) {
        super(props);
         this.state = { show : false,
                        name: '',
                        title: '',
                        description: '',
                        supervisor: '',
                        duedate: '',
                        type: 'Backlogged',
                        error_title: false,
                        error_description: false,
                        error_supervisor: false,
                        error_duedate: false,
                        
                        }; 
                        
                        
    }

    /* keyinfo = {
        key: process.env.REACT_APP_USER_API_KEY,
        secret: process.env.REACT_APP_USER_API_SECRET
    };

    db = null;

    threadID = null;

    tasks=null;

    //a KeyInfo object above to connect to the API
    authorize = async() => {
        
        const client = await Client.withKeyInfo(this.keyinfo);
        await client.getToken(this.props.identity);
        return client;
      }

    //Attach that database to your Hub account for networking
    init = () => {
        const _db = Database.withKeyInfo(this.keyinfo, 'threads.tasks.demo');
        this.db= _db; 
    }

    //start Thread for Tasks
    startThread = async () => {
        const _threadID = ThreadID.fromRandom(); //added this myself to generate random threadID
        await this.db.start(this.props.identity, {_threadID});
        this.threadID = _threadID;
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

    //is a collection in our db
    //only for initializing
    collectionFromSchema = async() => {
        //const _Tasks = await this.db.newCollection('Task', this.taskSchema)
        const _Tasks = await this.db.newCollectionFromObject('Tasks', obj);
        this.tasks = _Tasks;
    }

    // Requires the started database we generated above
    //should be able to replace the above function
    getOrCreatecollection  = async() => {
    const {collections} = this.db;
    const existing = collections.get('Task');
    if (existing) {
        this.tasks = existing;
    } else {
        //const _Tasks = await this.db.newCollection('Task', this.taskSchema);
        const _Tasks = await this.db.newCollectionFromObject('Tasks', obj);
        this.tasks = _Tasks;
    }
}

put_example_date = () =>  {
    this.tasks = db.collections.get('Tasks')
    if (!this.tasks) throw new Error('Collection does not exist')
  
    // Create an instance for the Collection and then save it
    const task_1 = new Tasks({
    _id: '',
    name: 'Parul',
    title: 'Draft 2020 Budget',
    description: 'Work with finance department',
    supervisor:  'John',
    duedate:'2020-09-10',
    _type: 'Backlogged' }) // Not yet persisted
    await task_1.save() // Persist changes to db
  
    // Modify the `task_1` instance
    task_1._type = 'In Progress'
    await task_1.save() // Save changes
  
    //need to test out below
    // Modify it again
    task_1.duedate = '2020-09-06'
  
    // Save it from the Collection
    await this.tasks.save(task_1)
  
    // Delete it from the Collection
    await this.tasks.delete(task_1._id)
  
    // etc!
  }

  // Requires the started database we generated above containing the Player collection
  createQuery = async () => {
    this.tasks = this.db.collections.get('Tasks')
    if (!this.tasks) throw new Error('Collection does not exist')
  
    await this.tasks.insert(
        {_id: '',
        name: 'Parul',
        title: 'Clean up Github Repo',
        description: 'Update READ.me file',
        supervisor:  'Beth',
        duedate:'2020-08-21',
        _type: 'In Progress'},
        {_id: '',
        name: 'Parul',
        title: 'Finalize Logo',
        description: 'Collaborate with Design Team for sketches',
        supervisor:  'Andrew',
        duedate:'2020-09-18',
        _type: 'In Progress'},
        {_id: '',
        name: 'Parul',
        title: 'Plan for Hackathon',
        description: 'Braindump and determine project specifications for',
        supervisor:  'John',
        duedate:'2020-08-11',
        _type: 'In Progress'},
        {_id: '',
        name: 'Parul',
        title: 'Complete Business Plan',
        description: '',
        supervisor:  'Lora',
        duedate:'2020-07-30',
        _type: 'Awaiting Approval'}
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
 */
    
    handledateChange = (event) => {
        this.setState({
            duedate: event.target.value
        }, () => {
            this.error_check_for_date();
        });   
        console.log("duedate: ", this.state.duedate);
    };

    handletitleChange = (event) => {
        this.setState({
            title: event.target.value
        }, () => {
            this.error_check_for_title();
        });   

    };

    handlesupervisorChange = (event) => {
        this.setState({
            supervisor: event.target.value
        }, () => {
            this.error_check_for_supervisor();
        });   

    };


    handledescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        }, () => {
            this.error_check_for_description();
        });   

    };

    

    error_check_for_title = () => {
        if(this.state.title === null) {
            this.setState({ error_title: true});
        } else if ( this.state.title.length === 0) {
            this.setState({ error_title: true});
        } else {
            this.setState({ error_title: false});
        }
        
    }

    error_check_for_description = () => {
        if(this.state.description === null) {
            this.setState({ error_description: true});
        } else if ( this.state.description.length === 0) {
            this.setState({ error_description: true});
        } else {
            this.setState({ error_description: false});
        }
        
    }

    error_check_for_supervisor = () => {
        if(this.state.supervisor === null) {
            this.setState({ error_supervisor: true});
        } else if ( this.state.supervisor.length === 0) {
            this.setState({ error_supervisor: true});
        } else {
            this.setState({ error_supervisor: false});
        }
    }

    error_check_for_date = () => {
        
            var now = moment().format("YYYY-MM-DD");
            var momentA = moment(now,"YYYY-MM-DD");
            var momentB = moment(this.state.duedate,"YYYY/MM/DD");
            
            if(this.state.duedate.length === 0) {
                this.setState({ error_duedate: true});
            }  else if (momentA > momentB) {
                this.setState({ error_duedate: true});
            } else {
                this.setState({ error_duedate: false});
            }
    }

    

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

    

    openModal = () => {
        this.setState({show : true});
    }

    closeModal = () => {
        this.resetUserInputs();
        
    }

    changeTitle = (event) => {
        this.setState({title: event.target.value});
    }

    changeDesc = (event) => {
        this.setState({description: event.target.value});
        
    }



    
    

    submit = async(event) => {
        event.preventDefault(); //don't want browser to refresh right away
        this.error_check_for_description();
        this.error_check_for_supervisor();
        this.error_check_for_date();
        this.error_check_for_title();

            if(!this.state.error_title && !this.state.error_description && !this.state.error_supervisor && !this.state.error_duedate) {
                console.log("aaaaa");
                this.props.tasks.insert({
                _id: '',
                name: 'Parul',
                title: this.state.title,
                description: this.state.description,
                supervisor:  this.state.supervisor,
                duedate:this.state.duedate,
                _type: 'Backlogged'});
                
                //this.putDataToDB(this.state.name, this.state.title, this.state.description,this.state.supervisor, this.state.duedate).then(this.closeModal());
                /* const payload = {
                    task_title: this.state.title,
                    task_desc: this.state.description,
                    supervisor: this.state.supervisor, 
                    id: 1,
                    name: 'parul',
                    due_date: this.state.duedate,
                    type: this.state.type
              
                  }; */
    
                  /* axios({
                    url:'/api/save',
                    method: 'POST',
                    data: payload
                  })
                    .then(() => {
                      console.log('Data has been sent to the server');
                      this.resetUserInputs();
              
                    })
                    .catch(() => {
                      console.log('Internal Server error');
                    });
                };
                console.log("bbbb"); */
                this.closeModal();
                this.props.emitter();
            }   
        /* new Promise( () => {
            this.error_check_for_description();
            this.error_check_for_supervisor();
            this.error_check_for_date();
            this.error_check_for_title();
            console.log("heyyo");
        } ).then( () => {
        if(!this.state.error_title && !this.state.error_description && !this.state.error_supervisor && !this.state.error_duedate) {
            console.log("aaaaa");
            //this.putDataToDB(this.state.name, this.state.title, this.state.description,this.state.supervisor, this.state.duedate).then(this.closeModal());
            const payload = {
                task_title: this.state.title,
                task_desc: this.state.description,
                supervisor: this.state.supervisor, 
                id: 1,
                name: 'parul',
                due_date: this.state.duedate,
                type: this.state.type
          
              };

              axios({
                url:'/api/save',
                method: 'POST',
                data: payload
              })
                .then(() => {
                  console.log('Data has been sent to the server');
                  this.resetUserInputs();
          
                })
                .catch(() => {
                  console.log('Internal Server error');
                });
            };
            console.log("bbbb");
            this.closeModal();
        }); */
        };

        resetUserInputs = () => {
            this.setState({ 
                show : false,
                name: '',
                title: '',
                description: '',
                supervisor: '',
            duedate: '',
            error_title: false,
            error_description: false,
            error_supervisor: false,
            error_duedate: false

            });
          };
    
        /* 

        if((this.state.description == null || (this.state.description.length)==0)) {
            this.setState({valid_desc: true});
        }

        if(this.state.valid_title!= false || this.state.valid_desc != false) {
            return;
        } else {
            this.closeModal();
            return;
        }
 */

        
    

    renderAddButton = () => {
        const buttonTextOpacity = 0.8;
        const buttonText ="Add a task";
        
        return (
            

            <div>
            <div className="Edit-row" style={ {opacity : buttonTextOpacity}} onClick= {this.openModal}>
                <Edit />
                <p className="entry">{buttonText}</p>
                
            </div>

            <ReactModal isOpen={this.state.show} ariaHideApp={false} shouldCloseOnOverlayClick > 
            {/*  onRequestClose> */}
                <h2>Modal title</h2>
                {/* <input value="Task Title" onChange={this.changeTitle.bind(this)}></input> */}
                <TextField required id="title"  name="title" error= {this.state.error_title} value={this.state.title} label="Title" onChange={this.handletitleChange}/>
                <TextField required id="description" name="description" error= {this.state.error_description} value={this.state.description} label="Description" onChange={this.handledescriptionChange}/>
                <TextField  required id="supervisor" name="supervisor" error= {this.state.error_supervisor} value={this.state.supervisor} label="Supervisor" onChange={this.handlesupervisorChange}/>
        
   <TextField 
    required 
    name="duedate"
    error= {this.state.error_duedate}
    label="Due Date"
    type="date"
    value={this.state.duedate}
    onChange={this.handledateChange}
    id="standard-helperText"
  /> 
                <button className="piece" onClick={this.submit} >Submit</button>
                <button className="piece" onClick={this.closeModal} >Delete</button>
            </ReactModal>
                
            </div>
            
        );
    };

   
    componentDidMount() {
        this.renderAddButton();
    };
    

    render() {
 
        return this.renderAddButton();
    }
}



export default ModalTask; 