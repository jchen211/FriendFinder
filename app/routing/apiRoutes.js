var path = require("path");
var friendsData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res){
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
     


        var newFriendInfo = req.body;
        var newFriendScore = newFriendInfo.score;
        
        var matchFriend = {
             matchedName: "",
             matchedPhoto: "",
             totalDiff: 50
        };

        for (var i = 0; i < friendsData.length; i++) {

            var diff = 0;

            for (var j = 0; j < friendsData[i].score.length; j++) {
                diff += Math.abs(friendsData[i].score[j] - newFriendScore[j]);
            }
                if (diff <= matchFriend.totalDiff) {
                    matchFriend.matchedName = friendsData[i].name;
                    matchFriend.matchedPhoto = friendsData[i].photo;
                }
            }
        friendsData.push(newFriendInfo);
        res.json(matchFriend);
    });
}

