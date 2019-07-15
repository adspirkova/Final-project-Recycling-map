import React, { Component } from 'react'
import './Contact.scss';


// ******* For the images Start ************
const images = ["img/icon/waste.svg","img/icon/map1.svg","img/icon/3-glass.svg","img/icon/map2.svg","img/icon/login.svg","img/icon/map1.svg"];

class Li extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = { clicked: false };
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
      this.setState({ clicked: !this.state.clicked });
    }

    render() {
      const {image} = this.props;
      const background = this.state.clicked ? "#ECE2DD" : "transparent";
      return <img src = {image} style={{ background }} onClick={this.handleClick} className="contact-icon2" alt="problems"/>
    }
  }
// ******* For the images End ************

export default class Contact extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: '',
            problem: '',
            message: '',
            file:'',
            agree:false
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const send = {
            location: this.state.location,
            problem: this.state.problem,
            message: this.state.message,
            file: this.state.file,
            agree: this.state.agree,
        }

    }


    render () {
        return (
            <div className="contact-wrap">
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
                            <label htmlFor="contact-name">Location</label>
                            <input type="text"
                                    className="form-control"
                                    name="location"
                                    id="contact-name"
                                    onChange={this.onChange}
                                    value={ this.state.email }
                                    placeholder="The location"
                                    data-rule="minlen:3"
                                    data-msg="Please enter at least 3 chars" />
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <img src="img/icon/problem1.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="contact-name">Choose the problem.</label>
                            <div className="icons">
                                { images.map((image, index) => <Li key={`${image}-${index}`} image={image}/>) }
                            </div>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <img src="img/icon/contact2.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="contact-message">Your Message</label>
                            <textarea className="form-control"
                                        name="message"
                                        id="contact-message"
                                        onChange={this.onChange}
                                        value={ this.state.message }
                                        placeholder="Your Feedback"
                                        rows="5"
                                        data-rule="required"
                                        data-msg="Please write something for us"></textarea>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <img src="img/icon/message1.svg" alt="location" className="contact-icon"/>
                            <label htmlFor="uploadFile">Add a file or picture.</label>
                            <input type="file" name="upload" size="30"/>
                            <div className="validate"></div>
                        </div>

                        <div className="form-group">
                            <input id="box1" type="checkbox" />
                            <label htmlFor="contact-agree">I agree with terms & conditions.</label>
                            <br/>
                            <div className="form-send">
                                <button type="submit" className="btn btn-large">Send Message</button>
                            </div>
                        </div>
                        <br/><br/><br/>
                        <div className="loading"></div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                    </form>
             </div>
        )
    }
}
