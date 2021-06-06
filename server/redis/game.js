const questons = require('./questions.json')

const getQuestions = async (req, res) => {

    console.log('in getuestions');
    let questionsToAsk = [];

    let i = 0;

    while (i < 5){
        let j = parseInt(Math.random() * 10);

        questionsToAsk.push(questons[j]);
        i++;
    }
    

    res.send({"status": 201, "questions": questionsToAsk});
}


module.exports = {getQuestions}