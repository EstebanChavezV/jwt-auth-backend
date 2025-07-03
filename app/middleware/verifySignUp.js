import db from "../models/index.js";

const ROLES = db.ROLES;
const User = db.user;
//Esteban Yahir Chávez Villalta
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    const user = await User.findOne({
      where: { username: req.body.username }
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!"
      });
    }

    // Email
    const email = await User.findOne({
      where: { email: req.body.email }
    });

    if (email) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

export default verifySignUp;

//Esteban Yahir Chávez Villalta