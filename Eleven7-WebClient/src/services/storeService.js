import axios from 'axios'


// class Employee {
   
//     constructor(id, first_name, last_name, email, phone){
//         this.id = id;
//         this.first_name = first_name;
//         this.last_name = last_name;
//         this.email = email;
//         this.phone = phone;
//     }
// }


const baseUrl = "http://localhost:3000/api/stores"

export const getAll = async function(){
    const response = await axios.get(baseUrl)
    return response.data;
}


export const getStoreById = async function(id){
    const response = await axios.get(baseUrl+'/'+id)
    return response.data;
}







