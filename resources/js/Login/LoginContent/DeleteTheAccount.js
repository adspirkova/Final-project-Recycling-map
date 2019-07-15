import React, { Component } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './BeforeAndAfterLogin.scss';
import UserPage from './UserPage';
import AfterDelete from './AfterDelete';

export default class DeleteTheAccount extends Component {

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
            <div className="big-icon">
                <img src="img/icon/logout.svg" alt="garbage" className="big"/>
            </div>

            <h2>- Delete account -</h2>
            <div className="box2">

                <div className="box-text">
                    <Link to="/userpage">
                        <button type="submit" className="btn btn-gray">
                            <img src="img/icon/login.svg" alt="logout" className="smallIcon" style={{width:'30px'}}/>
                            &ensp;Back to the user page
                        </button>
                    </Link>
                </div>

                <br/>

                <div className="box-text">
                    <Link to="/deletedone">
                        <button type="submit" className="btn btn-gray">
                            <img src="img/icon/problem3.svg" alt="question" className="smallIcon" style={{width:'30px'}}/>
                            <span className="red">&ensp;I'm sure to Delete the account</span>
                        </button>
                    </Link>
                </div>
                <br/><br/><br/><br/><br/><br/>
            </div>
        </div>
         </>
        )
    }
}
