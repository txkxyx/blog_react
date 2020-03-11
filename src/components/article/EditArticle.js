import React,{ Component } from 'react';
import  SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import { editArticle } from '../../actions/articleActions';
import firebase from '../../fbConfig';

class EditArticle extends Component{

    handleChange = (e) => {
        if(e.target.type === 'file'){
            this.setState({
                [e.target.id]:e.target.files
            })
        }else{
            this.setState({
                [e.target.id]:e.target.value
            })
        }
    }

    handleChangeBody = (e) => {
        this.setState({
            body:e
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.editArticle(this.state);
        this.props.history.push('/');
    }

    async componentDidMount(){
        await firebase.firestore().collection('articles').doc(this.props.id).get().then((doc) => {
            this.setState({
                id: doc.id,
                ...doc.data(),
                image:null,
                genre:doc.data().genre.join(',')
            })
        })
    }

    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/'/>
        if(this.state != null){
            return(
                <section className="section">
                    <div className="container">
                        <div className="column is-10 is-offset-1">
                            <h3 className="title is-2 has-text-centered">Edit</h3>
                            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                                <div className="field">
                                    <label htmlFor="title" className="label">タイトル</label>
                                    <input type="text" className="input" placeholder="Title" id="title" onChange={this.handleChange} defaultValue={this.state.title}/>
                                </div>
                                <div className="field">
                                    <label htmlFor="image" className="label">画像</label>
                                    <input type="file" className="input" id="image" onChange={this.handleChange} />
                                </div>
                                <div className="field">
                                    <label htmlFor="genre" className="label">ジャンル</label>
                                    <input type="text" className="input" placeholder="Python, Java" id="genre" onChange={this.handleChange} defaultValue={this.state.genre}/>
                                </div>
                                <div className="field">
                                    <label htmlFor="summary" className="label">概要</label>
                                    <textarea className="textarea" placeholder="これはJavaの記事です" id="summary" max="150" rows="3" onChange={this.handleChange}>{this.state.summary}</textarea>
                                </div>
                                <div className="field">
                                    <label htmlFor="body" className="label">本文</label>
                                    <SimpleMDE id="body" onChange={this.handleChangeBody} value={this.state.body}/>
                                </div>
                                <div className="column is-half is-offset-one-quarter has-text-centered">
                                    <button className="button is-primary confirm" >Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>  
            )
        }else{
            return(
            <div>
                <section className="section">
                    <div className="container">
                        <div className="column is-8 is-offset-2">
                            <progress class="progress is-small is-primary" max="100">15%</progress>
                        </div>
                    </div>
                </section>

                
            </div>
        )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const articles = state.firestore.data.articles;
    const article = articles ? articles[id] : null
    return{
        auth: state.firebase.auth,
        article: article,
        id:id,
        postError: state.article.postError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        editArticle: (article) => dispatch(editArticle(article)),
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect([{collection: 'articles'}]))(EditArticle);
