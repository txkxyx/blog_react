import React, {Component} from 'react';
import { connect } from 'react-redux';
import {postArticle, draftArticle} from '../../actions/articleActions';
import { Redirect } from "react-router-dom";
import  SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

class PostArticle extends Component{
    state = {
        title:'',
        image:'',
        genre:'',
        summary:'',
        body:'',
        insert_date:'',
        insert_id:'',
        update_date:'',
        update_id:'',
        is_delete:false,
        version:0
    }

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
            'body':e
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.postArticle(this.state);
        this.props.history.push('/');
    }

    handleDraftSubmit = (e) => {
        e.preventDefault();
        this.props.draftArticle(this.state);
        this.props.history.push('/');
    }


    render(){
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin' />
        return(
            <section className="section">
                <div className="container">
                    <div className="column is-10 is-offset-1">
                        <h3 className="title is-2 has-text-centered">Post</h3>
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="field">
                                <label htmlFor="title" className="label">タイトル</label>
                                <input type="text" className="input" placeholder="Title" id="title" onChange={this.handleChange}/>
                            </div>
                            <div className="field">
                                <label htmlFor="image" className="label">画像</label>
                                <input type="file" className="input" id="image" onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="genre" className="label">ジャンル</label>
                                <input type="text" className="input" placeholder="Python, Java" id="genre" onChange={this.handleChange}/>
                            </div>
                            <div className="field">
                                <label htmlFor="summary" className="label">概要</label>
                                <textarea className="textarea" placeholder="これはJavaの記事です" id="summary" max="150" rows="3" onChange={this.handleChange}></textarea>
                            </div>
                            <div className="field">
                                <label htmlFor="body" className="label">本文</label>
                                <SimpleMDE id="body" onChange={this.handleChangeBody} />
                            </div>
                            <div className="column is-half is-offset-one-quarter has-text-centered">
                                <button className="button is-info confirm" form='draft'>Draft</button>
                                <button className="button is-primary confirm" >Post</button>
                            </div>
                        </form>
                        <form onSubmit={this.handleDraftSubmit} id='draft'></form>
                    </div>
                </div>
            </section>   
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        postError: state.article.postError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        postArticle: (article) => dispatch(postArticle(article)),
        draftArticle: (article) => dispatch(draftArticle(article))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostArticle)