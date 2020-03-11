import React from 'react'
import ArticleCard from './ArticleCard'
import { Link } from 'react-router-dom'

const ArticleList = ({articles}) => {
    return(
        
        <React.Fragment>
                { articles && articles.map(article => {
                    return(
                        <Link to={'/article/' + article.id} key={article.id}>
                            <ArticleCard article={article}/>
                        </Link>  
                    )
                })}
        </React.Fragment>          
    )
}

export default ArticleList