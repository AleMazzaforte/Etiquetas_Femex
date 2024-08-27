// authController.js
let estaLogueado = false;

module.exports = {
    getLogin: (req, res) => {
        res.render('./login');
    },

    postLogin: async (req, res) => {
        const { username, password } = req.body;
        if (username === username && password === password) {
            estaLogueado = true;
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Error al cerrar sesión');
            }
            res.redirect('/login');
        });
    },

    isAuthenticated: (req, res, next) => {
        if (estaLogueado) {
            return next();
        } else {
            res.redirect('/login');
        }
    }
};
