export default {
    namespaced: true,
    state: {
        cart: [],
    },
    getters: {
        itemCount: (state) =>
            state.cart.reduce(
                (total, cartItem) => total + cartItem.quantity,
                0
            ),
        totalPrice: (state) =>
            state.cart.reduce(
                (total, cartItem) => total + cartItem.quantity * cartItem.product.price,
                0
            )
    },
    mutations: {
        addProduct(state, product) {
            let cartItem = state.cart.find(
                (cartItem) => cartItem.product.id == product.id);
            if (cartItem != null) {
                cartItem.quantity++;
            }
            else {
                state.cart.push({ product: product, quantity: 1 });
            }
        },
        setCartData(state, data) {
            state.cart = data;
        }
    },
    actions: {
        loadCartData(context) {
            let data = localStorage.getItem("cart");
            if(data != null) {
                context.commit("setCartData", JSON.parse(data));
            }
        },
        storeCartData(context) {
            localStorage.setItem("cart", JSON.stringify(context.state.cart));
        },
        initializeCart(context, store) {
            context.dispatch("loadCartData");
            store.watch(
                (state) => state.cart.cart,
                () => context.dispatch("storeCartData"),
                 { deep: true}
            );
        },
    }
}