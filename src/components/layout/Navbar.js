import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from "react-redux";
import { getArticles } from '../../actions/articleActions';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.getArticles('','init');
        this.props.history.push('/articles');
    }

    handleClickBurger = (e) => {
        e.preventDefault();
        let item = document.getElementById('items');
        if(item.classList.contains('is-active')){
            item.classList.remove('is-active');
        }else{
            item.classList.add('is-active');
        }

    }

    render(){
        const { auth, profile } = this.props;
        const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>
        return(
            <nav className="navbar is-white header">
                <div className='container'>
                <div className="navbar-brand">
                    <Link to='/' className="has-text-dark"><h1 className="title header-title">Dug out</h1></Link>
                    <div className="navbar-burger burger" data-target="items" onClick={this.handleClickBurger}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div id="items" className="navbar-menu">
                    <div className="navbar-end">
                        <Link to='/' className="navbar-item"><i className="fas fa-home icon-margin"></i><span className='subtitle is-6'>Home</span></Link>
                        <Link to='/articles' className="navbar-item"><i className="fas fa-newspaper icon-margin"></i><span className='subtitle is-6'>Blog</span></Link>
                        <a href='https://twitter.com/okm_tky' className="navbar-item" target="_blank" rel="noreferrer noopener"><i className="fas fa-envelope icon-margin"></i><span className='subtitle is-6'>Contact</span></a>
                        { links }
                    </div>
                </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getArticles: (keyword,way) => dispatch(getArticles(keyword,way))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));