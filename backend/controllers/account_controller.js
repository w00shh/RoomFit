const Account = require('../models/account_model');

const email_register = (req, res) => {
  if (!req.body)
    res.status(400).send({
      message: 'Content can not be empty!',
    });

  const account = new Account({
    user_id: req.body.user_id,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    is_api: 0,
  });

  Account.create(account, (err, id) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating Account.',
        success: 0,
      });
    else {
      res.json({ account_id: account.user_id, success: 1 });
    }
  });
};

const account_update = (req, res) => {
  if (!req.body)
    res.status(400).send({
      message: 'Content can not be empty!',
    });

  const update_account = new Account({
    user_id: req.body.user_id,
    birth: req.body.birth || undefined,
    gender: req.body.gender || undefined,
    height: req.body.height || undefined,
    weight: req.body.weight || undefined,
    experience: req.body.experience || undefined,
    body_fat: req.body.body_fat || undefined,
  });

  Account.update(update_account, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occured while updating Workout.',
      });
    else res.send(data);
  });
};

const account_login = (req, res) => {
  if (!req.body)
    res.status(400).send({
      message: 'Content can not be empty!',
    });

  const account = new Account({
    email: req.body.email,
    password: req.body.password,
    is_api: 0,
  });

  Account.login(account, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while login.',
        success: 0,
      });
    else {
      res.json({ account_id: account.user_id, success: 1 });
    }
  });
};

module.exports = {
  email_register,
  account_update,
  account_login,
};
