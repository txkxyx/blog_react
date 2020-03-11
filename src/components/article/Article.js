import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import moment from 'moment';
import marked from 'marked';
import { Link } from 'react-router-dom';
import { getTagArticles, getArticle } from '../../actions/articleActions';
import Notifications from '../dashboard/Notifications';
import highlight from 'highlightjs';
import 'highlightjs/styles/docco.css'

const markrender = new marked.Renderer();
marked.setOptions({
    highlight: function (code, lang) {
        return highlight.highlightAuto(code, [lang.split(':')[0]]).value;
    }
});

class Article extends Component {
    componentDidMount(){
        this.props.getArticle(this.props.id);
    }

    handleOnClick = (e) => {
        e.preventDefault()
        this.props.getTagArticles(e.target.id);
        this.props.history.push('/articles/tag');
    }

    render(){
        const {article} = this.props;
        if(article){
            return(
            <section className="section">
                <div className="container" >
                    <div className='columns'>
                        <div className="column is-7 is-offset-1 contents has-background-white">
                            <p className="title is-6 has-text-left">
                                <i className="fas fa-tag"></i>
                                    { article.genre && article.genre.map(genre => {
                                        return(
                                            <Link onClick={this.handleOnClick} key={genre} >
                                                <span id={genre} className="tag genre-margin subtitle is-6 has-text-dark">{genre}</span>
                                            </Link>
                                        )
                                    })}    
                            </p>
                            <h3 className="title is-2 has-text-centered">{article.title}</h3>
                            <div className="has-text-right">
                                <h6 className="is-inline-block title is-7 " style={{marginRight: 5 + 'em'}}><i className="fas fa-paper-plane icon-date-margin" ></i>{moment(article.insert_date).calendar()}</h6>
                                <h6 className="is-inline-block title is-7 "><i className="fas fa-sync-alt icon-date-margin"></i>{moment(article.update_date).calendar()}</h6>
                            </div>
                            <figure className='image is-2by1'>
                                <img src={article.image} alt="subtitle" />
                            </figure>
                            <div id="body" className="content body-margin"><span dangerouslySetInnerHTML={{ __html: marked(article.body, { renderer: markrender })}}/></div>
                        </div>
                        <div className='column is-3'>
                            <Notifications/>
                        </div>
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

const mapDispatchToProps = (dispatch) => {
    return{
        getArticle: (id) => dispatch(getArticle(id)),
        getTagArticles: (genre) => dispatch(getTagArticles(genre))
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const article = state.article.search.article
    return{
        id: id,
        article: article
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Article)