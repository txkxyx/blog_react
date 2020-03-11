import React, { Component } from 'react'
import ArticleList from '../article/ArticleList'
import Notifications from "./Notifications";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getArticlesOrdered } from '../../actions/articleActions';

class Dashboard extends Component{

    componentDidMount(){
        this.props.getArticlesOrdered(100,'update_date');
    }

    render(){
        if(this.props != null){
            const articles = this.props.articles;
            return(
                <React.Fragment>
                    <section className="section container">
                        <div className="columns">
                            <div className="column is-7 is-offset-1 is-paddingless">
                                <ArticleList articles={articles}/>
                            </div>
                            <div className="column is-3">
                                <Notifications/>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
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

const mapStateToProps = (state) => {
    return{
        articles: state.article.ordered_update.articles_ordere_updatedate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticlesOrdered: (limit,field) => dispatch(getArticlesOrdered(limit,field))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps)
)(Dashboard);