const { hash, compare } = require("bcryptjs");

const hashPassword = async (password) => {
  return await hash(password, 10);
};
const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
