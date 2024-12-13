
const getHomePage = (req, res) => {
    // res.render('index', { layout: 'main', page: 'home' });
    res.render('home_chat', { layout: 'main', page: 'home_chat'});
}

module.exports = {
    getHomePage
}