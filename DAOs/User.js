class UserDAO {
  static usersColl;

  static async init(usersColl) {
    this.usersColl = usersColl;
  }

  static async signUp(creds) {
    const doc = creds;
    const res = await this.usersColl.insertOne(doc);
  }

  // Todo
  static async signIn(creds) {}
}

export default UserDAO;
