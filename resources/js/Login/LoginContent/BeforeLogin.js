import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import {login} from './UserFunctions';
import './BeforeAndAfterLogin.scss';

import UserPage from './UserPage';
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
                    console.log("login!");
                }
            })
            .catch(err =>{
                console.log(err)
            })

    }

    render () {
        return (
        <>
        <>
        <BrowserRouter>
            <Route path="/new" component={NewAccount} />
            <Route path="/reset" component={ForgetPassword} />
            {/* <Route path="/userpage" component={UserPage} /> */}
        </BrowserRouter>
        </>
        <div id="login-wrap">
        <form noValidate onSubmit={this.onSubmit} className="contact-form">

            <div className="big-icon">
                <img src="img/icon/waste.svg" alt="garbage" className="big"/>
            </div>

            <h2>- Login Page -</h2>
            <br/>

            <div className="box">
              <div className="box-img">
                <img src="img/icon/question.svg" alt="question" className="smallIcon"/>
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
                    value={ this.state.email }
                />
                <div className="validate"></div>
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
                    onChange={ this.onChange }
                    value={ this.state.password }
                />
                <div className="validate"></div>
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

// What Honza code***********************************************

// import React, { Component } from 'react';
// import { BrowserRouter, Link, Route } from 'react-router-dom';
// import './BeforeAndAfterLogin.scss';

// import UserPage from './UserPage';
// import ForgetPassword from './ForgetPassword';
// import NewAccount from './NewAccount';

// export default class BeforeLogin extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             clicked: false
//         }
//     }

//     valueChanged(key, value){
//         console.log(key, value);
//         this.setState((state) => {
//             state[key] = value;
//             return state;
//         })
//     }

//     tryLogin(ev){
//         ev.preventDefault();
//         fetch('http://www.recycling-bins.localhost:8080/api/login', {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json; charset=utf-8",
//                 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//                 // "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: JSON.stringify({
//                 email:this.state.email,
//                 password:this.state.password
//             })
//         })
//         .then(function(response) {
//             return response.json(); // parses response as JSON
//         })
//         .then(function(data) {
//             console.log(data);
//         });

//         // console.log("loginFail");
//     }

//     render () {
//         return (
//         <>
//             <>
//             <BrowserRouter>
//               <Route path="/new" component={NewAccount} />
//               <Route path="/reset" component={ForgetPassword} />
//               <Route path="/userpage" component={UserPage} />
//             </BrowserRouter>
//             </>
//         <div id="login-wrap">
//         <form className="contact-form php-mail-form" role="form" action="/login" method="POST">

//             <div className="big-icon">
//                 <img src="img/icon/waste.svg" alt="garbage" className="big"/>
//             </div>

//             <h2>- Login Page -</h2>
//             <br/>

//             <div className="box">
//               <div className="box-img">
//                 <img src="img/icon/question.svg" alt="question" className="smallIcon"/>
//               </div>
//               <div className="box-text">
//                 <p>What Can you do after Login?</p>
//               </div>
//               <br/>
//               <div className="box-text">
//                 <p> → Adding the new bin to the map.</p>
//                 <p> → Adding the bin to the favorite list.</p>
//               </div>
//             </div>

//             <div className="form-group">
//                 <label htmlFor="contact-email">Your Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     id="contact-email"
//                     placeholder="Your Email"
//                     data-rule="email"
//                     data-msg="Please enter a valid email"
//                     onChange={ (ev) => this.valueChanged('email', ev.target.value) }
//                     value={ this.state.email }
//                 />
//                 <div className="validate"></div>
//             </div>

//             <div className="form-group">
//                 <label htmlFor="contact-email">Password</label>
//                 <input
//                     type="password"
//                     name="password"
//                     className="form-control"
//                     id="contact-password"
//                     placeholder="Your Password"
//                     data-rule="email"
//                     data-msg="Please enter your password"
//                     onChange={ (ev) => this.valueChanged('password', ev.target.value) }
//                     value={ this.state.password }
//                 />
//                 <div className="validate"></div>
//             </div>

//             <p>
//                 <Link to="/reset">Forget the password</Link>&nbsp;or&nbsp;
//                 <Link to="/new">Create the new account</Link> ?<br/>
//                 <Link to="/userpage">Temporary Login Page(Delete later!)</Link>
//             </p>
//             <br/>

//             <div className="form-send">

//             <a href="#" onClick={(props)=>{
//                 this.setState({
//                     page: 'afterlogin'
//                 })
//             }}>
//                 <button type="submit" className="btn btn-green" onClick={ (ev) => this.tryLogin(ev) }>
//                     Login
//                 </button>
//             </a>
//             </div>
//           </form>
//         </div>
//         </>

//         )
//     }
// }

