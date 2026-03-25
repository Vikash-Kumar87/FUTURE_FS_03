import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageShell from "../components/PageShell";
import { useAuth } from "../context/AuthContext";

function getFriendlyAuthMessage(authError) {
  const code = authError?.code;

  if (code === "auth/invalid-email") return "Email format is invalid.";
  if (code === "auth/user-not-found" || code === "auth/invalid-credential") return "Account not found. Use Register first, then Login.";
  if (code === "auth/wrong-password") return "Incorrect password.";
  if (code === "auth/email-already-in-use") return "This email is already registered. Switch to Login mode.";
  if (code === "auth/weak-password") return "Password should be at least 6 characters.";
  if (code === "auth/popup-closed-by-user") return "Google sign-in popup was closed before finishing.";
  if (code === "auth/unauthorized-domain") return "This domain is not authorized in Firebase. Add localhost in Firebase Authentication settings.";

  return authError?.message || "Authentication failed. Please try again.";
}

function isAdminAllowed(email) {
  const expected = import.meta.env.VITE_ADMIN_EMAIL?.trim().toLowerCase();
  if (!expected) return true;
  return email?.toLowerCase() === expected;
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState(() => import.meta.env.VITE_ADMIN_EMAIL || "");
  const [password, setPassword] = useState("1234560");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const { loginWithEmail, registerWithEmail, logout, resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const openedFromAdminNav = Boolean(location.state?.fromAdminNav);

    if (isMobile && !openedFromAdminNav) {
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  async function handleEmailAuth(event) {
    event.preventDefault();
    setError("");
    try {
      const result = mode === "register"
        ? await registerWithEmail(email, password)
        : await loginWithEmail(email, password);

      const signedInEmail = result?.user?.email;
      if (!isAdminAllowed(signedInEmail)) {
        await logout();
        setError(`This account is not an authorized admin. Allowed admin: ${import.meta.env.VITE_ADMIN_EMAIL || "(not configured)"}`);
        return;
      }

      navigate("/admin/dashboard");
    } catch (authError) {
      if (mode === "register" && authError?.code === "auth/email-already-in-use") {
        setMode("login");
      }
      setError(getFriendlyAuthMessage(authError));
    }
  }

  async function handleForgotPassword() {
    setError("");

    if (!email.trim()) {
      setError("Enter your email first, then click Forgot Password.");
      return;
    }

    try {
      await resetPassword(email.trim());
      setError("Password reset link sent. Check your email inbox.");
    } catch (authError) {
      setError(getFriendlyAuthMessage(authError));
    }
  }

  return (
    <PageShell>
      <section className="section-wrap py-16">
        <div className="glass mx-auto max-w-md p-7">
          <h1 className="font-heading text-3xl font-extrabold">Admin Access</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Only authorized admin email can access the dashboard.</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Configured admin: {import.meta.env.VITE_ADMIN_EMAIL || "not set"}</p>

          <form onSubmit={handleEmailAuth} className="mt-6 space-y-3">
            <input type="email" autoComplete="email" placeholder="Email" className="w-full rounded-xl border bg-white/80 p-3 dark:bg-slate-900/70" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                placeholder="Password"
                className="w-full rounded-xl border bg-white/80 p-3 pr-12 dark:bg-slate-900/70"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c5 0 9.3 3.1 11 8-1 2.8-3 5-5.5 6.5" />
                    <path d="M6.6 6.7C4.7 8 3.3 9.8 2.5 12c1.7 4.9 6 8 10.9 8 1.5 0 2.9-.3 4.1-.8" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <button className="w-full rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white">{mode === "register" ? "Create Account" : "Login"}</button>
          </form>

          <button type="button" onClick={handleForgotPassword} className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            Forgot Password?
          </button>
          <button onClick={() => setMode((m) => (m === "login" ? "register" : "login"))} className="mt-3 text-sm font-semibold text-brand-600">
            {mode === "login" ? "Need an account? Register" : "Already have an account? Login"}
          </button>
          <p className="mt-2 text-sm text-rose-500">{error}</p>
          <Link to="/" className="mt-4 inline-block text-sm font-semibold text-slate-600">Back to website</Link>
        </div>
      </section>
    </PageShell>
  );
}
