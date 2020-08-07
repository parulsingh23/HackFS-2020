const initialState = [
    {
        title: "backlog",
        id: 0,
        cards: [
            {
                id: 0,
                title: "This is task title",
                desc: "this is task descripiton",
                assigned: "this is john doe",
                due_date: "04/13/2020"
            },

            {
                id: 1,
                title: "This is title 2",
                desc: "this is descripiton 2",
                assigned: "this is amy",
                due_date: "04/17/2020"
            }
        ]

    },

    {
        title: "in progress",
        id: 1,
        cards: [
            {
                id: 0,
                title: "do homework",
                desc: "read english book",
                assigned: "this is jane ",
                due_date: "04/17/2020"
            },

            {
                id: 1,
                title: "eat food",
                desc: "consume oatmeal",
                assigned: "this is harry",
                due_date: "04/31/2020"
            }
        ]

    }
]
const listsReducer = (state = initialState, action) => {


    switch (action.type) {
        default: 
        return state;
    }
};

export default listsReducer;