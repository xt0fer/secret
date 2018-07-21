<template>
  <div class="box step step--shadow">
    <div class="step__circle step__circle--shadow">{{ number }}</div>
    <article class="media step__body">
      <img class="step__image"
           :src="image">
      <p class="media-content step__content">
        <slot></slot>
      </p>
    </article>
  </div>
</template>

<script>
export default {
  props: ['number', 'image']
}
</script>

<style lang="scss" scoped>
.step {
  position: relative;
  margin-top: 5rem;
  &--shadow {
    box-shadow: 0px 6px 20px hsla(0, 0%, 4%, 0.1),
      0 0 0 0px hsla(0, 0%, 4%, 0.1);
  }
  &__body {
    margin-top: 2rem;
    flex-direction: column;
    align-items: center;
  }
  &__content {
    margin-top: 1rem;
    text-align: center;
  }
  &__circle {
    position: absolute;
    top: -50px;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    font-size: 3rem;
    color: #fff;
    line-height: 85px;
    text-align: center;
    background: linear-gradient(to top, #00c6ff, #0072ff);
    &--shadow {
      box-shadow: 0 6px 20px hsla(193, 100%, 50%, 0.4196078431372549),
        0 0 0 0 hsla(0, 0%, 4%, 0);
    }
  }
  &__image {
    user-select: none;
    pointer-events: none;
    max-width: 60%;
  }
}
</style>

