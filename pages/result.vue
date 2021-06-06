<template>
    <div id="mainDiv">

     <div id="topBar">
        <h2 id="topBarText"> 
        <span> <b-icon icon="person" scale="1" ></b-icon> {{username}} </span> 
        <span @click="leaveGame()" id="leave" v-b-tooltip.hover title="Go to homepage"> <b-icon icon="house-fill" aria-hidden="true" scale="1"></b-icon> </span>
        <span>  <b-icon icon="geo-alt-fill" scale="1" ></b-icon> {{room}} </span>  </h2>
      </div>

      <div id = "score">

        <h1> Score: {{score}} / {{questionNumber}} </h1>

      </div>

      <div id ="leaderBoard">
          <h3> Leaderboard </h3>
          <b-table striped hover :items="leaderBoard"></b-table>
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
      },
      leaderBoard (){
        return this.$store.state.leaderBoard;
      }
    },
    methods: {
      async leaveGame(){
        await this.$store.dispatch('LEAVE_THE_GAME');
      
      }
    }
  }
</script>

<style scoped>
#mainDiv{
  min-width: 100vw;
  min-height: 80vh;
  background: rgb(220, 247, 248);
}

#leaderBoard{
    flex: 1;
    text-align: center;
    /* background: red; */
    min-height: 40vh;
    /* max-width: 80vw; */
    padding: 5vw;
    padding-top: 1vw;
    padding-bottom: 1vw;
    
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