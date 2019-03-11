var path = require("path");
var friendsData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
     


        var newFriendInfo = req.body;
        var newFriendScore = newFriendInfo.score;
          
        var matchedName = "";
        var matchedPhoto = "";
        var totalDiff = 50;

        for (var i = 0; i < friendsData.length; i++) {

            var diff = 0;

            for (var j =0; j < newFriendScore.length; j++) {
                diff += Math.abs(friendsData[i].scores[j] - newFriendInfo[j]);
            }
                if (diff < totalDiff) {
                    totalDiff = diff;
                    matchedName = friendsData[i].name;
                    matchedPhoto = friendsData[i].photo;
                }
            }
        friendsData.push(req.body);
        res.json(true);
    });
}

