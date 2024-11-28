import { findUser } from '../models/user.js'

export async function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'You are not authenticated!' });
    return;
  }

  const auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const email = auth[0];
  const password = auth[1];

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password must be provided' });
    return;
  }

  const user = await findUser({ email, password });
  if (!user) {
    res.status(400).json({ message: "The user not found" })
  }

  if (!user.is_active) {
    res.status(401).json({ message: "The user is blocked" })
  }

  next();
}