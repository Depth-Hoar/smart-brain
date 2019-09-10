// finish the rest of the functions (full stack code review #286 12min)

const handleRegister = (req, res, db, bcrypt, saltRounds) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission');
    }
    var hash = bcrypt.hashSync(password, saltRounds);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                    res.json(user[0]);
                    }) 
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        // Store hash in your password DB.
    // bcrypt.hash(password, saltRounds).then(function(hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};