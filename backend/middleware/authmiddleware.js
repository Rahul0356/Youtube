import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET environment variable. Add it to your .env file.");
  process.exit(1);
}

export function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req._id = decoded; // Attach decoded user info to the request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
}
