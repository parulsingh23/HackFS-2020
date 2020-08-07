import React from "react";

class NewTask extends React.Component {
    constructor(props) {
        super(props);

    }

    

    render() {

    }
 }

const NewTask = ({title, cards}) => {
    return (
        <div className="List-container">
            <h4 className="List-title">{title}</h4>
            {cards.map(card => <TaskCard title={card.title} description={card.desc} assigned={card.assigned} due_date={card.due_date}/>)}
        </div>
        
    )
}

export default NewTask;