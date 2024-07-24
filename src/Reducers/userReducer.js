

export const SignInReducer = (state = {}, action) => {
    switch (action.type){
        case "cust-signin-success":
            return { logged: true, uemail: action.email, uid: action.uid, uname: action.uname, urole: action.urole};
        case "cust-signout":
            return { logged: false};
        case "cust-edit-success":
            return { logged: true, uemail: action.email, uid: action.uid, uname: action.uname, urole: action.urole };
        default:
            return state; 
    }
};

export const PlanReducer = (state = {}, action) => {
    switch (action.type){
        case "cust-plan":
            return action.payload;
        default:
            return state;    
    }
}
