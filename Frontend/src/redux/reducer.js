const initialState={
    allVacations:[],
    currentUser:{ 
        firstName:"",
         lastName:"",
         id:"",
         followedVacations:[],
         isAdmin:false
        }
};

const vacationReducer=(state = initialState , action)=>{

    let newState;
    switch (action.type){
        case "LOGIN":
            /* {type:"LOGIN",data:userObj}*/
            newState=Object.assign({},state);
            newState.currentUser= action.data;
            return newState;
            
        case "LOGOUT":
        // {type:"LOGOUT"}
            newState=Object.assign({},state);
            newState.currentUser=initialState.currentUser;
            return newState;

        case "ADD":
            // {type:"ADD",data:vacObj}
            newState= {...state};
            newState.allVacations.push(action.data);
            return newState;

        case "DELETE":
            // {type:"DELETE",data:id}
            newState= {...state};
            newState.allVacations.splice(action.data,1);
            return newState;

        case "EDIT":
            // {type:"EDIT",data:newVacObj}
            newState= {...state};
            newState.allVacations.forEach(vacay=>{
                if(vacay.id==action.data.newVacObj.id)
                    vacay=action.data.newVacObj;
            })
            return newState; 

        case "SET":
            // {type:"SET",data:vacationsArray}
            newState= {...state};
            newState.allVacations=action.data;
            return newState;

        case "FOLLOW":
            newState= {...state};
            newState.currentUser.followedVacations.push(action.data);
            return newState;

        case "UNFOLLOW":
            newState= {...state};
            newState.currentUser.followedVacations.splice(action.data, 1);
            return newState;
        
        default:
            return state;
    }
};


export default vacationReducer;