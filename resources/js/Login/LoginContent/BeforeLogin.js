import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import {login} from './UserFunctions';
import './BeforeAndAfterLogin.scss';

import ForgetPassword from './ForgetPassword';
import NewAccount from './NewAccount';

export default class BeforeLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors:{},
            clicked: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user)
            .then(res => {

                console.log(res.data);

                if(res.data.token){
                    this.props.handleAuth(res.data.token);
                    localStorage.setItem('usertoken',res.data.token)
                    this.props.history.push('/userpage')
                    document.querySelector(".validate_password1").innerHTML="";
                    console.log("login!");
                }
            })
            .catch(err =>{
                document.querySelector(".validate_password1").innerHTML="Incorrect email or password.";
                console.log(err);
            })

    }

    render () {
        return (
        <>
        <>
        <BrowserRouter>
            <Route path="/new" component={NewAccount} />
            <Route path="/reset" component={ForgetPassword} />
        </BrowserRouter>
        </>
        <div id="login-wrap">
        <form noValidate onSubmit={this.onSubmit} className="contact-form">

            <div className="big-icon">
                <img src="/img/icon/waste.svg" alt="garbage" className="big"/>
            </div>

            <h2>- Login Page -</h2>
            <br/>

            <div className="box">
              <div className="box-img">
                <img src="/img/icon/question.svg" alt="question" className="smallIcon"/>
              </div>
              <div className="box-text">
                <p className="pink">What Can you do after Login?</p>
              </div>
              <br/>
              <div className="box-text">
                <p> → Adding the new bin to the map.</p>
                <p> → Adding the bin to your favorite list.</p>
              </div>
            </div>

            <div className="form-group">
                <label htmlFor="contact-email">Your Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="contact-email"
                    placeholder="Your Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                    onChange={this.onChange}
                    value={this.state.email}
                />
                <div className="validate_email"></div>
            </div>

            <div className="form-group">
                <label htmlFor="contact-email">Password</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="contact-password"
                    placeholder="Your Password"
                    data-rule="email"
                    data-msg="Please enter your password"
                    onChange={this.onChange}
                    value={this.state.password}
                />
                <div className="validate_password1"></div>
            </div>

            <p>
                <Link to="/reset">Forget the password</Link>&nbsp;or&nbsp;
                <Link to="/new">Create the new account</Link> ?<br/>
            </p>

            <div className="form-send">
                <button type="submit" className="btn btn-green">
                    Login
                </button>
            </div>
            <br/><br/><br/>
          </form>
        </div>
        </>

        )
    }
}
