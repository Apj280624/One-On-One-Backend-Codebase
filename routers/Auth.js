import { Router } from "express";
const authRouter = Router();

// my modules
import { SERVER_ROUTES_LAYER_2, STATUS_TEXT } from "../utilities/Vars.js";

// DAOs
import UserDAO from "../DAOs/User.js";

///////////////////////////////////////////////////////////////////////////////////////////////

authRouter.post(SERVER_ROUTES_LAYER_2.SIGN_UP, async (req, res) => {
  // Todo: hash password using Bcrypt

  try {
    await UserDAO.signUp(req.body);

    res.status(200).send(STATUS_TEXT.SIGN_UP_SUCCESS);
  } catch (err) {
    // Todo: send customize errors according to situation
    res.status(500).send(STATUS_TEXT.SIGN_UP_FAIL);
  }
});

export default authRouter;
