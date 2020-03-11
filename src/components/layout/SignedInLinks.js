import React from 'react'
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";

const SignedInLinks = (props) => {
    return(
        <React.Fragment>
            <NavLink to='/post' className='navbar-item'><i className="fas fa-paper-plane icon-margin"></i><span className='subtitle is-6'>Post</span></NavLink>
            <NavLink to='/auth/main' className='navbar-item'><i className="fas fa-tasks icon-margin"></i><span className='subtitle is-6'>Management</span></NavLink>
            <div className='navbar-item'><span className='title is-6 icon-margin'>{props.profile.name}</span></div>
            <a href='/' onClick={props.signOut} className='navbar-item'><i className="fas fa-sign-out-alt icon-margin"></i><span className='subtitle is-6'>Logout</span></a>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);