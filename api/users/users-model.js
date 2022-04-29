const db = require('../../data/dbConfig');

module.exports = {
    findById,
    add
}

function findById(id){
    return db('users').where('id', id).first();
}

async function add(user){
    const [id] = await db('users').insert(user);
    return findById(id);
}