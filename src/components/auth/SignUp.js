import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../actions/authActions';

class SignUp extends Component{
    state = {
        email: '',
        password: '',
        confpassword:'',
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.signUp(this.state);
    }

    render(){
        const { auth } = this.props;
        if(!auth.uid) return <Redirect to='/signin'/>
        return(
            <section className="section">
                <div className="container">
                    <div className="column is-half is-offset-one-quarter">
                        <h3 className="title is-2 has-text-centered">SignUp</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label className="label">Email</label>
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="email" placeholder="Email" id="email" onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <label className="label">Name</label>
                                <p className="control has-icons-left has-icons-right">
                                    <input className="input" type="text" placeholder="Name" id="name" onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <label className="label" for="password">Password</label>
                                <p className="control has-icons-left">
                                    <input className="input" type="password" placeholder="Password" id="password" onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <label className="label" for="conf_password">Configration Password</label>
                                <p className="control has-icons-left">
                                    <input className="input" type="password" placeholder="Password" id="confpassword" onChange={this.handleChange}/>
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                    </span>
                                </p>
                            </div>
                            <div className="column is-half is-offset-one-quarter has-text-centered">
                                <button className="button is-primary confirm">SignUp</button>
                            </div>
                            <div>TODO modal</div>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);