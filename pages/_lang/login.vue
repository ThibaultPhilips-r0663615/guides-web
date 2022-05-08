<template>
<v-app>
    <main>
        <article class="lol-login-form marginTopLarge marginBottomLarge">
            <div class="lol-login-form-content tw-p-12">
                <h1>{{this.$store.state.auth.user}}</h1>
                <div v-if="hasLoginApiErrorOccured && !loginDataBeingTransmitted">
                    <p>An error occured whilst receiving the data.</p>
                    <p>If this is a reoccuring problem then please send us the following code: '{{errorCode}}'</p>
                </div>
                <div v-if="hasSentIncorrectCredentials && !loginDataBeingTransmitted">
                    <p>The credentials were incorrect.</p>
                </div>
                <v-form ref="loginForm" v-model="isFormValid" v-show="!loginDataBeingTransmitted">
                    <h1>{{userEmail}}</h1>
                    <v-row>
                        <v-col>
                            <v-text-field :id="`email`" @change="formInputChanged" :name="`email`" :error="this.hasSentIncorrectCredentials" :autocomplete="`email`" v-model="email" :rules="emailRules" color="#293618" label="Email*" hint="exmaple@example.com" persistent-hint></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field @change="formInputChanged" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :error="this.hasSentIncorrectCredentials" :rules="passwordRules" :type="showPassword ? 'text' : 'password'" color="#293618" name="password" label="Password*" hint="At least 8 characters" v-model="password" @click:append="showPassword = !showPassword"></v-text-field>
                        </v-col>
                    </v-row>
                    <small>*indicates required field</small>
                    <v-card-actions class="tw-mt-16">
                        <v-spacer></v-spacer>
                        <v-btn color="#293618" text @click="handleFormSubmitValidateForm" :disabled="!isFormValid">
                            Login
                        </v-btn>
                    </v-card-actions>
                </v-form>
                <loading-animation :showAnimation="loginDataBeingTransmitted" />
            </div>
        </article>
    </main>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import {
    mapGetters
} from 'vuex'
import axios from 'axios';
import VueCookies from 'vue-cookies'
import LoadingAnimation from '~/components/LoadingAnimation.vue';
Vue.use(VueCookies, {
    expire: '7d'
})

const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Vue.extend({
    layout(context: any) {
        return 'genericLayout'
    },
    components: {
        LoadingAnimation
    },
    name: 'LoginPage',
    data() {
        return {
            loginDataBeingTransmitted: false,
            hasLoginApiErrorOccured: false,
            hasSentIncorrectCredentials: false,
            errorCode: '',
            email: '',
            password: '',
            showPassword: false,
            isFormValid: false,
            emailRules: [
                (email: any) => !!email || 'Email is required.',
                (email: any) => (!!email && email.length <= 100 && email.length >= 3) || 'Email must be between 3 and 100 characters.',
                (email: any) => (!!email && emailPattern.test(email)) || 'Email is not valid.'
            ],
            passwordRules: [
                (password: any) => !!password || 'Password is required.',
                (password: any) => (!!password && password.length <= 50 && password.length >= 1) || 'Password must be between 1 and 50 characters.',
            ]
        }
    },
    computed: {
        locale(): any {
            return this.$store.state.locale
        },
        userEmail(): any {
            return this.$store.state.auth.user?.email
        }
    },
    async asyncData() {
    },
    methods: {
        formInputChanged() {
            this.hasSentIncorrectCredentials = false;
        },
        handleFormSubmitValidateForm() {
            let result = (this.$refs.loginForm as Vue & {
                validate: () => boolean
            }).validate()

            if (result) {
                this.loginDataBeingTransmitted = true;
                this.hasSentIncorrectCredentials = false;
                this.$store.dispatch('auth/login', {email: this.email, password: this.password})
                    .then((res) => {
                        this.$router.push(`/${this.$store.state.locale}`)
                    })
                    .catch((error) => {
                        if (error.response) {
                            switch (error.response.status) {
                                case 400 || 404:
                                    this.errorCode = error.response.data.id;
                                    this.hasLoginApiErrorOccured = true;
                                    break;
                                case 401 || 403:
                                    this.errorCode = error.response.data.id;
                                    this.hasSentIncorrectCredentials = true;
                                    break;
                                default:
                                    this.errorCode = error.response.data.id;
                                    this.hasLoginApiErrorOccured = true;
                            }
                        } else {
                            console.log('Error', error.message);
                        }
                    })
                    .finally(() => {
                        this.loginDataBeingTransmitted = false;
                    })
            };
            return;
        }
    }
})
</script>

<style lang="scss" scoped>
.lol-login-form {
    width: 100%;

    .lol-login-form-content {
        width: 50%;
        margin: 0 auto;
        background: #f2f2f2;
    }
}
</style>
