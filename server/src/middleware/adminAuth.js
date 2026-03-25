export function adminAuth(req, res, next) {
  const expectedEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  const requestEmail = req.header("x-admin-email")?.toLowerCase();

  if (!expectedEmail) {
    return res.status(500).json({ message: "ADMIN_EMAIL is not configured on server." });
  }

  if (!requestEmail || requestEmail !== expectedEmail) {
    return res.status(403).json({ message: "Forbidden: invalid admin email." });
  }

  return next();
}
