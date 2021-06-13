<template>

  <div id="mainDiv">
    <div id="head">
      <h1 id="topBarText"> <span> Welcome to Marvel Quiz</span>  </h1>
      <h6> for more details, visit <i> <b-link to="/docs"> docs </b-link> </i></h6>
    </div>
    <div>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="9"
        description="Pick a cool room name"
        label="Create or Join game"
        label-for="input-horizontal"
      >
        <b-form-input id="input-horizontal" placeholder="Asgard / Knowwhere / Kree / Xandar" v-model="form.group"></b-form-input>
      </b-form-group>
    </div>

     <div>
      <b-form-group
        id="fieldset-horizontal"
        label-cols-sm="4"
        label-cols-lg="3"
        content-cols-sm
        content-cols-lg="9"
        description="Pick a cool username"
        label="username"
        label-for="input-horizontal"
      >
        <b-form-input id="input-horizontal" placeholder="Thor / Ego / Stark" v-model="form.username"></b-form-input>
      </b-form-group>
    </div>
    <b-button type="submit" @click="onSubmit" block variant="primary">Submit</b-button>

  </div>
    
</template>

<script>
  export default {
    data() {
      return {
        form: {
          group: '',
          username: '',
        }
      }
    },

    methods: {
      async onSubmit(event) {
        event.preventDefault()
        await this.$store.dispatch('JOIN_ROOM', this.form);
      }
    }
  }
</script>

<style scoped>
  #mainDiv{
    padding: 10%;
    max-width: 100vw;
    min-height: 85vh;
  }

  #head{
    padding-bottom: 4%;
    justify-content: space-between;
    text-align: center;
    font-weight: 500;
  }

  #topBarText{
    font-size: 6vh;

  }
</style>

