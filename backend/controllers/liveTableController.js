const db = require("../models");
const Initiatives = db.initiatives;
const Op = db.Sequelize.Op;

// Create and Save a new row
exports.create = (req, res) => {
  if(!req.body){
      res.status(400).send({
          message:"initiative can not be empty!"
      })
      return
  }
  const initiative = {
      category: req.body.values.category,
      initiatives: req.body.values.initiatives,
      experience_focus_area: req.body.values.experienceFocusAreas,
      entity_kpi: req.body.values.entityKPI,
      kpi: req.body.values.kpi,
      actual: req.body.values.actual,
      target: req.body.values.target,
      delivery_date: new Date(req.body.values.deliveryDate),
      status: req.body.values.status,
      createdAt: new Date(),
      updatedAt: new Date(),
  }
  Initiatives.create(initiative)
  .then(data =>{
      res.send(data);
  }).catch(err =>{
      res.status(500).send({
          message: err.message || "Error creating initiative"
      })
  })
};

// Retrieve all rows from the database.
exports.findAll = (req, res) => {
    Initiatives.findAll()
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
                err.message || "Error occured while retrieving Initiatives"
        })
    })
};

// Find filtered rows
exports.getFilteredData = (req, res) => {
  const desc = req.params.description;
  Initiatives.findAll({
    where:{
      description:{
        [Op.like]:desc
      }
    }
  })
  .then(data =>{
    res.send(data);
  })
  .catch(err =>{
    res.status(500).send({
      message:
      err.message || "Error occured while retrieving Initiatives"
    })
  })
};

// Update a row by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  Initiatives.update(req.body.values, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Item was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Item with id=" + id
      });
    });
};

// Delete a row with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Initiatives.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "initiative was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete initiative with id=${id}. Maybe initiative was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete initiative with id=" + id
        });
      });
};
