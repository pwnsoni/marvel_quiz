<template>
    <div id="mainDiv">

      <div id="topBar">
        <h2 id="topBarText"> <span> Welcome {{username}} </span> <span> Room {{room}} </span>  </h2>
        <h3> Question Number {{questionNumber}} </h3>
      </div>

      <div id = "belowBar">

        <div id ="leaderBoard">
          {{leaderBoard}}
        </div>

        <div id="question">

          <div id="questionDesc"> 
            <h1 id="questionDescText"> {{question.question}} </h1>
          </div>

          <div id="options" >
            <b-form-group label="" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                v-model="selected"
                :options="question.options"
                :aria-describedby="ariaDescribedby"
                name="radios-stacked"
                
              ></b-form-radio-group>
            </b-form-group>
          </div>

        <div id="selected">Selected: {{selected}} <span> <b-icon icon="caret-right-square" @click="submitAnswer(selected)" scale="3" id="nextButton"></b-icon> </span></div>
        
        

        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          creater: '',
          name: '',
          cronStatement: '',
          description: '',
          recipients: ''
        },
        spinning: false,
        isEditing: true,
        spinningInModal: false,
        selected: 'none',
        }
    },


    async mounted(){
      if (!this.$store.state.isActiveSession){
        this.$router.push('/');
      } else{
        await this.$store.dispatch('GET_LEADERBOARD');
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
      question (){
        return this.$store.state.question;
      },
      questionNumber (){
        return this.$store.state.questionNumber;
      },
      leaderBoard (){
        return this.$store.state.leaderBoard;
      }
    },

    methods: {

      async onSubmit(event) {
        event.preventDefault()
        this.makeToast(true, "Saved the snsGroup in DB", responseSnsGroup.data.result._id);
      },
      async submitAnswer(selected){
        await this.$store.dispatch('SUBMIT_THIS_QUESTION', {selected});
      },
      makeToast(append = false, title, _id) {
        this.$bvToast.toast(`Id : ${_id}`, {
          title: title,
          autoHideDelay: 5000,
          appendToast: append
        })
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

#belowBar{

    display: flex;
}

#leaderBoard{
    flex: 1;
    float: left;
    background: red;
    min-height: 40vh;
    min-width: 20vw;
}

#options{
  /* font-size: x-large; */
  /* margin-left: 45vw; */

  text-align: center;
}

#questionDesc{
  padding: 2%;
  padding-left: 0;
  text-align: center;
}

#selected{
  /* padding: 2%; */
  text-align: center;
  padding-right: 4%;
}

#questionDescText{
  font-size: 60px;
}

#nextButton{
  text-align: center;
  align-content: center;
  color: rgb(19, 32, 32);
  padding-left: 3%;
}

#topBar{
  min-width: 100vw;
  min-height: 30vh;
  background: rgb(19, 32, 32);
  color: rgb(220, 247, 248);
}

#question{
  color: rgb(19, 32, 32);
  min-width: 90vw;
  float: left;
  margin-left: 0;
  background: rosybrown;
}

h3{
  text-align: right;
  padding-right: 7%;
  padding-bottom: 1%;
}

#topBarText{
  padding: 7%;
  padding-bottom: 4%;
  justify-content: space-between;
  display: flex;
}
</style>