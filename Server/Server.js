const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const saltRounds = 10
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))

const privateKey = process.env.REACT_APP_PRIVATE_KEY

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spices storyline'
});
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to the database');
});

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({error : "You are not authenticated"})
    }else{
        jwt.verify(token, privateKey,(err, decoded) =>{
            if(err){
                return res.json({error : "Token is not Okay"})
            }
            else{
                req.username = decoded.username;
                req.email = decoded.email;
                next();
            }
        })
    }
}
app.get('/auth',verifyUser,(req,res)=>{
    return res.json({Status: "Success", email: req.email, username: req.username})

})  
// SignUp API
app.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    //Check Username and Email in Database
    db.query('SELECT * FROM credentials WHERE Username = ? OR Email = ?', [username, email], (err, result) => {
        if (err) {
            console.error('Error checking for existing user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length > 0) {
            for (const user of result) {
                if (user.Username === username) {
                    return res.status(400).json({ error: 'Username is already taken' });
                }
                if (user.Email === email) {
                    return res.status(400).json({ error: 'Email is already registered' });
                }
            }
        }
        // If checked ,Create new account in Database
        else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query('INSERT INTO credentials (Username, Email, Password) VALUES (?, ?, ?)', [username, email, hash], (err) => {
                        if (err) {
                            console.error('Error inserting new user:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        res.status(201).json({ message: 'User registered successfully' });
                    });
                }
            });
        }
    });
});

// LOGIN API
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    db.query('SELECT * FROM credentials WHERE Email = ? ', [email], (err, result) => {
        if (err) {
            console.error('Error querying for user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].Password, (error, response) => {
                if (response) {
                    
                    const username = result[0].Username;
                    const email = result[0].Email;
                    const token = jwt.sign({ username, email }, privateKey, { expiresIn: '1d' })
                    res.cookie('token', token)
                    return res.status(200).json({ message: 'Login Successful' });

                }
                else {
                    return res.status(401).json({ error: 'Invalid Email or Password' });
                }
            });
        }
        else {
            return res.status(401).json({ error: 'Email not found' });
        }
    });
});

// Update Password API
app.post('/update-password', verifyUser, (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    db.query('SELECT Password FROM credentials WHERE Email = ?', [req.email], async (err, result) => {
        if (err) {
            console.error('Error querying for user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        const isPasswordMatch = await bcrypt.compare(oldPassword, result[0].Password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Invalid Old password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        db.query('UPDATE credentials SET Password = ? WHERE Email = ?', [hashedPassword, req.email], (err) => {
            if (err) {
                console.error('Error updating password:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json({ error: 'Password updated successfully' });
        });
    });
});

// Logout API
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
