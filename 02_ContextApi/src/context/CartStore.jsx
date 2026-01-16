import { useReducer, useState } from "react";
import { CartContext } from "./CartContext";
import { DUMMY_PRODUCTS } from "../dummy-products";

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
        const existingIndex = state.items.findIndex(
            item => item.id === action.id
        );

        let updatedItems;

        if (existingIndex !== -1) {
            updatedItems = [...state.items];
            updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + 1,
            };
        } else {
            const product = DUMMY_PRODUCTS.find(p => p.id === action.id);
            updatedItems = [
            ...state.items,
            {
                id: product.id,
                name: product.title,
                price: product.price,
                quantity: 1,
            },
            ];
        }

        return { items: updatedItems }; // ✅ FIX
        }

        case "UPDATE_ITEM": {
        const updatedItems = state.items
            .map(item =>
            item.id === action.id
                ? { ...item, quantity: item.quantity + action.amount }
                : item
            )
            .filter(item => item.quantity > 0);

        return { items: updatedItems }; // ✅ already correct
        }

        default:
        return state;
    }
}


export default function CartStore({ children }) {
    // const [items, setItems] = useState([]);
    const [cartState, dispatch] = useReducer(cartReducer, {
        items: []
    });

    function addItem(id) {
        dispatch({
            type: "ADD_ITEM",
            id: id
        });
        // setItems((prevItems) => {
        // const existingIndex = prevItems.findIndex((item) => item.id === id);

        // if (existingIndex !== -1) {
        //     const updatedItems = [...prevItems];
        //     updatedItems[existingIndex] = {
        //     ...updatedItems[existingIndex],
        //     quantity: updatedItems[existingIndex].quantity + 1,
        //     };
        //     return updatedItems;
        // }

        // const product = DUMMY_PRODUCTS.find((p) => p.id === id);
        // return [
        //     ...prevItems,
        //     {
        //     id,
        //     name: product.title,
        //     price: product.price,
        //     quantity: 1,
        //     },
        // ];
        // });
    }

    function updateItemQuantity(id, amount) {
        dispatch({
            type: "UPDATE_ITEM",
            id, amount
        });
        // setItems((prevItems) => {
        // const updatedItems = prevItems
        //     .map((item) =>
        //     item.id === id ? { ...item, quantity: item.quantity + quant } : item)
        //     .filter((item) => item.quantity > 0);

        // return updatedItems;
        // });
    }

    return (
        <CartContext.Provider
        value={{
            items: cartState.items,
            addItem,
            updateItemQuantity,
        }}
        >
        {children}
        </CartContext.Provider>
    );
}
