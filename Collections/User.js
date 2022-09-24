const users = {
  name: "users",

  validator: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "Users Object Validation",

        required: ["username", "password"],

        properties: {
          username: {
            bsonType: "string",
            minLength: 1,
            description: "username must be a non-empty, required string",
          },
          password: {
            bsonType: "string",
            minLength: 1,
            description: "password must be a non-empty, required string",
          },
        },
      },
    },
  },
};

export default users;
