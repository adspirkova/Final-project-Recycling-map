import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import {deleteUser} from './UserFunctions';
import {getProfile} from './UserFunctions';
import './BeforeAndAfterLogin.scss';
import UserPage from './UserPage';
import AfterDelete from './AfterDelete';


class DeleteTheAccount extends Component {
    constructor(){
        super()
        this.state={
            id:''
        }
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    componentDidMount(){
        getProfile().then(res=>{
            console.log(res);
            this.setState({
                id: res.data.user.id,
            })
        })
    }

    onSubmit(e){
        e.preventDefault()

            deleteUser({
                name: 'deletedAccount' + this.state.id,
                email: 'deleted@deleted' + this.state.id,
                password: 'deletedAccount'
            })
            .then(res => {
                console.log(res.data);
                console.log("deleted");
                localStorage.removeItem('usertoken')
                this.props.handleAuth(null);
                this.props.history.push(`/deletedone`)
            })
            .catch(error =>{
                alert("Account Delete is failed");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            })
    };

    render () {
        return (
         <>
            <>
            <BrowserRouter>
              <Route path="/userpage" component={UserPage} />
              <Route path="/deletedone" component={AfterDelete} />
            </BrowserRouter>
            </>
        <div id="login-wrap">
            <form noValidate onSubmit={(e)=>{this.onSubmit(e)}} className="contact-form">
                <div className="big-icon">
                    <img src="/img/icon/logout.svg" alt="garbage" className="big"/>
                </div>

                <h2>- Delete account -</h2>
                <div className="box2">

                    <div className="box-text">
                        <Link to="/userpage">
                            <button type="submit" className="btn btn-gray">
                                <img src="/img/icon/login.svg" alt="logout" className="smallIcon" style={{width:'30px'}}/>
                                &ensp;Back to the user page
                            </button>
                        </Link>
                    </div>

                    <br/>

                    <div className="box-text">
                        {/* <Link to="/deletedone"> */}
                            <button type="submit" className="btn btn-gray">
                                <img src="/img/icon/problem3.svg" alt="question" className="smallIcon" style={{width:'30px'}}/>
                                <span className="red">&ensp;I'm sure to Delete the account</span>
                            </button>
                        {/* </Link> */}
                    </div>
                    <br/><br/><br/><br/><br/><br/>
                </div>
            </form>
        </div>
         </>
        )
    }
}

export default withRouter(DeleteTheAccount)
