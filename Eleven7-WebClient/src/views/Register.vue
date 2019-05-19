<template>
    <div>
        <h4>Register</h4>
        <form>
            <label for="first_name">First Name</label>
            <div>
                <input id="first_name" type="text" v-model="cred.first_name" required autofocus>
            </div>
            <label for="last_name">Last Name</label>
            <div>
                <input id="last_name" type="text" v-model="cred.last_name" required autofocus>
            </div>

            <label for="email_address" >E-Mail Address</label>
            <div>
                <input id="email_address" type="email" v-model="cred.email_address" required>
            </div>

            <label for="phone_number" >Phone Number</label>
            <div>
                <input id="phone_number" type="phone" v-model="cred.phone_number" required>
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="cred.password" required>
            </div>

            <label for="password-confirm">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" v-model="cred.password_confirmation" required>
            </div>

            <label for="password-confirm">Is this an administrator account?</label>
            <div>
                <select v-model="cred.is_admin">
                    <option value=1>Yes</option>
                    <option value=0>No</option>
                </select>
            </div>

            <div>
                <button type="submit" @click="handleSubmit">
                    Register
                </button>
            </div>
        </form>
    </div>
</template>

<script>
  import * as auth from '../services/auth'

    export default {
        data(){
            return {
              cred : {
                first_name : "",
                last_name : "",
                email_address : "",
                phone_number : "",
                password : "",
                password_confirmation : "",
                is_admin : null
              }
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()

                if (this.cred.password === this.cred.password_confirmation && this.cred.password.length > 0)
                {
                  auth.register(this.cred)
                } else {
                    this.cred.password = ""
                    this.cred.passwordConfirm = ""
                    

                    //REMPLACE WITH SNACKBAR
                    return alert("Passwords do not match")
                }
            }
        }
    }
</script>