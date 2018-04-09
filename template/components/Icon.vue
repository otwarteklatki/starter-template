<template lang="pug">
  svg(:class="cssClass")
    use(:xlink:href="xlinkHref")
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  created () {
    require(`~/assets/icons/${this.name}.svg`)
  },
  computed: {
    cssClass () {
      return [
        'icon',
        `icon-${this.name}`
      ]
    },
    xlinkHref () {
      return `#${this.name}`
    }
  }
}
</script>
