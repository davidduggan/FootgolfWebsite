const {db} = require("../common/dbUtils");
const {getUserScoreCount, recalculateHandicap} = require("../common/userUtils");

exports.getAllUsersWithHandicap = async(req, res, next) => {
    db.query("SELECT * FROM users WHERE handicap !=0 ORDER BY handicap ASC", (error, result) => {
        // console.log(result);

        if(!result){
            return next();
        }

        req.userList = result;
        return next();
    });
}

exports.uploadScore = (req, res, next) => {
    console.log(req.body)
    const {course, coursePar, score, scoreCard, userId} = req.body;

    db.query('INSERT INTO user_score SET ?', {course: course, course_par: coursePar, gross_score: score, user_id: userId}, (error, results) => {
        if(error)
                console.log("Error uploading score: " + error);
        else {
            // console.log(results);
            getUserScoreCount(userId, (userScoreCount) => {
                if (userScoreCount >= 3) {
                    recalculateHandicap(userId);
                    return res.render('scoreMessage.hbs', {
                        message: `Cannot calculate handicap: You have only provided ${userScoreCount}/3 scores.`
                        })
                }
                else if(course.length < 1 || coursePar.length < 1 || score.length < 1){
                    return res.render('score.hbs', {
                        message: `Invalid Value`
                        })
                }        
                else // pass in message to let user know they need to pass in x amount of scores to recieve a handicap
                    console.log(`Cannot calculate handicap: user has only provided ${userScoreCount}/3 scores.`)
                    return res.render('scoreMessage.hbs', {
                    message: `Cannot calculate handicap: You have only provided ${userScoreCount}/3 scores.`
                    })
                // req.message = "Test";
            
            
                return next();
            });
        }
    });
 
    // return next();
}