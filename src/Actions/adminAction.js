
export const signinAdmin = (aemail, adId, adname) => {
    return {
        type: 'admin-signin-success',
        email: aemail,
        aid: adId,
        aname: adname
    }
}

export const signoutAdmin = () => {
    return {
        type: 'admin-signout',
    }
}