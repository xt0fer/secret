<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/"
                   class="navbar-item">
          Secret
        </nuxt-link>
        <span class="navbar-burger burger"
              data-target="navbarMenuHeroA"
              @click="toggleNavbar"
              :class="{'is-active': navbar.isOpened}">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenuHeroA"
           class="navbar-menu"
           :class="{'is-active': navbar.isOpened}">
        <div class="navbar-end">
          <nuxt-link to="/about"
                     class="navbar-item"
                     active-class="is-active">
            About
          </nuxt-link>
          <span class="navbar-item">
            <a class="button is-primary is-inverted"
               href="https://github.com/1tayH/secret/">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
              <span>Fork me</span>
            </a>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navbar: {
        isOpened: false
      }
    }
  },
  methods: {
    toggleNavbar() {
      this.navbar.isOpened = !this.navbar.isOpened
    }
  }
}
</script>
