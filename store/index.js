export const state = () => ({
    isActiveSession: false,
    room: '',
    username: '',
    score: 0,
    questions: [],
    question: {},
    questionNumber: 0,
    leaderBoard: []
  })
  
export const mutations = {
    validateAxiosResponse(state, response){
        console.log(response.status);
        if (response.status !== 201){
            alert(`Axios Error: ${response.errorMessage}`);
        }
    },
    
    nextQuestion(state){
        // alert(state.questions.length)
        console.log(state.questions)
        console.log(state.questions.length)
        if (state.questionNumber === state.questions.length){
            this.$router.push('/result');
        } else {
            state.questionNumber += 1;
            state.question = state.questions[state.questionNumber - 1];
        }
    },

    updateScore(state, score){
        state.score = score;
    },

    updateLeaderBoard(state, lb){
        // alert(JSON.stringify(lb))
        lb.lb[0]._rowVariant = 'warning';
        state.leaderBoard = lb.lb
    },

    leaveTheGame(state){
        state.room = '';
        state.username = '';
        state.score = 0;
        state.isActiveSession = false;
        state.questions = []
        state.questionNumber = 0;
        state.question = {};
        state.leaderBoard = [];
        this.$router.push('/');

    },

    joinroom(state, form){
        state.room = form.group;
        state.username = form.username;
        state.score = 0;
        state.isActiveSession = true;
        state.questions = form.questions
        state.questionNumber = 1;
        state.question = state.questions[state.questionNumber - 1];
        this.$router.push('/play');
    }
}

export const actions = {

    async JOIN_ROOM({commit}, form){
        console.log('in store', form);
        let response = await this.$axios.$post('/api/joinRoom', {room: form.group, username: form.username, score: 0});
        console.log(response);
        let questions = await this.$axios.get('/api/questions');
        console.log(questions.data)
        form.questions = questions.data.questions;
        commit('validateAxiosResponse', response);
        commit('joinroom', form);
    },

    async SUBMIT_THIS_QUESTION({commit, state}, response){
        console.log(response);
        let sc = await this.$axios.post('/api/addScore', {selected: response.selected, question: state.question ,score: state.score, room: state.room, username: state.username});
        // if (sc.data.score){
        //     commit('increaseScore')
        // } else{
        // }
        commit('updateScore', sc.data.score)
        commit('nextQuestion');
    },

    async GET_LEADERBOARD_TOPPERS({commit}, room){
        console.log('in store', room);
        let body = {room, top: 10};
        let response = await this.$axios.$post('/api/getLeaderBoard', body);
        console.log(response);
        commit('validateAxiosResponse', response);
        commit('updateLeaderBoardToppers', {lb: response.leaderBoard});
    },

    async GET_LEADERBOARD({commit, state}){
        console.log('in store GET_LEADERBOARD');
        let body = {room: state.room, top: -1};
        let response = await this.$axios.$post('/api/leaderBoard', body);
        console.log(response.leaderBoard, 'in GET_LEADERBOARD');
        commit('validateAxiosResponse', response);
        commit('updateLeaderBoard', {lb: response.leaderBoard});
    },

    LEAVE_THE_GAME({commit, state}){
        commit('leaveTheGame');
    }
       
}