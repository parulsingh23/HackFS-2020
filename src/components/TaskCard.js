import React from "react";
import Card from '@material-ui/core/Card';
import "./TaskCard.css";
import { ReactComponent as Check } from '../public/Check.svg';
import { ReactComponent as Trash } from '../public/Trash.svg';
import {Client, Identity, KeyInfo, ThreadID } from '@textile/hub';
import { Database, Collection, JSONSchema } from '@textile/threads-database';
import { collect } from 'streaming-iterables';
import Emit from './Emit.js';

/* function Completed() {
    const handleChange = async(event) => {const all = this.tasks.find({key: _key });

    for (const task of await collect(all)) {
        task.type = "Awaiting Approval";
        await task.save();

  }
  emitter();}
    // Get results
     const all = this.tasks.find({key: _key });
    // Loop over AsyncIterableIterator result and log the names
    for (const task of await collect(all)) {
          task.type = "Awaiting Approval";
          await task.save();

    }
    emitter(); 

    return (<button onClick={handleChange}>
        <Check/>
        </button>)
}; */




const TaskCard = ({title, description, assigned, supervisor, due_date, type, _key, tasks, Name}) => {

    
    return (
        
        <Card className="TaskCard-container">
            <div className="TaskCard-beforeDivider">
            <div className="top">
            <div className="TaskCard-title" gutterBottom>
                {title}
            </div>
      </div>
      </div>
            <div className="TaskCard-desc">
                {description}
            </div>
            
            

            <hr className="TaskCard-Divider"></hr>
            <div className="TaskCard-afterDivider">
            {supervisor === 'Parul' && 
            
            <div className="TaskCard-row">
                <div className="TaskCard-mini-title">
                    Assigned To:
                </div>
                <div className="TaskCard-entry">
                    {Name}
                </div>
                </div>
             }

            {Name ==='Parul' && 
            
            <div className="TaskCard-row">
                <div className="TaskCard-mini-title">
                    Supervisor:
                </div>
                <div className="TaskCard-entry">
                    {supervisor}
                </div>
             </div>
            }
            
            
                
                <div className="TaskCard-row">
                    <div className="TaskCard-mini-title">
                        Priority:
                    </div>
                </div>

                <div className="TaskCard-row">
                    <div className="TaskCard-mini-title">
                        Due Date: 
                    </div>
                    <div className="TaskCard-deadline TaskCard-desc">
                        {due_date} 
                    </div>
                </div>


                {/* <div className="TaskCard-row">
                     <ModalTask edit='true' title= {this.props.title} 
                        description={this.props.description}
                        supervisor={this.props.supervisor}
                        duedate={this.props.due_date}
                        /> 
                    
                </div> */}

            </div>

            

            

        </Card>
    )
}
 
export default TaskCard;