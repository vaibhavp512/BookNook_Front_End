
export const AdminReducer = (state = {}, action) => {
    switch (action.type){
        case "admin-signin-success":
            return { logged: true, aemail: action.email, aid: action.aid, aname: action.aname};
        case "admin-signout":
            return { logged: false, aemail: null, aid: null, aname: null};
        default:
            return state; 
    }
};