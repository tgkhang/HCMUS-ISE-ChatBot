const getChatPage = (req, res) => {
    // Lấy câu hỏi từ query string
    const user_input = req.query.user_input;  // Lấy từ req.query
    console.log("CHECK BACKEND input: ", user_input);
    res.render('index', { layout: 'main', page: 'home', user_input: user_input });
}

module.exports = {
    getChatPage,
}
