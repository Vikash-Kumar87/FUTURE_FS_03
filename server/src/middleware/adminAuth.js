export function adminAuth(req, res, next) {
  const expectedEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const expectedApiKey = process.env.ADMIN_API_KEY;

  const requestEmail = req.header("x-admin-email")?.toLowerCase();
  const requestApiKey = req.header("x-admin-api-key");

  if (!expectedEmail) {
    return res.status(500).json({ message: "ADMIN_EMAIL is not configured on server." });
  }

  if (!requestEmail || requestEmail !== expectedEmail) {
    return res.status(403).json({ message: "Forbidden: invalid admin email." });
  }

  if (expectedApiKey && requestApiKey !== expectedApiKey) {
    return res.status(403).json({ message: "Forbidden: invalid admin API key." });
  }

  return next();
}
