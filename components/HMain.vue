<template>
  <header>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <nuxt-link to="/" class="text-white d-inline-block py-2">
              صفحه اصلی
            </nuxt-link>
            <nuxt-link
              to="/bookCover"
              class="text-white d-inline-block p-2 mx-2"
            >
              طراحی جلد کتاب
            </nuxt-link>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>