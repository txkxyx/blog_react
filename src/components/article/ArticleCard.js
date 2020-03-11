import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const ArticleCard = ({article}) => {
    return(
        <div className="card card-margin">
            <div className="card-image image-center">
                <figure className='image is-2by1'>
                    <img src={article.image} alt="subtitle" />
                </figure>
            </div>
            <div className='card-content'>
                <div className="media">
                    <div className="media-content">
                        <div className="title is-size-4 has-text-black"><strong>{article.title}</strong></div>
                        <div className="subtitle is-6 has-text-dark"><i className="fas fa-tag "></i>
                                { article.genre && article.genre.map((g) => {
                                return(
                                        <span className="tag genre-margin" key={g}>
                                            <span to="/" className="subtitle is-6 has-text-dark">{g}</span>
                                        </span>
                                )
                            })} 
                        </div>
                        <div>{article.summary}</div>
                        <div className="is-size-7  has-text-dark is-pulled-right date-margin"><i className="fas fa-sync-alt icon-date-margin"></i>{moment(article.update_date).calendar()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard