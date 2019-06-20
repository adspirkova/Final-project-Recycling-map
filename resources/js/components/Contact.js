import React, { Component } from 'react'

export default class Contact extends Component {
    
    render () {
        return (          
    <div className="contact-wrap">
    <div className="contact-form2">
      <div className="contact-title">

        <div className="big-icon">
          <img src="img/icon/problem5.svg" alt="garbage" className="big"/>
        </div>

        <h2>- Feed Back Form -</h2>
      </div>
      <br/>
      <form className="contact-form php-mail-form" role="form" action="contactform/contactform.php" method="POST">

        <div className="form-group">
          <img src="img/icon/map2.svg" alt="location" className="contact-icon"/>
          <label for="contact-name">Location</label>
          <input type="name" name="name" className="form-control" id="contact-name" placeholder="Your Name" data-rule="minlen:3" data-msg="Please enter at least 3 chars" />
          <div className="validate"></div>
        </div>

        <div className="form-group">
            <img src="img/icon/problem1.svg" alt="location" className="contact-icon"/>
            <label for="contact-name">Choose the problem.</label>
            <div className="icons">
              <img src="img/icon/waste.svg" alt="location" className="contact-icon2"/>
              <img src="img/icon/map1.svg" alt="location" className="contact-icon2"/>
              <img src="img/icon/3-glass.svg" alt="location" className="contact-icon2"/>
              <img src="img/icon/map2.svg" alt="location" className="contact-icon2"/>
              <img src="img/icon/login.svg" alt="location" className="contact-icon2"/>
              <img src="img/icon/map1.svg" alt="location" className="contact-icon2"/>
            </div>
          <div className="validate"></div>
        </div>

        <div className="form-group">
          <img src="img/icon/contact2.svg" alt="location" className="contact-icon"/>
          <label for="contact-message">Your Message</label>
          <textarea className="form-control" name="message" id="contact-message" placeholder="Your Feedback" rows="5" data-rule="required" data-msg="Please write something for us"></textarea>
          <div className="validate"></div>
        </div>

        <div className="form-group">
            <img src="img/icon/message1.svg" alt="location" className="contact-icon"/>
            <label for="uploadFile">Add a file or picture.</label>
            <input type="file" name="upload" size="30"/>
          <div className="validate"></div>
        </div>

        <div className="form-group">
            <input id="box1" type="checkbox" />
            <label for="contact-agree">I agree with terms & conditions.</label>

          <div className="validate"></div>
        </div>

        <div className="loading"></div>
        <div className="error-message"></div>
        <div className="sent-message">Your message has been sent. Thank you!</div>

        <div className="form-send">
          <button type="submit" className="btn btn-large">Send Message</button>
        </div>

      </form>
    </div>
  </div>


        )
        
    }
}
