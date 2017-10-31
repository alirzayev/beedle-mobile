<template>
    <f7-page class="update-page">
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="$t('app.profile')"></f7-nav-center>
            <f7-nav-right>
                <f7-link :text="$t('app.save')" @click="update"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block-title>Change Fullname</f7-block-title>
        <f7-list>
            <f7-list-item>
                <f7-input type="text" v-model="fullname" placeholder="Enter fullname here.."/>
            </f7-list-item>
        </f7-list>

        <!-- Change car -->
        <f7-block-title>Change Your Car</f7-block-title>
        <f7-list>
            <f7-list-item smart-select smart-select-searchbar title="Select Car">
                <select v-model="model_id" name="models">
                    <optgroup v-for="brand in brands" :label="brand.name">
                        <option v-for="model in brand.models" :value="model.id" selected>{{model.name}}</option>
                    </optgroup>
                </select>
            </f7-list-item>
        </f7-list>
        <!-- Change profile picture -->
        <f7-block-title>Change Profile Picture</f7-block-title>
        <f7-list form>
            <f7-list-item>
                <label class="file-select">
                    <div class="select-button">
                        <span v-if="value">Image: {{value.name}}</span>
                        <span v-else>Change Picture</span>
                    </div>
                    <input type="file" id="cover" @change="onFileChange"/>
                </label>
            </f7-list-item>
        </f7-list>
        <!-- Change Password -->
        <f7-block-title>Change Password</f7-block-title>
        <f7-list>
            <f7-list-item>
                <f7-input type="password" v-model="password" placeholder="Enter new password here.."/>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
  import userService from '../api/user'

  export default {
    data () {
      return {
        model_id: this.model_id,
        fullname: this.fullname,
        password: this.password,
        formData: new FormData(),
        value: null
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
      update () {
        this.$f7.showPreloader(this.$t('app.submitting'))
        this.formData.append('fullname', this.fullname)
        this.formData.append('password', this.password)
        if (this.model_id) {
          this.formData.append('model_id', this.model_id)
          console.log('model id', this.brand_model)
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
        this.formData.append('cover', files[0])
        this.value = files[0]
      }
    }
  }
</script>
<style lang="less">
    @import "../assets/styles/mixins.less";

    .update-page {
        background-color: #eeeeee;
        .item-divider {
            background-color: #eeeeee;
        }
    }
</style>