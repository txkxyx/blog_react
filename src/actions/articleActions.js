import axios from "axios";
import { BASE_URL } from "../const/const";

export const POST_ARTICLE = 'POST_ARTICLE';
export const POST_ARTICLE_ERROR = 'POST_ARTICLE_ERROR';
export const DRAFT_ARTICLE = 'DRAFT_ARTICLE';
export const DRAFT_ARTICLE_ERROR = 'DRAFT_ARTICLE_ERROR';
export const EDIT_AERTICLE = 'EDIT_AERTICLE';
export const EDIT_AERTICLE_ERROR = 'EDIT_AERTICLE_ERROR';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const GET_ARTICLE = 'GET_ARTICLE';
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_TAG_ARTICLES = 'GET_TAG_ARTICLES';
export const GET_ARTICLES_ORDERE_INSERTDATE = 'GET_ARTICLES_ORDERE_INSERTDATE';
export const GET_ARTICLES_ORDERE_UPDATEDATE = 'GET_ARTICLES_ORDERE_UPDATEDATE';
export const GET_GENRES = 'GET_GENRES';
export const UPDATE_ISDELETE = 'UPDATE_ISDELETE';
export const UPDATE_ISDELETE_ERROR = 'UPDATE_ISDELETE_ERROR';

export const getArticle = (id) => {
    return (dispatch) => {
        axios.get(BASE_URL + 'article/id/' + id).then((resp) => {
            const article = resp.data;
            dispatch({ type: GET_ARTICLE, article:article})
        })
    }
}

export const getArticles = (keyword) => {
    return (dispatch) => {
        axios.get(BASE_URL + 'articles/search/' + keyword).then((resp) => {
            const articles = resp.data;
            dispatch({ type: GET_ARTICLES, search_articles:articles, keyword})
        })
    }
}

export const getTagArticles = (genre) => {
    return (dispatch) => {
        axios.get(BASE_URL + 'articles/genre/' + genre).then((resp) => {
            const articles = resp.data;
            dispatch({ type: GET_TAG_ARTICLES, tag_articles:articles, genre})
        });
    }
}

export const getArticlesOrdered = (limit, field) => {
    return (dispatch) => {
        axios.get(BASE_URL + 'articles/field/' + field + '/sort/desc/limit/' + limit).then((resp) => {
            const articles = resp.data;
            if(field === 'insert_date'){
                dispatch({type:GET_ARTICLES_ORDERE_INSERTDATE,articles});
            }
            if(field === 'update_date'){
                dispatch({type:GET_ARTICLES_ORDERE_UPDATEDATE,articles})
            }
        })
    }
}

export const getGenres = () => {
    return (dispatch) => {
        axios.get(BASE_URL + 'genres').then((resp) => {
            const genres = resp.data;
            dispatch({type:GET_GENRES,genres:genres.sort()})
        })
    }
}

export const postArticle = (article) =>  {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const authorId = getState().firebase.auth.uid; 
        article['insert_id'] = authorId;
        article['update_id'] = authorId;
        article.genre = article.genre.split(',');
        axios.post(BASE_URL + 'article',{ ...article}).then(resp => {
            const id = resp.data;
            uploadImage(id, article.image,getFirebase).then(resp => {
                dispatch({ type: POST_ARTICLE, article});
            }).catch((err) => {
                dispatch({ type: POST_ARTICLE_ERROR, err})
            });
        }).catch((err) => {
            dispatch({ type: POST_ARTICLE_ERROR, err})
        });
    }
};

export const draftArticle = (article) =>  {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const authorId = getState().firebase.auth.uid; 
        article.is_delete = true;
        article['insert_id'] = authorId;
        article['update_id'] = authorId;
        article.genre = article.genre.split(',');
        axios.post(BASE_URL + 'article',{ ...article}).then(resp => {
            const id = resp.data;
            uploadImage(id, article.image,getFirebase).then(resp => {
                dispatch({ type: POST_ARTICLE, article});
            }).catch((err) => {
                dispatch({ type: POST_ARTICLE_ERROR, err})
            });
        }).catch((err) => {
            dispatch({ type: POST_ARTICLE_ERROR, err})
        });
    }
};

export const editArticle = (state) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const authorId = getState().firebase.auth.uid;
        axios.put(BASE_URL + 'article',{
            id: state.id,
            title: state.title,
            genre: state.genre.split(','),
            summary: state.summary,
            body: state.body,
            update_id: authorId,
            }).then(resp => {
                if(state.image){
                    // 画像がある場合
                    uploadImage(state.id, state.image,getFirebase).then(resp => {
                        dispatch({ type: POST_ARTICLE, state});
                    }).catch((err) => {
                        dispatch({ type: POST_ARTICLE_ERROR, err})
                    });
                }
                dispatch({ type: POST_ARTICLE, state});
            }).catch((err) => {
                dispatch({ type: POST_ARTICLE_ERROR, err})
            });
    }
};

export const updateIsDelete = (id,is_delete) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        is_delete = is_delete === 'true' ? false : true
        const firestore = getFirestore();
        firestore.collection('articles').doc(id).update({
            is_delete:is_delete
        }).then(()=> {
            dispatch({type:UPDATE_ISDELETE})
        }).catch((err) => {
            dispatch({type:UPDATE_ISDELETE_ERROR,err})
        })  
    }
}

export const deleteArticle = (id) =>{
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('articles').doc(id).delete().then(() =>{
            dispatch({ type: DELETE_ARTICLE})
        })
    }
} ;

async function uploadImage(id,image,getFirebase){
    const image_url = getImageUrl(image[0]);
    const storageRef = getFirebase().storage().ref().child('/' + id + '/' + image_url);
    const blob = new Blob(image, { type: "image/jpeg" });
    const url = await storageRef.put(blob).then(() => storageRef.getDownloadURL().then(url => {return url }));
    const resp  = await axios.put(BASE_URL + 'article/imageurl', {id:id,url:url}).then(resp => {return resp});
    return resp;
}

function getImageUrl(image){
    const l = 8;

    const c = "abcdefghijklmnopqrstuvwxyz0123456789";

    let cl = c.length;
    let r = "";
    for(var i=0; i<l; i++){
        r += c[Math.floor(Math.random()*cl)];
    }
    r += ('.' + image.name.split('.').slice(-1)[0]);
    return r;
}