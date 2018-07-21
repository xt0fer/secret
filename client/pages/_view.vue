<template>
  <section class="section">
    <div class="container">
      <view-note :decryption-password="passwordFromHash"
    
                 :note-id="$route.params.view"></view-note>
    </div>
  </section>
</template>

<script>
import ViewNote from '@/components/ViewNote'

export default {
  components: { ViewNote },
  computed: {
    /**
     * Takes the password from the hahs parameter if present, and strips the
     * '#' from it, we want to pass it in the pure form to the ViewNote component
     * @returns {Boolean|String} password from the hash parameter, if present
     */
    passwordFromHash() {
      return this.$route.hash && this.$route.hash.replace('#', '')
    }
  }
}
</script>