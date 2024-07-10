<template>
  <nav class="navbar">
    <div class="container">
      <ul class="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.navbar {
  color: #ffffff;
  padding: 10px 20px;
  position: fixed;
  width: 100%;
    height: 0px;
   font-family:'Montserrat', sans-serif;
  top: 0;
  left: 0;
  z-index: 10;
 
}

.navbar .container {

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar .brand {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #ffffff;
}

.navbar .nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.navbar .nav-links li {
  display: inline;
}

.navbar .nav-links a {
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
}

.navbar .nav-links a:hover {
  text-decoration: underline;
}
</style>
