// User model - defines the User schema
class User {
  constructor(id, name, email, password, createdAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  // Static method to create from database row
  static fromDatabase(row) {
    return new User(row.id, row.name, row.email, row.password, row.created_at);
  }
}

export default User;
