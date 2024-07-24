

export const signin = (email, uId, ufirstName, urole) => {
    return {
        type: 'cust-signin-success',
        email: email,
        uid: uId,
        uname: ufirstName,
        urole: urole
    }

}

export const signout = () => {
    return {
        type: 'cust-signout',
    }
}

export const edit = (email, uId, ufirstName, urole) => {
    return {
        type: 'cust-edit-success',
        email: email,
        uid: uId,
        uname: ufirstName,
        urole: urole
    }
}

export const planAction = (p) => {
    return {
        type: 'cust-plan',
        payload: p
    }
}