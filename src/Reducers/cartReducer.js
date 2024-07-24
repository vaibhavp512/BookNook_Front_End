export const CartReducer = (state = [], action) => {
    switch (action.type) {
        case "add-to-cart":
            return [
                ...state,
                action.book
            ]

        case "remove-from-cart":
            const newItems = []
            for (const book of state) {
                if (book.bId !== action.book.bId) {
                    newItems.push(book)
                }
            }
            return newItems

        case "empty-cart":
            return []

        default: return state
    }
};