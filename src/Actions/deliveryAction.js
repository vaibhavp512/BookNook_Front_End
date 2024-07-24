export const addToDelCartAction = (order) => {
    return {
        type: 'add-to-delcart',
        order: order
    }
}

export const removeFromDelCartAction = (order) => {
    return {
        type: 'remove-from-delcart',
        order: order,
    }
}

export const emptyDelCartAction = () => {
    return {
        type: 'empty-delcart'
    }
}