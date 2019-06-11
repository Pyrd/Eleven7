<template>
  <v-footer
    id="core-footer"
    absolute
    height="42"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <span><b style="font-size: 16px;">Eleven</b><b style="color:orange;font-size: 16px;">7</b>Dashboard</span>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: 'Home', Link: '/' },
      { name: 'Mathieu CAILLY', Link: 'www.linkedin.com/in/mathieu-cailly' },
      { name: 'Github', Link: 'https://github.com/Pyrd/Eleven7' }
    ]
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
