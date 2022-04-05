export default {

    namespaced:true,

    state:()=>({
        cart:[]
    }),

    getters:{
        getCart(state){
            return state.cart
        }
    },
    mutations:{
        ADD_TO_CART(store,data){
            store.cart.push(data)
        },
        INC_ITEM_QTY(store,idx){
            store.cart[idx].quantity += 1
        },
        DEC_ITEM_QTY(store,idx){
            if(store.cart[idx].quantity>1){
                store.cart[idx].quantity -= 1
            }else{
                console.log("You must take at least one item or remove the item form cart")
            }          
        },
        REM_CART_ITEM(store,idx){
            store.cart.splice(idx,1)
        },
        ADD_CART_LOCALSTORAGE(store){
            localStorage.setItem("cart",JSON.stringify(store.cart))
        },
        CLONE_CART_FROM_LOCALSTORAGE(store,data){
            store.cart = [...data]
        }

    },

    actions:{
        addToCart({commit},data){
            commit('ADD_TO_CART',data)
            commit('ADD_CART_LOCALSTORAGE')
        },
        incItemQty({commit},idx){
            commit('INC_ITEM_QTY',idx)
            commit('ADD_CART_LOCALSTORAGE')
        },
        decItemQty({commit},idx){
            commit('DEC_ITEM_QTY',idx)
            commit('ADD_CART_LOCALSTORAGE')
        },
        remCartItem({commit},idx){
            commit('REM_CART_ITEM',idx)
            commit('ADD_CART_LOCALSTORAGE')
        },
        fetchCartLocalstorage({commit}){
            const cartFromLocalstorage = JSON.parse(localStorage.getItem("cart")) || [];
            commit("CLONE_CART_FROM_LOCALSTORAGE",cartFromLocalstorage);
        }

    }
}