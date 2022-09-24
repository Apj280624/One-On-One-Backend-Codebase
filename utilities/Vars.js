const SERVER_ROUTES = {
  SIGN_UP: "/api/auth/sign-up",
  VERIFY_TOKEN: "/api/auth/verify-token",
};

const SERVER_ROUTES_LAYER_1 = {
  AUTH: "/api/auth",
};

const SERVER_ROUTES_LAYER_2 = {
  SIGN_UP: "/sign-up",
  VERIFY_TOKEN: "/verify-token",
};

const STATUS_TEXT = {
  SIGN_UP_SUCCESS: "You have been signed up successfully",
  SIGN_UP_FAIL: "We were to unable to sign you up. Please try again",
  USERNAME_EXISTS: "An account with this username already exists",
};

export { SERVER_ROUTES_LAYER_1, SERVER_ROUTES_LAYER_2, STATUS_TEXT };
