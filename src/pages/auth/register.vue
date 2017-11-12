<template>
    <f7-page id="registerPopup">
        <f7-navbar theme="white">
            <f7-nav-left>
                <f7-link href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </f7-link>
            </f7-nav-left>
            <f7-nav-center :title="$t('app.register')"></f7-nav-center>
        </f7-navbar>
        <div class="page-content">
            <f7-list form>
                <!-- Text Input -->
                <f7-list-item>
                    <f7-icon slot="media" f7="person"></f7-icon>
                    <f7-input type="text" v-model="fullname" placeholder="Fullname"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-icon slot="media" f7="email_fill"></f7-icon>
                    <f7-input type="email" v-model="email" placeholder="Email"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-icon slot="media" f7="lock_fill"></f7-icon>
                    <f7-input type="password" v-model="password" placeholder="Password"/>
                </f7-list-item>
                <f7-list-item smart-select smart-select-searchbar style="color: #9c9c9c" title="Your car">
                    <f7-icon slot="media" f7="sort_fill"></f7-icon>
                    <select v-model="brand_model" name="models">
                        <optgroup v-for="brand in brands" :label="brand.name">
                            <option v-for="model in brand.models" :value="model.id">{{model.name}}</option>
                        </optgroup>
                    </select>
                </f7-list-item>
                <f7-list-item smart-select smart-select-searchbar style="color: #9c9c9c" title="Location (optional)">
                    <f7-icon slot="media" f7="world_fill"></f7-icon>
                    <select v-model="country" name="countries" @change="getCities()">
                        <option v-for="(value,key) in countries" :value="key">{{value}}</option>
                    </select>
                </f7-list-item>
                <f7-list-item v-show="country" smart-select smart-select-searchbar style="color: #9c9c9c"
                              title="City">
                    <f7-icon slot="media" f7="navigation_fill"></f7-icon>
                    <select v-model="city" name="cities">
                        <option v-for="city in cities" :value="city">{{city}}</option>
                    </select>
                </f7-list-item>
                <f7-list-item>
                    <f7-icon slot="media" f7="images_fill"></f7-icon>
                    <label class="file-select">
                        <div class="select-button">
                            <span v-if="value">Image: {{value.name}}</span>
                            <span v-else>Select Image</span>
                        </div>
                        <input type="file" id="cover" @change="onFileChange"/>
                    </label>
                </f7-list-item>

                <f7-list-item>
                    <label class="label-checkbox item-content">
                        <!-- Checked by default -->
                        <input type="checkbox" v-model="termsAccepted">
                        <div color="black" class="item-media">
                            <i class="icon icon-form-checkbox"></i>
                        </div>
                        <div class="item-inner">
                            <div class="item-title">Accept</div>
                            <div class="item-after">
                                <f7-link href="/terms/">Terms & Conditions</f7-link>
                            </div>
                        </div>
                    </label>
                </f7-list-item>
            </f7-list>
            <f7-block class="row">
                <div class="col-50">
                    <f7-button class="button-big" back color="white" bg="red">Cancel</f7-button>
                </div>
                <div class="col-50">
                    <f7-button @click="register" back class="button-big" color="white" bg="green">Register
                    </f7-button>
                </div>
            </f7-block>
        </div>
    </f7-page>
</template>
<script>
  import userService from '../../api/user'

  export default {
    data () {
      return {
        brand_model: this.brand_model,
        fullname: this.fullname,
        email: this.email,
        password: this.password,
        termsAccepted: this.termsAccepted,
        country: this.country,
        city: this.city,
        formData: new FormData(),
        value: null
      }
    },
    computed: {
      brands () {
        console.log(this.$store.state.brands)
        return this.$store.state.brands
      },
      countries () {
        return this.$store.state.countries
      },
      cities () {
        return this.$store.state.cities
      }
    },
    created () {
      this.$store.dispatch('getBrands')
      this.$store.dispatch('getCountries')
    },
    methods: {
      register () {
        let location = {
          'code': this.country,
          'country': this.countries[this.country],
          'city': this.city,
        }
        this.formData.append('fullname', this.fullname)
        this.formData.append('email', this.email)
        this.formData.append('password', this.password)
        this.formData.append('location', JSON.stringify(location))
        this.formData.append('model_id', this.brand_model)
        this.formData.append('termsAccepted', this.termsAccepted)
        this.$f7.showPreloader(this.$t('app.submitting'))
        userService.register(this.formData)
          .then((response) => {
            if (response.body.error) {
              this.$f7.hidePreloader()
              this.$f7.alert(response.body.message, 'Error Occurred!')
              return
            }
            console.log('new user created', response.body)
            this.$f7.hidePreloader()
            this.$bus.$emit('refreshPosts')
            this.$f7.loginScreen()
          })
      },
      onFileChange (ele) {
        let files = ele.target.files || ele.dataTransfer.files
        if (!files.length) {
          return
        }
        this.formData.append('cover', files[0])
        this.value = files[0]
      },
      getCities () {
        this.$store.dispatch('getCities', this.country)
      }
    }
  }
</script>
<style lang="less">
    .icon {
        color: gray;
        font-size: 30px;
    }

</style>