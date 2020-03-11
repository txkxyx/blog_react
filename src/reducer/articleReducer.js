import { 
    POST_ARTICLE,
    POST_ARTICLE_ERROR,
    DRAFT_ARTICLE,
    DRAFT_ARTICLE_ERROR,
    EDIT_AERTICLE,
    EDIT_AERTICLE_ERROR, 
    GET_ARTICLES, 
    GET_TAG_ARTICLES, 
    GET_ARTICLES_ORDERE_INSERTDATE,
    GET_ARTICLES_ORDERE_UPDATEDATE, 
    GET_GENRES,
    UPDATE_ISDELETE,
    UPDATE_ISDELETE_ERROR, 
    GET_ARTICLE} from "../actions/articleActions";
import { combineReducers } from "redux";

const initState = {postError:null}

const searchReducer = (state = initState, action) =>{
    switch (action.type){
        case GET_ARTICLE:
            return{
                article: action.article
            }
        case GET_ARTICLES:
            return{
                search_articles: action.search_articles,
                keyword: action.keyword
            }
        case GET_TAG_ARTICLES:
            return{
                tag_articles: action.tag_articles,
                genre: action.genre
            }
        default:
            return state;
    }
}

const orderedInsertReducer = (state = initState, action) =>{
    switch (action.type){
        case GET_ARTICLES_ORDERE_INSERTDATE:
            return{
                articles_ordere_insertdate: action.articles
            }
        default:
            return state;
    }
}

const orderedUpdateReducer = (state = initState, action) =>{
    switch (action.type){
        case GET_ARTICLES_ORDERE_UPDATEDATE:
            return{
                articles_ordere_updatedate: action.articles
            }
        default:
            return state;
    }
}

const putReducer = (state = initState, action) =>{
    switch (action.type){
        case POST_ARTICLE:
        case DRAFT_ARTICLE:
            return {
                ...state,
                postError: 'success'
            }
        case POST_ARTICLE_ERROR:
        case DRAFT_ARTICLE_ERROR:
            return {
                ...state,
                postError: action.err.message
            }
        case EDIT_AERTICLE:
        case UPDATE_ISDELETE:
            return {
                ...state,
                editError: 'success'
            }
        case EDIT_AERTICLE_ERROR:
        case UPDATE_ISDELETE_ERROR:
            return {
                ...state,
                editError: action.err.message
            }
        default:
            return state;
    }
}

const genreReducer = (state = initState, action) =>{
    switch (action.type){
        case GET_GENRES:
            return{
                genres: action.genres
            }
        default:
            return state;
    }
}

const articleReducers = combineReducers({
    search: searchReducer,
    ordered_insert: orderedInsertReducer,
    ordered_update: orderedUpdateReducer,
    put: putReducer,
    genre: genreReducer
})

export default articleReducers;