<template>
    <f7-popup id="publisherPopup" popup-mypopup>
        <f7-view>
            <f7-pages>
                <f7-page navbar-fixed>
                    <f7-navbar theme="white">
                        <f7-nav-left>
                            <f7-link :text="$t('app.close')" close-popup></f7-link>
                        </f7-nav-left>
                        <f7-nav-center :title="$t('publisher.publisher')"></f7-nav-center>
                        <f7-nav-right>
                            <f7-link :text="$t('app.send')" @click="sendTweet"></f7-link>
                        </f7-nav-right>
                    </f7-navbar>
                    <div class="page-content">
                        <f7-list form>
                            <!-- Text Input -->
                            <f7-list-item>
                                <f7-input type="text" v-model="title" placeholder="Title"/>
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
                                <label class="file-select">
                                    <div class="select-button">
                                        <span v-if="value">Image: {{value.name}}</span>
                                        <span v-else>Select Image</span>
                                    </div>
                                    <input type="file" id="cover" @change="onFileChange"/>
                                </label>
                            </f7-list-item>
                        </f7-list>
                        <editor :placeholder="$t('publisher.placeholder')" @text:change="editorTextChange"></editor>
                    </div>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-popup>
</template>

<script>
  import topicService from '../api/topic'
  import Editor from '../components/editor.vue'

  export default {
    data () {
      return {
        text: '',
        brand_model: this.brand_model,
        title: this.title,
        formData: new FormData(),
        value: null
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
      editorTextChange (text) {
        this.text = text
      },
      openSmart () {
        this.$f7.smartSelectNavbar = true
        this.$f7.smartSelectOpenIn = 'page'
        this.$f7.smartSelectOpen('.smart-select')
        console.log('smart')
      },
      sendTweet () {
        this.formData.append('title', this.title)
        this.formData.append('model_id', this.brand_model)
        this.formData.append('content', this.text)
        this.$f7.showPreloader(this.$t('app.submitting'))
        topicService.create(this.formData)
          .then((response) => {
            if (response.body.error) {
              this.$f7.alert(response.body.message, 'Error Occurred!')
            }
            console.log('new topic created', response.body)
            this.$f7.hidePreloader()
            this.$f7.closeModal('#publisherPopup')
            this.$bus.$emit('refreshPosts')
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
    },
    components: {
      Editor
    }
  }
</script>
<style lang="less">

</style>