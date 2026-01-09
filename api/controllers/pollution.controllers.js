const { v4: uuidv4 } = require ("uuid");


const db = require("../models");
const Pollution = db.pollutions;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {

     Pollution.findAll()
    .then(data => {res.send(data);})
    .catch(err => {
      res.status(400).send({
        message: err.message
      });
    });

}; 

// Récupérer une pollution par id
exports.getOne = (req, res) => {
  const id = req.params.id;

  Pollution.findByPk(id)
    .then(data => {
      if (!data) return res.status(404).send({ message: 'Pollution non trouvée.' });
      res.send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

// Créer une pollution
exports.create = (req, res) => {
  const payload = req.body;

  Pollution.create(payload)
    .then(newItem => res.status(201).send(newItem))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Mettre à jour une pollution
exports.update = (req, res) => {
  const id = req.params.id;
  const updated = req.body;

  Pollution.update(updated, { where: { id } })
    .then(([affected]) => {
      if (!affected) return res.status(404).send({ message: 'Pollution non trouvée.' });
      return Pollution.findByPk(id);
    })
    .then(item => res.send(item))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Supprimer une pollution
exports.delete = (req, res) => {
  const id = req.params.id;

  Pollution.destroy({ where: { id } })
    .then(affected => {
      if (!affected) return res.status(404).send({ message: 'Pollution non trouvée.' });
      res.send({ message: 'Pollution supprimée.' });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
