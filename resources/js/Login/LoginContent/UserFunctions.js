import axios from 'axios'

export const register = newUser => {
    return axios
    .post('api/register',newUser,{
        headers:{'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })
}

export const login = user => {
    return axios
    .post('api/login',{
        email:user.email,
        password:user.password
    },{
        headers:{'Content-Type':'application/json'}
        })

}

export const getProfile = () => {
    return axios
    .post('api/profile',{}, {
        headers: {Authorization: `Bearer ${localStorage.usertoken}`}
    })
}

export const changePassword = newPassword => {
    return axios
    .post('api/new',newPassword,{
        headers:{'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err =>{
        console.log(err)
    })
}

