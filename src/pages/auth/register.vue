<template>
    <f7-popup id="registerPopup" class="popup-register" popup-mypopup>
        <f7-view>
            <f7-pages>
                <f7-page navbar-fixed>
                    <f7-navbar theme="white">
                        <f7-nav-left>
                            <f7-link :text="$t('app.close')" close-popup></f7-link>
                        </f7-nav-left>
                        <f7-nav-center :title="$t('app.register')"></f7-nav-center>
                        <f7-nav-right>
                            <f7-link :text="$t('app.save')" @click="register"></f7-link>
                        </f7-nav-right>
                    </f7-navbar>
                    <div class="page-content">
                        <f7-list form>
                            <!-- Text Input -->
                            <f7-list-item>
                                <f7-input type="text" v-model="fullname" placeholder="Fullname"/>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-input type="email" v-model="email" placeholder="Email"/>
                            </f7-list-item>
                            <f7-list-item>
                                <f7-input type="password" v-model="password" placeholder="Password"/>
                            </f7-list-item>

                            <f7-list-item smart-select smart-select-searchbar title="Chose model..">
                                <select v-model="brand_model" name="models">
                                    <option value="Model" selected disabled>Choose Models</option>
                                    <optgroup v-for="brand in brands" :label="brand.name">
                                        <option v-for="model in brand.models" :value="model.id">{{model.name}}</option>
                                    </optgroup>
                                </select>
                            </f7-list-item>
                            <f7-list-item>
                                <input type="file" id="cover" @change="onFileChange"/>
                            </f7-list-item>
                        </f7-list>
                    </div>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-popup>
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
        formData: new FormData()
      }
    },
    computed: {
      brands () {
        console.log(this.$store.state.brands)
        return this.$store.state.brands
      }
    },
    mounted () {
      this.$store.dispatch('getBrands')
    },
    methods: {
      openSmart () {
        this.$f7.smartSelectNavbar = true
        this.$f7.smartSelectOpenIn = 'page'
        this.$f7.smartSelectOpen('.smart-select')
      },
      register () {
        this.formData.append('fullname', this.fullname)
        this.formData.append('email', this.email)
        this.formData.append('password', this.password)
        this.formData.append('model_id', this.brand_model)
        this.$f7.showPreloader(this.$t('app.submitting'))
        userService.register(this.formData)
          .then((response) => {
            if (response.body.error) {
              this.$f7.alert(response.body.message, 'Error Occurred!')
            }
            console.log('new user created', response.body)
            this.$f7.hidePreloader()
            this.$bus.$emit('refreshPosts')
            this.$f7.closeModal('#registerPopup')
            this.$f7.closeModal('#loginPopup')
          })
      },
      onFileChange (ele) {
        let files = ele.target.files || ele.dataTransfer.files
        if (!files.length) {
          return
        }

        this.formData.append('cover', files[0])
      }
    }
  }
</script>
<style lang="less">

</style>