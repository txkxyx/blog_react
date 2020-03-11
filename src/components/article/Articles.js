import React, { Component } from 'react'
import ArticleList from '../article/ArticleList'
import Notifications from '../dashboard/Notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getArticles } from '../../actions/articleActions';

class Articles extends Component{

    componentDidMount(){
        if(!this.props.articles){
            this.props.getArticles('');
        }
    }
    
    render(){
        const { articles } = this.props;
        const keyword = (this.props.keyword === '' || this.props.keyword === void 0) ? 'All Articles' :  "Search with '" + this.props.keyword + "'"
        return(
            <React.Fragment>
                <section className="section container">
                    <div className='has-text-centered'>
                        <h1 className='title'>{keyword}</h1>
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
        getArticles: (keyword) => dispatch(getArticles(keyword))
    }
}

const mapStateToProps = (state) => {
    return{
        articles: state.article.search.search_articles,
        keyword: state.article.search.keyword
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Articles);