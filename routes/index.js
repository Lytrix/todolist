/**
 * Created by awunnenb on 27.11.13.
 * Modified by awunneb on 08.06.14.
 */

// Database mongodb
// mongod muss vorher in der Console oder als Service gestartet sein
var databaseUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost:27017/todolist";
// var databaseUrl = "todolist"; // optional: "username:password@localhost/todolist"
var collections = ["actions", "selectboxes"]
var db = require("mongojs").connect(databaseUrl, collections);
//  Falls noch keine collection selectboxes existiert, wird automatisch eine angelegt
db.selectboxes.find().sort({name:1}, function(error, selectboxes) {
    if (error || !selectboxes) {
        console.log(error);
    } else {
        if (selectboxes.length != 0) {
            console.log(selectboxes.length + ' selectboxes found');
        } else {
            defaultselectboxes = [
            	{"eventtypes":["Regular Event","Too low glucose","Too high glucose","Sick/Medicine","Alcohol","Stress","Very warm weather", "Bad Weather"]},
	            {"carbtypes":["Snack","Low Sugar Correction","Breakfast","Lunch","Dinner"]},
	            {"activitytypes":["Normal","Medium","Intensive!"]}]
            ;

            db.selectboxes.insert(defaultselectboxes,
                function(error){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(defaultselectboxes.length + ' selectboxes created');
                    }
                });
        }
    }
});


// Formular Startseite index aufrufen
exports.index = function(req, res){
    db.actions.find({status: "aktiv"}, function(error, actions) {
        if (error || !actions) {
            console.log("No treatments found, fill in a first treatment!");
            res.render(' 	', { title: 'Treatments', actions: null});
        } else {
            res.render('index', { title: 'Treatments', actions: actions.sort(actions.eventDate).reverse() });
        }
    });
};

// Formular new.jade aufrufen
exports.new = function(req, res){
    //db.selectboxes.remove({});
    db.selectboxes.find().sort({}, function(error, data) {
        if (error || !data) {
            console.log("No Collection *selectboxes* found!")
        } else {
        	console.log(data[0])
            res.render('new', { title: 'Add Treatment', selectboxes: data });
        }
    });
};

// Formular edit.jade aufrufen
exports.edit = function(req, res){
    db.selectboxes.find().sort({name:1}, function(error, selectboxes) {
        if (error || !selectboxes) {
            console.log("No Collection *selectboxes* found!")
        } else {
            db.actions.findOne({"_id": db.ObjectId(req.params.id)}, function (error, action) {
                if (error || !action) {
                    console.log("ID not found");
                } else {
                    res.render('edit', { title: 'Modify Event', action: action, selectboxes: selectboxes });
                }
            });
        }
    });
};

// Formular delete.jade aufrufen
exports.delete = function(req, res){
    db.actions.findOne({"_id": db.ObjectId(req.params.id)}, function(error, action) {
        if (error|| !action) {
            console.log("ID not found");
        } else {
            // Abfrage ob wirklich gelöscht werden soll
            res.render('delete', { title: 'Remove Event', action: action });
        }
    });
};

// Formulardaten speichern
exports.save = function(req, res){
    var action = req.body;
    console.log(action);
    if (!action) res.redirect('/home');
    action.status = "aktiv";
    var _id = req.params.id;
    // Update
    if (_id) {
        db.actions.update({_id: db.ObjectId(_id)}, action,
            function(error){
                if (error) {
                    console.log(error);
                } else {
                    res.redirect("/home");
                }
            });
        // Insert
    } else {
        db.actions.insert(action,
            function(error){
                if (error) {
                    console.log(error);
                } else {
                    res.redirect("/home");
                }
            });
    }
};

// Todoeintrag entfernen
exports.remove = function(req, res){
    var _id = db.ObjectId(req.params.id);
    db.actions.remove({_id: _id}, function(error){
        if (error) {
            console.log(error);
        } else {
            res.redirect("/home");
        }
    });
}

// Status auf erledigt setzen
exports.done = function(req, res) {
    var _id = db.ObjectId(req.params.id);
    db.actions.findOne({"_id": _id}, function(error) {
        if (error) {
            console.log("ID not found");
        } else {
            db.actions.update   ( { _id: _id }, { $set: { status: "Removed" }});
            res.redirect("/home");
        }
    });

};


