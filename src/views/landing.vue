<template>
  <div class="landing">
    <div class="overlay">
        <h2>Welcome To TaskBoss</h2>
      <div class="flex">
        <div class="image">
          <img src="/src/assets/images/hero.png" alt="" />
        </div>
        <div class="texts">
          Organize, Track, and Succeed with Ease! Your ultimate task manager is here to help
          you stay on top of every project, manage your workload effortlessly, and achieve your
          goals with unparalleled convenience and clarity.
        </div>
      </div>
       <router-link class="btn width btn-primary d-block mx-auto mt-5" :to="{name:'signup'}"> Get Started </router-link>
       <!-- <input-field type="text" /> -->
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
h2{
    text-align: center;
    padding-top: 30px;
    font-weight: 600;
    color: #b4b4b4;
}
.landing {
  height: 100vh;
  background-image: url(/src/assets/images/background.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.flex {
  /* border: 1px solid red; */
  display: flex;
  gap: 50px;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 100px auto 0 auto;
}
.overlay{
background-color: #4b4a4aa8;
  height: 100vh;
}
.image img {
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}
.texts {
  width: 50%;
  text-align: center;
  font-size: 25px;
  
  color: aliceblue;
}
.width{
  width: 20%;
}
@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px); 
    }
    100% {
        transform: translateY(0);
    }
}






@media (max-width: 900px) {
  .flex {
    flex-direction: column;
    gap: 30px;
    width: 90%;
    margin-top: 50px;
  }
  .texts {
    width: 90%;
    font-size: 20px;
  }
  .width {
    width: 50%;
  }
}

@media (max-width: 600px) {
  .landing {
    background-size: cover;
    min-height: 100vh;
  }
  .overlay {
    min-height: 100vh;
    padding-bottom: 30px;
  }
  h2 {
    font-size: 1.5rem;
    padding-top: 20px;
  }
  .flex {
    width: 100%;
    margin-top: 30px;
    gap: 20px;
  }
  .image img {
    width: 120px;
    height: 120px;
  }
  .texts {
    width: 100%;
    font-size: 16px;
    padding: 0 10px;
  }
  .width {
    width: 90%;
  }
}


</style>
