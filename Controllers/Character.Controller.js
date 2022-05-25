const CharacterModel = require('../Models/Character.Model');

module.exports = {
    create: async (req, res) =>
    {
        const { name, scenario, age, lore} = req.body;
        const owner = req.session.userId;  
        
        await CharacterModel.create({
            name: name,
            scenario: scenario,
            age: age,
            lore: lore,
            owner: owner
        });

        res.send({ message: 'User sucessfully created' });
    }
}