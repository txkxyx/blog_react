import React, {Component} from 'react'
import { connect } from "react-redux";
import { signIn } from "../../actions/authActions";
import { Redirect } from 'react-router-dom'

class SignIn extends Component{
    state = {
        email:'',
        password: ''
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }

    render(){
        const { authError,auth } = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return(
            <section className="section">
                <div className="container">
                    <div className="column is-half is-offset-one-quarter">
                    <h3 className="title is-2 has-text-centered">Login</h3>
                    { authError ? 
                        <article class="message">
                            <div class="message-header has-background-danger">
                                <button class="delete" aria-label="delete"></button>
                            </div>
                            <div class="message-body">
                                {authError}
                            </div>
                        </article>
                    :null}
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
                        <label className="label" for="password">Password</label>
                        <p className="control has-icons-left">
                            <input className="input" type="password" placeholder="Password" id="password" onChange={this.handleChange}/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                            </span>
                        </p>
                        </div>
                        <div className="column is-half is-offset-one-quarter has-text-centered">
                        <button className="button is-primary">Login</button>
                        </div>
                    </form>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (credential) => dispatch(signIn(credential))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)