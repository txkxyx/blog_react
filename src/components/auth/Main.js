import React, { Component }  from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link, Redirect } from 'react-router-dom';
import { deleteArticle, updateIsDelete } from '../../actions/articleActions'

class Main extends Component{

    handleOnclick = (e) => {
        e.preventDefault();
        const result = window.confirm('削除してもよろしいですか？');
        if(result){
            this.props.deleteArticle(e.target.id);
        }
    }

    handleOpenOnClick= (e) => {
        e.preventDefault();
        const result = window.confirm('公開状態を変更してもよろしいですか？');
        const target = e.target.id.split('-')
        if(result){
            this.props.updateIsDelete(target[0],target[1])
        }
    }
    
    render(){
        const { articles, users, auth } = this.props;
        if(!auth.uid) return <Redirect to='/'/>
        return(
            <React.Fragment>
                <section className="section">
                    <div className="container">
                        <div className="column is-8 is-offset-2">
                            <h3 className="title is-2 has-text-centered">Management</h3>
                            <div>
                                <h4 className="is-inline-block title is-4 has-text-left">Users</h4>
                                <Link to="/signup" className="is-inline-block button is-small is-info" style={{marginLeft:10 + 'px'}}>New</Link>
                            </div>
                            
                            <div className="table-container">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Edit</th>
                                            <th>Password</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { users && users.map(user => {
                                            return(
                                                <tr>
                                                    <td>{user.name}</td>
                                                    <td>mail</td>
                                                    <td><Link to={'/user/' + user.id + '/edit'} className="button is-success" >Edit</Link></td>
                                                    <td><Link to={'/user/' + user.id + '/password'} className="button is-warning" >Change</Link></td>
                                                    <td><Link to={'/user/' + user.id + '/delete'} className="button is-danger" >Delete</Link></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h4 className="is-inline-block title is-4 has-text-left">Articles</h4>
                                <Link to="/post" className="is-inline-block button is-small is-info" style={{marginLeft:10 + 'px'}}>New</Link>
                            </div>
                            <div className="table-container">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Edit</th>
                                            <th>Open</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { articles && articles.map(article => {
                                            let isDelButtion;
                                            if(article.is_delete){
                                                isDelButtion = <button className='button is-warning is-light' form={article.id + '-' + article.is_delete}>Close</button>;
                                            }else{
                                                isDelButtion  = <button className='button is-warning ' form={article.id + '-' + article.is_delete}>Open</button>;
                                            }
                                            return(
                                                <tr>
                                                    <form onSubmit={this.handleOnclick} id={article.id}></form>
                                                    <form onSubmit={this.handleOpenOnClick} id={article.id + '-' + article.is_delete}></form>
                                                    <td>{ article.title }</td>
                                                    <td><Link to={'/article/' + article.id + '/edit'} className="button is-success" >Edit</Link></td>
                                                    <td>{isDelButtion}</td>
                                                    <td><button className="button is-danger" form={article.id}>Delete</button></td>
                                                </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.firestore.ordered.articles,
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteArticle: (id) => dispatch(deleteArticle(id)),
        updateIsDelete: (id, is_delete) => dispatch(updateIsDelete(id, is_delete))
    }
}

export default compose(connect(mapStateToProps,mapDispatchToProps),firestoreConnect(() => ['articles','users']))(Main)