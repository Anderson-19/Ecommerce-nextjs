import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    getSummaryInformation: () => { 
        subTotal: number; 
        totalPrice: number; 
        tax: number; 
        productsInCart: number; 
    };

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                const tax = subTotal * 0.15;
                const totalPrice = subTotal + tax;
                const productsInCart = cart.reduce((totalItems, newItem) => totalItems + newItem.quantity, 0);

                return {
                    subTotal,
                    tax,
                    totalPrice,
                    productsInCart
                }
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
    
                const isProductInCart = cart.some(p => p.id === product.id && p.size === product.size);
    
                if (!isProductInCart){
                    set({ cart: [...cart, product] });
                    return;
                }
    
                const updatedCartProducts = cart.map(p => {
                  if( p.id === product.id && p.size === product.size ) {
                    return { ...p, quantity: p.quantity + product.quantity };
                  }  
    
                  return p;
                });
    
                set({ cart: updatedCartProducts });
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map(p => {
                    if( p.id === product.id && p.size === product.size ) {
                      return { ...p, quantity };
                    }  
      
                    return p;
                  });
      
                  set({ cart: updatedCartProducts });
            },

            removeProductFromCart: (product: CartProduct) => {
                const { cart } = get();

                const updatedCartProducts = cart.filter(p => p.id !== product.id || p.size !== product.size);

                set({ cart: updatedCartProducts });
            },
            clearCart: () => {
                set({ cart: [] });
            }
        }),
        { 
            name: "shopping-cart" 
        }
    )
);