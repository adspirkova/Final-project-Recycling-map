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

export const changePassword = data => {
    return axios
    .post('api/change',data,{
        headers:{
            Authorization: `Bearer ${localStorage.usertoken}`,
            'Content-Type': 'application/json'
        }
    })
}

export const deleteUser = data => {
    return axios
    .post('api/delete',data,{
        headers:{
            Authorization: `Bearer ${localStorage.usertoken}`,
            'Content-Type': 'application/json'
        }
    })
}

