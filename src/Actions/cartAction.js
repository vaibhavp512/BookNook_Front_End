export const addToCartAction = (book) => {
    return {
        type: 'add-to-cart',
        book: book
    }
}

export const removeFromCartAction = (book) => {
    return {
        type: 'remove-from-cart',
        book: book,
    }
}

export const emptyCartAction = () => {
    return {
        type: 'empty-cart'
    }
}