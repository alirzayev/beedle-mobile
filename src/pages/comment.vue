<template>
    <f7-page class="feedback-page">
        <f7-navbar>
            <f7-nav-left>
                <a href="#" class="back link">
                    <f7-icon f7="left"></f7-icon>
                    <span>{{$t('app.back')}}</span>
                </a>
            </f7-nav-left>
            <f7-nav-center :title="$t('app.feedback')"></f7-nav-center>
            <f7-nav-right>
                <f7-link :text="$t('app.send')" @click="sendComment"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <editor :placeholder="$t('feedback.placeholder')" @text:change="editorTextChange"
                enableTools="emotion"></editor>
    </f7-page>
</template>

<script>
  import Editor from '../components/editor.vue'
  import commentServices from '../api/comments'

  export default {
    data () {
      return {
        text: ''
      }
    },
    methods: {
      editorTextChange (text) {
        this.text = text
      },
      sendComment () {
        let query = this.$route.query
        var formData = new FormData()
        formData.append('topic_id', query.tid)
        formData.append('content', this.text)
        commentServices.create(formData).then(
          (response) => {
            if (response.body.error) {
              this.$f7.alert(response.body.message)
            }
            this.$f7.alert(this.$t('comment.result'))
            console.log('comment created', response.body.comment)
            // REFRESH POST ON PREVIOUS PAGE BEFORE BACK
            this.$bus.$emit('refreshPost', query.tid)
            this.$f7.mainView.router.back()
          }
        )
      }
    },
    components: {
      Editor
    }
  }
</script>