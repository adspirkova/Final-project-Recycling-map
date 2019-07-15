import React, { Component } from 'react'
import './BeforeAndAfterLogin.scss';

export default class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            email: '',
            password: '',
        }
    }

    render () {
        return (
            <>
            <div id="login-wrap">
                <form className="contact-form php-mail-form" role="form" action="/login" method="POST">
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
                            // onChange={ (ev) => this.valueChanged('email', ev.target.value) }
                            value={ this.state.email }
                        />
                    </div>

                    <div className="form-send">
                        <a href="/AfterLogin">
                            <button type="" className="btn btn-green">
                                Reset your password to send email
                            </button>
                        </a>
                    </div>
                </form>
            </div>
            </>
        )
    }
}
