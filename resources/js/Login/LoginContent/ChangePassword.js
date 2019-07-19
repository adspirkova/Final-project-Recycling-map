import React, { Component } from 'react';
import {changePassword} from './UserFunctions';
import './BeforeAndAfterLogin.scss';

export default class ChangePassword extends Component {
    constructor(){
        super()
        this.state={
            inputCurrentPassword:'',
            newPassword1:'',
            newPassword2:'',
        }
    }

    //define the value of variable from input field
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    //change the password
    onSubmit(e){
        e.preventDefault()

        // make sure the validation***************
        if( (this.state.newPassword1.length < 8) || (this.state.newPassword2.length < 8) ){
            document.querySelector(".validate_newPassword1").innerHTML="Password should be more than 8 letters.";
            document.querySelector(".validate_newPassword2").innerHTML="Password should be more than 8 letters.";
        };

        if(this.state.newPassword1 !== this.state.newPassword2){
            document.querySelector(".validate_newPassword3").innerHTML="New passwords don't match.";
        };
        // Valid ok and change password***************
        if((this.state.newPassword1.length > 8) && (this.state.newPassword2.length > 8) && (this.state.newPassword1 === this.state.newPassword2)){

            changePassword({
                current: this.state.inputCurrentPassword,
                new: this.state.newPassword1
            })
            .then(res => {
                console.log(res.data);
                document.querySelector(".validate_passwordChanged").innerHTML="Password has changed.";
                alert("Password has changed.");
            })
            .catch(error =>{
                document.querySelector(".validate_passwordChanged").innerHTML="Error";
                if(error.response.status === 403){
                    document.querySelector(".validate_currentPassword").innerHTML="Current password is incorrect.";
                }
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            })
        };
    }


    render () {
        return (
            <div id="contact-wrap">
                <form noValidate onSubmit={(e)=>{this.onSubmit(e)}} className="contact-form">
                <div className="big-icon">
                    <img src="/img/icon/password.svg" alt="garbage" className="big"/>
                </div>

                <h2>- Change password -</h2>
                <br/><br/>

                    <div className="form-group">
                        <label htmlFor="current-password">Current Password</label>
                        <input
                        type="password"
                        name="inputCurrentPassword"
                        className="form-control"
                        onChange={(e)=>{this.onChange(e)}}
                        id="contact-password"
                        placeholder="Current Password"
                        data-rule="password"
                        data-msg="Please enter the current password"/>
                        <div className="validate_currentPassword"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input
                        type="password"
                        name="newPassword1"
                        className="form-control"
                        onChange={(e)=>{this.onChange(e)}}
                        id="contact-password2"
                        placeholder="New Password"
                        data-rule="email"
                        data-msg="Please enter your new password1"/>
                        <div className="validate_newPassword1"></div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                        type="password"
                        name="newPassword2"
                        className="form-control"
                        onChange={(e)=>{this.onChange(e)}}
                        id="confirm-password"
                        placeholder="Re-enter Password"
                        data-rule="email"
                        data-msg="Please enter new password again"/>
                        <div className="validate_newPassword2"></div>
                        <div className="validate_newPassword3"></div>
                    </div>
                    <br/>

                    <div className="validate_passwordChanged"></div>

                    <div className="form-send">
                            <button type="submit" className="btn btn-green">
                                Change the password
                            </button>
                    </div>
                    <br/><br/><br/><br/>
                </form>
            </div>
        )
    }
}
