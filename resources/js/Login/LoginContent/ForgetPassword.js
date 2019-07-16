import React, { Component } from 'react'
import './BeforeAndAfterLogin.scss';

export default class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()
        console.log(this.state.email);

        if(this.state.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            document.querySelector(".reset_message").innerHTML="We've sent a password reset link to the email address.";
        }else{
            document.querySelector(".reset_message").innerHTML="Invalid email address.";
        }
    }


    render () {
        return (
            <>
            <div id="login-wrap">
            <form onSubmit={this.onSubmit} className="contact-form">
                <div className="big-icon">
                    <img src="img/icon/reset.svg" alt="garbage" className="big"/>
                </div>

                <h2>- Reset the Password -</h2>
                <br/>
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
                        <div className="reset_message"></div>
                    </div>

                    <div className="form-send">
                        <button type="" className="btn btn-green">
                            Reset your password to send email
                        </button>
                    </div>
                </form>
            </div>
            </>
        )
    }
}
