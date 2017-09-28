<template>
    <f7-page class="language-page">
        <f7-navbar :title="$t('app.profile')" :back-link="$t('app.back')" sliding>
            <f7-nav-right>
                <f7-link :text="$t('app.save')" @click="update"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-list form>
            <!-- Text Input -->
            <f7-list-item>
                <f7-label>Name</f7-label>
                <f7-input type="text" v-model="fullname" :placeholder="user.fullname"/>
            </f7-list-item>
            <!-- Password -->
            <f7-list-item>
                <f7-label>Password</f7-label>
                <f7-input type="password" v-model="password" placeholder="Password"/>
            </f7-list-item>
            <f7-list-item smart-select smart-select-searchbar title="Select Car">
                <select v-model="brand_model" name="models">
                    <optgroup v-for="brand in brands" :label="brand.name">
                        <option v-for="model in brand.models" :value="model.id" selected>{{model.name}}</option>
                    </optgroup>
                </select>
            </f7-list-item>
            <f7-list-item>
                <input type="file" id="cover" @change="onFileChange"/>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
  import userService from '../api/user'

  export default {
    data () {
      return {
        brand_model: this.brand_model,
        fullname: this.fullname,
        password: this.password,
        formData: {},
      }
    },
    computed: {
      brands () {
        console.log(this.$store.state.brands)
        return this.$store.state.brands
      },
      user () {
        return this.$store.getters.user
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
      update () {
        this.$f7.showPreloader(this.$t('app.submitting'))
        this.formData.fullname = this.fullname
        console.log('model id', this.brand_model)
        if (this.password) {
          this.formData.password = this.password
        }
        if (this.brand_model) {
          this.formData.model_id = this.brand_model
        }
        userService.update(this.user.id, this.formData)
          .then((response) => {
            if (response.body.error) {
              this.$f7.alert(response.body.message, 'Error Occurred!')
            }
            console.log('user data updated', response.body)
            this.$f7.hidePreloader()
            this.$store.dispatch('getAuthUser').then(() => {
              this.$bus.$emit('refreshPosts')
            })
          })
      },
      onFileChange (ele) {
        let files = ele.target.files || ele.dataTransfer.files
        if (!files.length) {
          return
        }
        this.formData.cover = files[0]
      }
    }
  }
</script>