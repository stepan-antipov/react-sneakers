import React from "react"
import { AppContext } from "../App"

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext)
    let totalPrice = cartItems.reduce((acc, obj) => obj.price + acc, 0)

    return {cartItems, setCartItems, totalPrice}
}


