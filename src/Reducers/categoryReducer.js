

export const CategoryListReducer = (state = {}, action) => {
    switch (action.type) {
        case "category-list":
            return action.payload;
        default: return state
    }
};

export const SelectCategoryReducer = (state = {}, action) => {
    switch (action.type) {
        case "category-select":
            return action.payload;
        default: return state
    }
};
