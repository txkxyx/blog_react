import React, { Component } from 'react'
import ArticleList from '../article/ArticleList'
import Notifications from '../dashboard/Notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getTagArticles } from '../../actions/articleActions';

class TagArticles extends Component{

    
    render(){
        const { articles } = this.props;
        const genre = (this.props.genre === '' || this.props.genre === void 0) ? 'Please select a tag' : this.props.genre + " tag Articles"
        return(
            <React.Fragment>
                <section className="section container">
                    <div className='has-text-centered'>
                        <h1 className='title'>{genre}</h1>
                    </div>
                    <div className="columns">
                        <div className="column is-7 is-offset-1">
                            <ArticleList articles={articles}/>
                        </div>
                        <div className="column is-3">
                            <Notifications/>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getTagArticles: (genre) => dispatch(getTagArticles(genre))
    }
}

const mapStateToProps = (state) => {
    return{
        articles: state.article.search.tag_articles,
        genre: state.article.search.genre
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(TagArticles);