import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";

Vue.use(Vuex);

const baseUrl = "https://localhost:44352/api";
const pagesUrl = `${baseUrl}/pages`;
const categoriesUrl = `${baseUrl}/categories`;
const productsUrl = `${baseUrl}/products`;
const productImagesUrl = "https://localhost:44352/media/products/";

export default new Vuex.Store({
    strict: true,
    modules: { cart: CartModule },
    state: {
        pages: [],
        categories: [],
        products: [],
        productImages: productImagesUrl,
        currentPage: 1,
        pageCount: 0,
        pageSize: 2,
        currentCategory: "all"
    },
    mutations: {
        setPages(state, pages) {
            state.pages = pages;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setProducts(state, products) {
            state.products = products;
        },
        setPageCount(state, count) {
            state.pageCount = Math.ceil(Number(count) / state.pageSize);
        },
        setCurrentCategory(state, category) {
            state.currentCategory = category;
        },
        setCurrentPage(state, page) {
            state.currentPage = page;
        }
    },
    actions: {
        async setPagesAction(context) {
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
        },
        async setCategoriesAction(context) {
            context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
        },
        async setProductsByCategoryAction(context, category) {
            let url;
            let productCountUrl;
            if (category != "all") {
                url = `${productsUrl}/${category}?page=${context.state.currentPage}`;
                productCountUrl = `${productsUrl}/count/${category}`;
            }
            else {
                url = `${productsUrl}`;
                productCountUrl = `${productsUrl}/count/all`;
            }

            let productCount = (await Axios.get(productCountUrl)).data;

            context.commit("setPageCount", productCount);
            context.commit("setProducts", (await Axios.get(url)).data);
        },
        async setProductsByCategoryPaginationAction(context, page) {
            let url;

            if (context.state.currentCategory !== "all") {
                url = `${productsUrl}/${context.state.currentCategory}?page=${page}`;
            }
            else {
                url = `${productsUrl}?page=${page}`;
            }
            context.commit("setProducts", (await Axios.get(url)).data);
        }
    }
});