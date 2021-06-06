<template>
    <div id="mainDiv">

      <div id="topBar">
        <h2 id="topBarText"> <span> Welcome {{username}} </span> <span> Room {{room}} </span>  </h2>
      </div>

      <div id = "score">

        <h1> Score: {{score}} / {{questionNumber}} </h1>

      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },


    mounted(){
      if (!this.$store.state.isActiveSession){
        this.$router.push('/');
      } else if (this.$store.state.isActiveSession && this.$store.state.questionNumber !== this.$store.state.questions.length) {
          alert('Please complete the game first!!');
          this.$router.push('/play');
      }
    },
    
    computed: {
      room () {
        return this.$store.state.room;
      },
      username (){
        return this.$store.state.username;
      },
      score (){
        return this.$store.state.score;
      },
      questionNumber (){
        return this.$store.state.questionNumber;
      }
    }
  }
</script>

<style scoped>
#mainDiv{
  min-width: 100vw;
  min-height: 90vh;
  background: rgb(220, 247, 248);
}


h1{
  text-align: center;
  color: rgb(19, 32, 32);
  padding-top: 5%;
}


#topBar{
  min-width: 100vw;
  min-height: 30vh;
  background: rgb(19, 32, 32);
  color: rgb(220, 247, 248);
}

#topBarText{
  padding: 7%;
  justify-content: space-between;
  display: flex;
}
</style>