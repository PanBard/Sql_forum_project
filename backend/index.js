import express from 'express';
import bodyParser from 'body-parser'
import { createPool } from 'mysql'
import { json } from 'express';
import cors from 'cors'


const HOST ='mysql_database_forum'
const USER ='api_user'
const PASSWORD ='password'
const DATABASE = 'forum_db'

const db = createPool({    
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})



const app = express()
const port_number = 4001



app.use(bodyParser.json({limit: '50mb'}));
app.use(cors())
app.use(json())
app.use (bodyParser.urlencoded({extended: true})) // zeby cos chodzilo

// db.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }
//     console.log(`Successfull connect to database = ${DATABASE}`);
//     connection.release(); 
// });

app.listen(port_number, ()=>{
    console.log(`Najs - server is working on port: ${port_number}`,)
})


app.get("/", (req,res)=>{ //req - require , res - response
    res.send(`Server is working on port: ${port_number}`);
})

// // Fetch posts from view
// app.get('/view_user_posts', (req, res) => {
//     const sql = 'SELECT * FROM view_user_posts';
//     db.query(sql, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });









// // Fetch posts with their categories
// app.get('/view_posts_with_categories', (req, res) => {
//     const sql = 'SELECT * FROM view_posts_with_categories';
//     db.query(sql, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

// // Fetch posts with their tags
// app.get('/view_posts_with_tags', (req, res) => {
//     const sql = 'SELECT * FROM view_posts_with_tags';
//     db.query(sql, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });









// // Transfer post ownership
// app.post('/transfer_post_ownership', (req, res) => {
//     const { postId, newUserId } = req.body;
//     const sql = 'CALL transfer_post_ownership(?, ?)';
//     db.query(sql, [postId, newUserId], (err) => {
//         if (err) throw err;
//         res.json({ message: 'Post ownership transferred successfully' });
//     });
// });











// ----------------------------------------- uzywane ------------------------------------------------------

// Add user
app.post('/users', (req, res) => {
    const { username, password, email } = req.body;
    const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(sql, [username, password, email], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User added successfully', userId: result.insertId });
    });
});

// Fetch all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log("users all")
        res.send(results);
    });
});


// Delete from comments table
app.delete('/delete_comment/:commentId', (req, res) => {
    const commentId  = Number(req.params.commentId) ;
    console.log("commentId",commentId)
    const sql = 'DELETE FROM comments WHERE id=?;';
    db.query(sql,[commentId], (err, results) => {
        if (err) throw err;        
        res.json({message: 'Comment removed from db successfully'})
        console.log("comments deleted")
    });
});


// Add post   in  transaction
app.post('/add_post_with_transaction', (req, res) => {
    const { userId, postTitle, postContent,postCategory_id } = req.body;
    const sql = 'CALL add_post_with_transaction(?, ?, ?,?)';
    console.log(userId,postTitle,postContent,postCategory_id)
    db.query(sql, [userId, postTitle, postContent, postCategory_id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Post  added successfully' });
        console.log("new post: ",postTitle)
    });
});

/// Add comment   in  transaction
app.post('/add_comment_with_transaction', (req, res) => {
    const { post_id, user_id, content } = req.body;
    const sql = 'CALL add_comment_with_transaction(?, ?, ?)';
    db.query(sql, [post_id, user_id, content], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Comment  added successfully' });
        // console.log("new post: ",postTitle)
    });
});

// Update post in transaction
app.post('/update_post_with_transaction', (req, res) => {
    const { postId, newTitle, newContent, categoryId } = req.body;
    const sql = 'CALL update_post_with_transaction(?, ?, ?, ?)';
    db.query(sql, [postId, newTitle, newContent,categoryId], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Post updated  successfully' });
    });
});

// custom_query
app.post('/custom_query', (req, res) => {
    const QUERY = req.body.query
    console.log("custom query:",QUERY)
    db.query(QUERY, (err, result) => {
        // if (err) throw err;
        res.send(result)
        console.log("dending result:")
    });
});





//----------------views
// Fetch post statistics from view
app.get('/view_post_statistics/:postId', (req, res) => {
    const postId  = req.params.postId;
    const sql = 'SELECT * FROM view_post_statistics WHERE id=?';
    console.log("sql",postId)
    db.query(sql,[postId], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});
//----------------views




//------------------ PROCEDURES

app.get('/specific_comments/:postId', (req, res) => {
    const postId  = req.params.postId;
    console.log("postId",postId)
    const sql = 'CALL GetCommentsForPost(?)';
    db.query(sql,[postId], (err, results) => {
        if (err) throw err;
        res.send(results)
        // res.json(results)
    });
});

app.get('/get_post_by_id/:postId', (req, res) => {
    const postId  = req.params.postId;
    console.log("postId",postId)
    const sql = 'CALL get_post_by_id(?)';
    db.query(sql,[postId], (err, results) => {
        if (err) throw err;
        res.send(results)
        // res.json(results)
    });
});




app.get('/user_posts/:userId', (req, res) => {
    const userId  = req.params.userId;
    console.log("postId",userId)
    const sql = 'CALL get_posts_for_user(?)';
    db.query(sql,[userId], (err, results) => {
        if (err) throw err;
        res.send(results)
    });
});

app.get('/user_comments/:userId', (req, res) => {
    const userId  = req.params.userId;
    console.log("postId",userId)
    const sql = 'CALL get_comments_for_user(?)';
    db.query(sql,[userId], (err, results) => {
        if (err) throw err;
        res.send(results)
    });
});

app.get('/get_posts_sorted_by_comment_count', (req, res) => {
    const sql = 'CALL get_posts_sorted_by_comment_count()';
    db.query(sql,(err, results) => {
        if (err) throw err;
        res.send(results)
    });
});

app.get('/get_posts_sorted_by_date', (req, res) => {
    const sql = 'CALL get_posts_sorted_by_date()';
    db.query(sql,(err, results) => {
        if (err) throw err;
        res.send(results)
    });
});

app.get('/get_posts_sorted_by_category/:categoryId', (req, res) => {
    const categoryId  = req.params.categoryId;
    console.log("categoryId",categoryId)
    const sql = 'CALL get_posts_by_category(?)';
    db.query(sql,[categoryId],(err, results) => {
        if (err) throw err;
        res.send(results)
    });
});


app.delete('/delete_post_and_related_comments/:postId', (req, res) => {
    const postId  = req.params.postId;
    console.log("CALL delete_post_and_related_comments(?)",postId)
    const sql = 'CALL delete_post_and_related_comments(?)';
    db.query(sql,[postId],(err, results) => {
        if (err) throw err;
        console.log(results)
        res.json({message: 'Post nad related data removed from db successfully', results:results})
    });
});

app.delete('/delete_user_and_related_data/:userId', (req, res) => {
    const userId  = req.params.userId;
    console.log("userId",userId)
    const sql = 'CALL delete_user_and_related_data(?)';
    db.query(sql,[userId],(err, results) => {
        if (err) throw err;
        console.log(results)
        res.json({message: 'User and related data removed from db successfully', results:results})
    });
});




//------------------ PROCEDURES





//------------------ FUNCTIONS

app.get('/postCount/:userId', (req, res) => {
    const userId  = req.params.userId;
    console.log("postCount for userID: ",userId)
    const sql = `SELECT count_user_posts(${userId}) AS postCount`;
    db.query(sql,[userId], (err, results) => {
        if (err) throw err;
        res.send(results)
    });
});

app.get('/commentCount/:userId', (req, res) => {
    const userId  = req.params.userId;
    console.log("commentCount for userID: ",userId)
    const sql = `SELECT count_user_comments(${userId}) AS commentCount`;
    db.query(sql,[userId], (err, results) => {
        if (err) throw err;
        res.send(results)
    });
});



// Calculate average post length
app.get('/get_summary_stats', (req, res) => {
    const sql = 'CALL get_summary_stats()';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//------------------ FUNCTIONS