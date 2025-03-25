<script setup lang="ts"></script>

<template>
  <nav class="nav">
    <router-link class="nav__link" to="/form1">Пример 1</router-link>
    <router-link class="nav__link" to="/form2">Пример 2</router-link>
    <router-link class="nav__link" to="/form3">Пример 3</router-link>
    <router-link class="nav__link" to="/form4"
      >Пример 4(динамический рендер с шаблоном)</router-link
    >
  </nav>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
  margin-top: 100px;

  &__link {
    text-decoration: none;
    background-color: #a2caf3;
    border-radius: 5px;
    padding: 5px 10px;
    color: #020617;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
  }
}
</style>
