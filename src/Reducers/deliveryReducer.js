export const DeliveryReducer = (state = [], action) => {
    switch(action.type) {
        case "add-to-delcart":
            return [...state, action.order]

        case "remove-from-delcart":
            const newItems = []
            for (const order of state){
                if (order.oid !== action.order.oid) {
                    newItems.push(order)
                }
            }
            return newItems

        case "empty-delcart":
            return []

        default: return state
    }
}