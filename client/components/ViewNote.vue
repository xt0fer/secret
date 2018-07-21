<template>
  <div class="view">
    <div v-if="exists === false">
      <h1 class="title">Note destroyed</h1>
      <h2 class="subtitle">The note with id
        <b>{{ noteId }}</b> does not exist or was already
        destroyed.
      </h2>
    </div>
    <div v-if="exists">
      <div v-if="!destroyed"
           class="confirm">
        <h1 class="title">Read and destroy?</h1>
        <h2 class="subtitle">You're about to read and destroy the note with
          id
          <b>{{ noteId }}</b>.</h2>
        <div v-if="decryptionPassword"
             class="field is-grouped">
          <p class="control">
            <a class="button is-primary"
               @click="readAndDestroy"
               :class="{'is-loading': loading}">
              Yes, show me the note
            </a>
          </p>
          <p class="control">
            <a class="button is-light">
              No, not now
            </a>
          </p>
        </div>
        <div v-else>
          <div class="field is-flex-tablet">
            <div class="control control--mr">
              <input class="input"
                     type="password"
                     placeholder="Decryption key"
                     v-model="manualPassword">
              <p class="help">
                This note is password protected, please enter your
                password to unlock it.
                <b>You only have one try</b>, make sure
                you type in the right password!
              </p>
            </div>
            <p class="control">
              <a @click="readAndDestroy"
                 class="button is-primary"
                 :class="{'is-loading': loading}">
                Unlock
              </a>
            </p>
          </div>
        </div>
      </div>
      <div v-else
           class="show">
        <article class="message is-primary">
          <div class="message-body">
            This note was
            <b>destroyed</b>. If you need to keep it,
            copy it before closing this window.
          </div>
        </article>
        <h1 class="title">Note contents</h1>
        <div class="field">
          <p class="control">
            <textarea class="textarea"
                      v-model="decryptedNote"></textarea>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control {
  &--mr {
    margin-right: 0.5rem;
  }
}
</style>


<script>
import aesjs from 'aes-js'
import pbkdf2 from 'pbkdf2'

export default {
  props: ['decryptionPassword', 'noteId'],
  data() {
    return {
      destroyed: false,
      loading: false,
      exists: null,
      decryptedNote: null,
      manualPassword: null
    }
  },
  methods: {
    /**
     * Fetches the encrypted note from the server and decrypts it using the
     * decryption key
     */
    async readAndDestroy() {
      this.loading = true // starts the spin animation in the button

      const {note: { body }} = await this.$axios.$delete(`notes/${this.noteId}`)
      const encryptedBytes = aesjs.utils.hex.toBytes(body)

      /* eslint new-cap: ["error", { "newIsCap": false }] */
      const aesCtr = new aesjs.ModeOfOperation.ctr(this.decryptionKey)
      const decryptedBytes = aesCtr.decrypt(encryptedBytes)
      this.decryptedNote = aesjs.utils.utf8.fromBytes(decryptedBytes)

      this.destroyed = true
      this.loading = false
    }
  },
  computed: {
    /**
     * Takes the password from either the provided one (decryptionPassword) or if
     * the user chose his own password for the note, use it (manualPassword).
     *
     * @returns {String} password
     */
    password() {
      return this.manualPassword || this.decryptionPassword
    },
    /**
     * Generates the 256bit AES decryption key using the password
     * @returns {Array}
     */
    decryptionKey() {
      return pbkdf2.pbkdf2Sync(this.password, '~S.uperR4ndOmS4lt1!1', 1, 256 / 8, 'sha512')
    }
  },
  /**
   * Checks if the note is even available for view, the following GET endpoint will return
   * 404 if the note was already read or unavailable.
   */
  mounted() {
    this.$axios
      .get(`notes/${this.noteId}`)
      .then(() => (this.exists = true))
      .catch(() => (this.exists = false))
  }
}
</script>
