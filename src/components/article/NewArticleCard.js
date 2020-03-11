import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { getArticle } from '../../actions/articleActions';
import { connect } from 'react-redux';

class NewArticleCard  extends Component{
    handleOncClickNewArtcile = (e) => {
        e.preventDefault();
        this.props.getArticle(this.props.article.id)
        this.props.history.push('/article/' + this.props.article.id);
    }

    render(){
        const { article } = this.props;
        return(
            <Link onClick={this.handleOncClickNewArtcile} id={article.id} key={article.id} className='panel-block'>
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={article.image} alt="subtitle"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="title is-size-6 has-text-black is-marginless"><strong>{article.title}</strong></div>
                        <div className="is-size-7  has-text-dark is-pulled-left date-margin"><i className="fas fa-paper-plane icon-date-margin"></i>{moment(article.insert_date).calendar()}</div>
                    </div>
                </div>
            </Link>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getArticle: (id) => dispatch(getArticle(id))
    }
}

export default withRouter(connect(null,mapDispatchToProps)(NewArticleCard));