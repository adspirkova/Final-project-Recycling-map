import React, { Component } from 'react'

export default class Login extends Component {
    
    render () {
        return (          
            <div id="login-wrap">
            <form class="contact-form php-mail-form" role="form" action="contactform/contactform.php" method="POST">

            <div class="big-icon">
            <img src="img/icon/waste.svg" alt="garbage" class="big"/>
            </div>

            <h2>- Login Page -</h2>
            <br/>

            <div class="form-group">
              <label for="contact-email">Your Email</label>
              <input type="email" name="email" class="form-control" id="contact-email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email"/>
              <div class="validate"></div>
            </div>

            <div class="form-group">
              <label for="contact-email">Password</label>
              <input type="password" name="password" class="form-control" id="contact-email" placeholder="Your Password" data-rule="email" data-msg="Please enter your password"/>
              <div class="validate"></div>
            </div>

            <p><a href="#forget-password">Forget the password</a> or
                <a href="#create-account">create the new account</a> ?</p>
            <br/>

            <div class="form-send">
              <button type="submit" class="btn btn-green">Login</button>
            </div>

          </form>
        </div>

        )
        
    }
}
