const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Giả lập database user (sau này sẽ thay bằng model thật)
const users = [
    {
        id: 1,
        email: 'test@example.com',
        password: '123', // "password123"
    }
];

// Xử lý đăng nhập
const handleLogin = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Tìm user trong database
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Kiểm tra password
        const user_pass = users.find(u => u.password === password);
        if (!user_pass) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // // Tạo JWT token
        // const token = jwt.sign(
        //     { userId: user.id },
        //     process.env.JWT_SECRET || 'your-secret-key',
        //     { expiresIn: '24h' }
        // );

        // // Lưu token vào cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 24 * 60 * 60 * 1000 // 24 hours
        // });

        // Chuyển hướng đến trang home
        res.redirect('/home');

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
},

// Xử lý đăng nhập với Google
handleGoogleAuth = async (req, res) => {
    try {
        // Implement Google OAuth logic here
        res.status(501).json({
            message: 'Google authentication not implemented yet'
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
},

// Xử lý đăng nhập với Apple
handleAppleAuth = async (req, res) => {
    try {
        // Implement Apple OAuth logic here
        res.status(501).json({
            message: 'Apple authentication not implemented yet'
        });
    } catch (error) {
        console.error('Apple auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const getLoginPage = (req, res) => {
    res.render('login', { layout: 'main', page: 'login' });
}

module.exports = {
    getLoginPage,
    handleLogin
}

