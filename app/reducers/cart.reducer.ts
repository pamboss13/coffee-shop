interface CartItem {
    id: string;
    [key: string]: unknown;
}

interface CartState {
    items: CartItem[];
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: CartItem }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: string; payload?: unknown };

const initialState: CartState = {
    items: []
};

export default function cartReducer(state = initialState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload as CartItem]
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item.id !== (action.payload as string))
            };
        default:
            return state;
    }
}