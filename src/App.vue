<template>
  <nav>
    <div class="container">
        <div class="container-logo">
          <img src="https://tkambio.com/wp-content/themes/tkambio/inc/assets/img/logo-tkambio.svg" alt="" width="200" height="38">
        </div>
    </div>

  </nav>
  <router-view/>
</template>
<style scoped>
  nav {
    background: linear-gradient(180deg, #02ADF1 -2.37%, #4562E6 124.84%, #4563E6 124.84%);
    height: 80px;
    position: relative;
  }

  .container {
    margin: auto;
    display: flex;
    justify-content: center;
    max-width: 1000px;
    line-height: 80px;
    z-index: 100;
    text-align: center;

  }

  .container-logo {
    text-align: center;
    z-index: 100;
    cursor: pointer; 
  }
</style>
