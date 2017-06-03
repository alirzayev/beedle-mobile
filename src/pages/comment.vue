<template>
    <f7-page class="feedback-page">
        <f7-navbar :title="$t('app.feedback')" :back-link="$t('app.back')" sliding>
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
    data() {
      return {
        text: ''
      }
    },
    methods: {
      editorTextChange(text) {
        this.text = text
      },
      sendComment() {
        let query = this.$route.query
        var formData = new FormData()
        formData.append('topic_id', query.tid)
        formData.append('content', this.text)
        commentServices.create(formData).then(
          (response) => {
            if(response.body.error){
              this.$f7.alert(response.body.message)
            }
            this.$f7.alert(this.$t('comment.result'))
            this.$bus.$emit('refresh')
            console.log('comment created', response.body.comment)
          }
        )
      }
    },
    components: {
      Editor
    }
  }
</script>