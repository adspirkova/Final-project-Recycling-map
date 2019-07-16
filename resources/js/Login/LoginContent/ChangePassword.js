import React, { Component } from 'react';
import {getProfile} from './UserFunctions';
import {changePassword} from './UserFunctions';
import './BeforeAndAfterLogin.scss';

export default class ChangePassword extends Component {
    constructor(){
        super()
        this.state={
            id:'',
            getCurrentPassword:'',
            currentPassword:'',
            newPassword:'',
            newPassword2:''
        }
    }

    componentDidMount(){
        getProfile().then(res=>{
            this.setState({
                id: res.data.user.id,
                getCurrentPassword: res.data.user.password,
            })
        })
        console.log("id:"+ this.state.id+"userPassword:"+ this.state.getCurrentPassword);
    }

    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        e.preventDefault()

        if((this.state.getCurrentPassword === this.state.currentPassword) && (this.state.newPassword === this.state.newPassword2)){
        const user = {
            password: this.state.newPassword
        }}else{
            alert("Please make sure your current Password and new Password.");
        }

    }


    render () {
        return (
            <div id="contact-wrap">
                <form noValidate onSubmit={this.onSubmit} className="contact-form">
                <div className="big-icon">
                    <img src="img/icon/password.svg" alt="garbage" className="big"/>
                </div>

                <h2>- Change password -</h2>
                <br/><br/>

                    <div className="form-group">
                        <label htmlFor="current-password">Current Password</label>
                        <input
                        type="password"
                        name="currentPassword"
                        className="form-control"
                        onChange={this.onChange}
                        id="contact-password"
                        placeholder="Current Password"
                        data-rule="password"
                        data-msg="Please enter the current password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        onChange={this.onChange}
                        id="contact-password2"
                        placeholder="New Password"
                        data-rule="email"
                        data-msg="Please enter your new password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                        type="password"
                        name="newPassword2"
                        className="form-control"
                        onChange={this.onChange}
                        id="confirm-password"
                        placeholder="Re-enter Password"
                        data-rule="email"
                        data-msg="Please enter new password again"/>
                    </div>
                    <br/>
                    <div className="form-send">
                        <a href="/AfterLogin">
                            <button type="submit" className="btn btn-green">
                                Change the password
                            </button>
                        </a>
                    </div>
                    <br/><br/><br/><br/>
                </form>
            </div>
        )
    }
}
