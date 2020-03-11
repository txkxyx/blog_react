import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import NewArticleCard from '../article/NewArticleCard';
import { getArticles, getArticlesOrdered, getGenres, getTagArticles } from '../../actions/articleActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Notification extends Component{
    state = {
        keyword: ''
    }

    componentDidMount(){
        this.props.getArticlesOrdered(10,'insert_date');
        this.props.getGenres();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.getArticles(this.state.keyword,'search');
        this.props.history.push('/articles');
    }

    handleOnClick = (e) => {
        e.preventDefault()
        this.props.getTagArticles(e.target.id);
        this.props.history.push('/articles/tag');
    }

    render(){
        if(this.props != null){
            const { notification_articles, genres } = this.props
            return(
                <React.Fragment>
                    <nav className="panel is-white has-background-white">
                        <p className="panel-heading has-text-centered">
                            Search
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="panel-block">
                                <p className="control has-icons-left">
                                    <input className="input" id="keyword" type="text" placeholder="Keyword" onChange={this.handleChange}/>
                                    <span className="icon is-left">
                                        <i className="fas fa-search" aria-hidden="true"></i>
                                    </span>
                                </p>
                                <button className='button'>Search</button>
                            </div>
                        </form>
                        <p className="panel-heading has-text-centered">
                            Tags
                        </p>
                        <div className='columns'>
                            <div className='column is-10 is-offset-1'>
                            { genres && genres.map(genre => {
                                return (
                                    <Link onClick={this.handleOnClick} key={genre} >
                                        <span id={genre} className="tag genre-margin subtitle is-6 has-text-dark">{genre}</span>
                                    </Link>
                                )
                            })}
                            </div>
                        </div>
                    </nav>
                    <nav className="panel is-white has-background-white">
                        <p className="panel-heading has-text-centered">
                            New Articles
                        </p>
                        { notification_articles && notification_articles.map(article => {
                            return(
                                
                                    <NewArticleCard article={article}　key={article.id}/>
                                
                            )
                        })}
                    </nav>
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

const mapDispatchToProps = (dispatch) => {
    return{
        getArticlesOrdered: (limit,field) => dispatch(getArticlesOrdered(limit,field)),
        getArticles: (keyword,way) => dispatch(getArticles(keyword,way)),
        getTagArticles: (genre) => dispatch(getTagArticles(genre)),
        getGenres: () => dispatch(getGenres())
    }
}

const mapStateToProps = (state) => {
    return{
        notification_articles: state.article.ordered_insert.articles_ordere_insertdate,
        genres: state.article.genre.genres
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Notification));