import axios from 'axios'

const baseUrl = "http://localhost:3000/auth"
// export const getAll = async function(){
//   const response = await axios.get(baseUrl)
//   return response.data;
// }

export async function login(creds, context) {
      console.log("Login in :");
      let res = await axios.post(baseUrl+'/login', {
            email_address: creds.email_address,
            password: creds.password
        })
        .then(response => {
          console.log("logged in")
          localStorage.setItem('user',JSON.stringify(response.data.user))
          localStorage.setItem('jwt',response.data.token)
          return {status:response.status, err: response.data};
        })
        .catch(function (error) {
          return {status:error.response.status, err: error.response.data};
        });
      return res
}

export async function register(creds, context) {
      console.log("registering")
      let url = baseUrl+"/register"
      console.log(creds)
      //if(creds.is_admin != null || creds.is_admin == 1) url = baseUrl+"/register-admin"
      axios.post(url, creds)
      .then(response => {
        return {status:response.status, err: response.data};
      })
      .catch(error => {
        console.error(error);
        return {status:response.status, err: response.data};
      });
}
  
    // To log out, we just need to remove the token
export function logout() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
}
export async function checkAuth() {
      var jwt = localStorage.getItem('jwt');
      if(!jwt){
        console.log("No token found");
        return {valid:false};
      }
      let response = await axios.post(baseUrl+"/check", {token: jwt});
      if(!response.data.valid){
        console.log("Token is invalid");
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
      }
      return response.data;
      
}


