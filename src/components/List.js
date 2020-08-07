import React from "react";
import "./List.css";
import TaskCard from "./TaskCard.js";
import ModalTask from "./ModalTask.js";

const List = ({title, cards, tasks, emitter}) => {
    return (
        <div className="List-container">
            <h4 className="List-title">{title}</h4>
            {cards.map(card => <TaskCard title={card.value.title} Name={card.value.name} description={card.value.description} assigned={card.value.assigned} due_date={card.value.duedate} supervisor={card.value.supervisor} _key={card.key.toString()} tasks={tasks} emitter={emitter.bind(this)} type={title}/>)}
            {title === 'Backlogged' && <ModalTask tasks={tasks} emitter={emitter.bind(this)}/>}
            
        </div>
        
    )
}

export default List;