import React, { Component } from 'react';
import {register} from './UserFunctions';
import './BeforeAndAfterLogin.scss';

export default class NewAccount extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            email: '',
            password: '',
            password_confirmation: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }

        if(this.state.name.length < 2){
            document.querySelector(".validate_name").innerHTML="Name should be more than 2 letters.";
        }

        if(!this.state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            document.querySelector(".validate_email").innerHTML="Incorrect the email address.";
        }

        if(this.state.password.length < 8 && this.state.password_confirmation.length < 8){
            document.querySelector(".validate_password1").innerHTML="Password should be more than 8 letters.";
            document.querySelector(".validate_password2").innerHTML="Password should be more than 8 letters.";
        }

        if(this.state.password !== this.state.password_confirmation){
            document.querySelector(".validate_password2").innerHTML="These passwords don't match. Try again.";
        }

        if( (this.state.name.length > 2) && (this.state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) && (this.state.password.length >= 8) && (this.state.password_confirmation.length >= 8) && (this.state.password === this.state.password_confirmation))  {
                register(newUser).then(res=>{
                this.props.history.push(`/login`)
            })
            console.log("register");
        }
    }


    render () {
        return (
            <>
            <div id="login-wrap">
                <form noValidate onSubmit={this.onSubmit} className="contact-form">
                <div className="big-icon">
                    <img src="/img/icon/newAccount.svg" alt="garbage" className="big"/>
                </div>

                <h2>- Create Your Account -</h2>
                <br/>
                    <div className="form-group">
                        <label htmlFor="contact-email">Your Name</label>
                        <input
                            type="name"
                            name="name"
                            className="form-control"
                            id="contact-name"
                            placeholder="Your Name"
                            data-rule="email"
                            data-msg="Please enter a valid email"
                            onChange={this.onChange}
                        />
                        <div className="validate_name"></div>
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
                        />
                        <div className="validate_email"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="contact-password"
                        placeholder="Password"
                        data-rule="email"
                        data-msg="Please enter your new password"
                        onChange={this.onChange}
                        />
                        <div className="validate_password1"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        id="confirm-password"
                        placeholder="Re-enter Password"
                        data-rule="email"
                        data-msg="Please enter new password again"
                        onChange={this.onChange}
                        />
                        <div className="validate_password2"></div>
                    </div>

                    <div className="form-send">
                        <button type="" className="btn btn-green">
                            Create Your Account
                        </button>
                    </div>
                </form>
                <br/><br/><br/>
            </div>
            </>
        )
    }
}
