const {db} = require("./dbUtils");

exports.getUserScoreCount = function getUserScoreCount (userId, callback) {
    // let userScoreCount = 0;

    return db.query("SELECT COUNT(*) as scoreCount FROM user_score WHERE user_id=?", [userId], (error, result) => {
        if(error)
                console.log("Error uploading score: " + error);
        else {
            // console.log("scoreCount = " + result[0].scoreCount);
            callback(result[0].scoreCount);
        }
    });
}

function getCoursePlayed (userId, callback) {
    // let userScoreCount = 0;

    
    return db.query("SELECT course as coursePly FROM user_score WHERE user_id=?", [userId], (error, result) => {
        if(error)
                console.log("Error uploading course: " + error);
        else {
            callback(result[0].coursePly);
        }
    });
}

function getAveragePar (userId, callback) {
    // let userScoreCount = 0;

    
    return db.query("SELECT AVG(course_par) as avgGrossPar FROM user_score WHERE user_id=?", [userId], (error, result) => {
        if(error)
                console.log("Error uploading par: " + error);
        else {
            callback(result[0].avgGrossPar);
        }
    });
}

getAverageGrossScore = function getAverageGrossScore (userId, callback) {
    // let userScoreCount = 0;

    
    return db.query("SELECT AVG(gross_score) as avgGrossScore FROM user_score WHERE user_id=?", [userId], (error, result) => {
        if(error)
                console.log("Error uploading score: " + error);
        else {
            callback(result[0].avgGrossScore);
           
        }
    });
}


exports.recalculateHandicap = function recalculateHandicap (userId) {
    // i have no idea what's involved in calculating handicap so I'll leave this to you
    // don't forget to update the handicap in the db using the users id
    getCoursePlayed(userId, (crsPly)=>{
        
        getAverageGrossScore(userId, (avgScore)=>{
            getAveragePar(userId, (avgPar)=>{
                
                var currentCourse = crsPly;
                if(crsPly == "highfield" || "footgolf kildare")
                {
                    var handicapScore = ((avgScore)-(avgPar)-2);
                    console.log(handicapScore);
    
    
                    var newHandicap = handicapScore.toFixed(1);
    
                    console.log(newHandicap);
    
    
                    db.query('UPDATE users SET handicap = "'+ newHandicap+'" WHERE id='+userId+'', (error, results) => {
                        if(error){
                            console.log(error);
                        }else{
                            return newHandicap;
                        }
                    });
                }
                else if(crsPly == "cork")
                {
                    var handicapScore = ((avgScore)-(avgPar)+2);
                    console.log(handicapScore);
    
    
                    var newHandicap = handicapScore.toFixed(1);
    
                    console.log(newHandicap);
    
    
                    db.query('UPDATE users SET handicap = "'+ newHandicap+'" WHERE id='+userId+'', (error, results) => {
                        if(error){
                            console.log(error);
                        }else{
                            return newHandicap;
                        }
                    });
                }
                else if(crsPly == "killkenny")
                {
                    var handicapScore = ((avgScore)-(avgPar)-1);
                    console.log(handicapScore);
    
    
                    var newHandicap = handicapScore.toFixed(1);
    
                    console.log(newHandicap);
    
    
                    db.query('UPDATE users SET handicap = "'+ newHandicap+'" WHERE id='+userId+'', (error, results) => {
                        if(error){
                            console.log(error);
                        }else{
                            return newHandicap;
                        }
                    });
                }else{
                    var handicapScore = ((avgScore)-(avgPar));
                    console.log(handicapScore);
    
    
                    var newHandicap = handicapScore.toFixed(1);
    
                    console.log(newHandicap);
    
    
                    db.query('UPDATE users SET handicap = "'+ newHandicap+'" WHERE id='+userId+'', (error, results) => {
                        if(error){
                            console.log(error);
                        }else{
                            return newHandicap;
                        }
                    });
                }
                
             
                    })
                })
            }
    
        /*
        console.log(avgScore);

        var avgPar = this.getAveragePar;
        var handicapScore = (avgScore/avgPar);
        console.log(handicapScore);


        var newHandicap = Math.round((handicapScore * 10) / 10).toFixed(1);

        console.log(newHandicap);


        db.query('UPDATE users SET handicap = "'+ newHandicap+'" WHERE id='+userId+'', (error, results) => {
            if(error){
                console.log(error);
            }else{
                return newHandicap;
            }
        });
        */
    //console.log("Calculating handicap...");

}

