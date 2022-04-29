const { findBy } = require("../users/users-model");

module.exports = {
    validateUserData(req, res, next){
        const { username, password } = req.body;
        if(!username 
            || username.trim() === '' 
            || username.trim().length > 255
            || !password
            || password.trim() === ''
            || password.trim().length > 255
        ){
            res.status(404).json({ message: 'username and password required' })
            return;
        } else {
            next();
        };
    },

    async validateUniqueName(req, res, next){
        const { username } = req.body;
        const user = await findBy({ username });
        console.log(user)
        if(!user){
            next();
        } else {
            res.status(404).json({ message: 'username taken' });
        }
    }
}