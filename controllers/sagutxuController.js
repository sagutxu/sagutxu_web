const Sagutxu = require('../models/Sagutxu');
const Temperatura = require('../models/Temperatura');

exports.sagutxu_index = async (req, res) => {
    if (req.session.loggedin) {
        try {
            const lastTemp = await Temperatura.find().sort({$natural:-1}).limit(20);
            res.render('index', {menuId : "index", lastTemps: lastTemp});
        } catch {
            res.render('index', {menuId : "index"});
        }
    } else {
        res.render('login', {menuId : "login"});
    }
    res.end();
}

exports.sagutxu_login = async (req, res) => {
    res.render('login', {menuId : "login"});
}

exports.sagutxu_authentication = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        let usuario = await Sagutxu.find({'usuario': username, 'contrasena': password});
        try {
            if (usuario[0].usuario) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/');
            } 
        } catch {
            res.redirect('/login');
        }
        res.end();
    } else {
		res.send('Please enter Username and Password!');
		res.end();
    }
}

exports.sagutxu_estadisticas = async (req, res) => {
    res.render('estadisticas', {menuId : "estadisticas"});
}

exports.sagutxu_control = async (req, res) => {
    res.render('control', {menuId : "control"});
}

exports.sagutxu_registro = async (req, res) => {
    res.render('registro', {menuId : "registro"});
}

exports.sagutxu_logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}

exports.sagutxu_registro_auth = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        let usuario = await Sagutxu.find({'usuario': username});
        const sagutxu = new Sagutxu({
            usuario: username,
            contrasena: password
        });
        
        try {
            if (usuario[0].usuario) {
                res.redirect('/registro');
            }
        } catch {
            try {
                await sagutxu.save();
                res.redirect('/');
            } catch (error) {
                res.status(400).json({mensaje: error});
            }
        }
    }
}