import React, { Component } from 'react'
import BeforeLogin from './LoginContent/BeforeLogin';
import AfterLogin from './LoginContent/AfterLogin';
import NewAccount from './LoginContent/NewAccount';
import ForgetPassword from './LoginContent/ForgetPassword';


// export default class Login extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             page: 'beforelogin',
//             index: true
//         }
//     }
//     render (props) {
//        return (
//             <div id="login-wrap">


//             {
//                 ((props)=>{
//                 if(this.state.page == 'beforeLogin')
//                         return (<BeforeLogin page={this.state.page}/>);
//                     else if(this.state.page == 'afterLogin')
//                         return (<AfterLogin/>);
//                     else if(this.state.page == 'newaccount')
//                         return (<NewAccount/>)
//                     else if(this.state.page == 'forgetpassword')
//                         return (<ForgetPassword/>)
//                 })()
//             }
//             </div>
//         )
//     }
// }

