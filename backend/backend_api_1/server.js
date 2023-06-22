const express = require("express");
const app = express();
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

let db = new sqlite3.Database('../db/roomfit.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connect');
    }
});

app.get("/routine/create", function (req, res) {
    const sql = "INSERT INTO routine (user_id) values (?)";
    db.run(sql, 1, function (err) {
        if (err) {
            console.error(err.message);
        } else {
            const routineID = this.lastID;
            console.log("routine create");
            res.json({ routine_id: routineID });
            console.log(routineID);
        }
    });
});

app.get("/routine/home", function (req, res) {
    const sql = "SELECT routine_id from routine where user_id=? limit 2";
    db.all(sql, 1, (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            const routineIds = rows.map(row => row.routine_id);
            const placeholders = routineIds.map(() => "?").join(",");
            const sqlRoutine = `SELECT routine_name, routine.routine_id, motion.major_target FROM routine_motion INNER JOIN routine ON routine.routine_id = routine_motion.routine_id INNER JOIN motion ON motion.motion_id = routine_motion.motion_id WHERE routine_motion.routine_id IN (${placeholders})`;
            db.all(sqlRoutine, routineIds, (err, routineRows) => {
                if (err) {
                    console.error(err);
                } else {
                    const groupedResults = {};
                    routineRows.forEach(row => {
                    const { routine_id, routine_name, major_target } = row;
                    if (!groupedResults[routine_id]) {
                        groupedResults[routine_id] = {
                            routine_id : routine_id,
                            routine_name : routine_name,
                            major_targets: [major_target],
                            motion_count: 1
                        };
                    } else {
                        let k = 0;
                        groupedResults[routine_id].major_targets.forEach(target => {
                            if (target.includes(major_target)) {
                                k = 1;
                            } 
                        });
                        if(k==0){
                            groupedResults[routine_id].major_targets.push(major_target);
                        }
                        groupedResults[routine_id].motion_count++;
                    }
                    });
                    const finalResults = Object.values(groupedResults).map(result => ({
                        ...result,
                        major_targets: [...new Set(result.major_targets)].join(', ')
                    }));
                    console.log(finalResults);
                    res.send(finalResults);
                }
            });
        }
    });
});

app.get('/routine/load', function(req,res){
    const sql = "SELECT routine_id from routine where user_id=?";
    db.all(sql, 1, (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            const routineIds = rows.map(row => row.routine_id);
            const placeholders = routineIds.map(() => "?").join(",");
            const sqlRoutine = `SELECT routine_name, routine.routine_id, motion.major_target FROM routine_motion INNER JOIN routine ON routine.routine_id = routine_motion.routine_id INNER JOIN motion ON motion.motion_id = routine_motion.motion_id WHERE routine_motion.routine_id IN (${placeholders})`;
            db.all(sqlRoutine, routineIds, (err, routineRows) => {
                if (err) {
                    console.error(err);
                } else {
                    const groupedResults = {};
                    routineRows.forEach(row => {
                    const { routine_id, routine_name, major_target } = row;
                    if (!groupedResults[routine_id]) {
                        groupedResults[routine_id] = {
                            routine_id : routine_id,
                            routine_name : routine_name,
                            major_targets: [major_target],
                            motion_count: 1
                        };
                    } else {
                        let k = 0;
                        groupedResults[routine_id].major_targets.forEach(target => {
                            if (target.includes(major_target)) {
                                k = 1;
                            } 
                        });
                        if(k==0){
                            groupedResults[routine_id].major_targets.push(major_target);
                        }
                        groupedResults[routine_id].motion_count++;
                    }
                    });
                    console.log(groupedResults);
                    const finalResults = Object.values(groupedResults).map(result => ({
                        ...result,
                        major_targets: [...new Set(result.major_targets)].join(', ')
                    }));
                    console.log(finalResults);
                    res.send(finalResults);
                }
            });
        }
    });
});

app.get('/routine/modify/:routine_id', function(req,res){
    const modify_id = req.params.routine_id.slice(11);
    const sql = "SELECT routine.routine_id, routine.routine_name, routine_motion.motion_id, routine_motion.routine_motion_id, set_info.set_id, set_info.set_no, set_info.weight, set_info.rep, set_info.mode FROM routine_motion INNER JOIN routine ON routine.routine_id = routine_motion.routine_id INNER JOIN set_info ON set_info.routine_motion_id = routine_motion.routine_motion_id WHERE routine_motion.routine_id = ?";
    db.all(sql, modify_id, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const datas = {
                routine_id : rows[0].routine_id,
                routine_name : rows[0].routine_name,
                motionList : []
            };
            let rowCount = 0;
            rows.forEach(row => {
                const motionSql = "SELECT motion_id, motion_name, imageUrl FROM motion WHERE motion_id = ?";
                const { routine_motion_id, set_id, set_no, weight, rep, mode } = row;
                db.all(motionSql, row.motion_id, (err, motionRows)=>{
                   if(err) {
                    console.error(err);
                   } else{
                        if (!datas.motionList.find(motion => motion.routine_motion_id === routine_motion_id)) {
                            datas.motionList.push({
                                routine_motion_id: routine_motion_id,
                                motion_id: motionRows[0].motion_id,
                                motion_name: motionRows[0].motion_name,
                                imageUrl: motionRows[0].imageUrl,
                                sets: []
                            });
                        }
                        
                        datas.motionList.find(motion => motion.routine_motion_id === routine_motion_id).sets.push({
                            set_id: set_id,
                            set_no: set_no,
                            weight: weight,
                            rep: rep,
                            mode: mode
                        });
                   }
                    rowCount++;
                    if (rowCount === rows.length){
                        console.log(datas);
                        console.log(datas.motionList[1].sets);
                        res.send(datas);
                    }
                });
                
            });
            
        }
    });
});

app.put('/routine/delete', function(req, res){
    const routineIds = req.body.routineIds;
    const placeholders = Array(routineIds.length).fill('?').join(',');
    const sql = `DELETE FROM routine where routine_id IN (${placeholders})`;
    db.run(sql,routineIds,err=>{
        if(err){
            console.error(err.message);
        }
    });
})

app.post('/routine/save', function(req, res){
    const routineMotions = req.body.motionList;
    const routineId = req.body.routine_id;
    const sql = 'DELETE FROM routine_motion where routine_id = ?';
    db.run(sql, routineId, err => {
        if(err){
            console.error(err.message);
        }
        else{
            for(let i = 0; i<routineMotions.length; i++){
                
                const insertRoutineMotion = 'INSERT INTO routine_motion (routine_id, motion_id, set_order) VALUES (?,?,?)';
                db.run(insertRoutineMotion,[routineId, routineMotions[i].motion_id, i+1], function(err) {
                    if(err){
                        console.error(err.message);
                    } else{
                        const routineMotionId = this.lastID;
                        for(let j = 0; j<routineMotions[i].sets.length; j++){
                            const insertSet = 'INSERT INTO set_info (routine_motion_id, set_no, weight, rep, mode) VALUES (?,?,?,?,?)';
                            db.run(insertSet,[routineMotionId,j+1,routineMotions[i].sets[j].weight,routineMotions[i].sets[j].rep,routineMotions[i].sets[j].mode], err=>{
                                if(err){
                                    console.error(err.message);
                                }
                            })
                        }
                    }
                })
            }
        }
    });
    
})

app.put('/routine/nameChange', function (req, res) {
    const routineName = req.body.routine_name;
    const routineID = req.body.routine_id;
    const sql = "UPDATE routine SET routine_name=? where routine_id=?";
    db.run(sql, [routineName, routineID], err => {
        if (err) {
            console.error(err.message);
        }
    });
    db.all('SELECT * FROM routine', (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
            console.log(rows);
        }
    });
});

app.get("/routine/loadMotion", function (req, res) {
    db.all('SELECT * FROM favorite', (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            const favoriteMotionIds = rows.map(row => row.motion_id);
            const placeholders = favoriteMotionIds.map(() => "?").join(",");
            const motionList = [];
            const sqlFav = `SELECT * FROM motion WHERE motion_id IN (${placeholders}) ORDER BY count desc`;
            db.all(sqlFav, favoriteMotionIds, (err, favRows) => {
                if (err) {
                    console.error(err);
                } else {
                    favRows.forEach(row => {
                        motionList.push({ ...row });
                    });
                }
            });
            const sqlNotFav = `SELECT * FROM motion WHERE motion_id NOT IN (${placeholders}) ORDER BY count desc`;
            db.all(sqlNotFav, favoriteMotionIds, (err, notFavRows) => {
                if (err) {
                    console.error(err);
                } else {
                    notFavRows.forEach(row => {
                        motionList.push({ ...row });
                    })
                    res.json(motionList);
                    console.log(motionList);
                }
            });

        }
    });
});




app.get("/motion/favInsert/:motion_id", function (req, res) {
    const motion_id = req.params.motion_id.slice(10);
    const sql = "INSERT INTO favorite (user_id, motion_id) values (?,?)";
    db.run(sql, [1, motion_id], function (err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log("insert fav");
        }
    });
});

app.delete("/motion/favDelete/:motion_id", function (req, res) {
    const motion_id = req.params.motion_id.slice(10);
    const sql = "DELETE FROM favorite where motion_id =?";
    db.run(sql, motion_id, function (err) {
        if (err) {
            console.error(err.message);
        } else {
            console.log("delete fav");
        }
    });
});

app.get("/motion/search/:motion_name", function (req, res) {
    const motion_name = req.params.motion_name.slice(12);
    const splitName = motion_name.split(' ');

    const sql = "SELECT * FROM motion WHERE motion_name LIKE ?";
    db.all(sql, `%${motion_name}%`, function (err, rows) {
        if (err) {
            console.error(err.message);
        } else {
            res.send(rows)
            console.log(rows);
        }
    })
});

app.put('/motion/add', function (req, res) {
    const motionIds = req.body.motion_ids;
    const placeholders = Array(motionIds.length).fill('?').join(',');
    const sql = `SELECT motion_id, motion_name, imageUrl FROM motion WHERE motion_id IN (${placeholders})`;
    db.all(sql, motionIds,(err, rows) => {
        if (err) {
            console.error(err);
        } else {
            res.json(rows);
            console.log(rows);
        }
    });
});

app.listen(4000, () => console.log("4000"));