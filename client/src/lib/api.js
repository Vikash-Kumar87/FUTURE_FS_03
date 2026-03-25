const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // Use generic error message when response body is not JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function getAdminHeaders(userEmail) {
  return {
    "x-admin-email": userEmail || "",
    "x-admin-api-key": import.meta.env.VITE_ADMIN_API_KEY || ""
  };
}

export function createContact(payload) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function createAppointment(payload) {
  return request("/appointments", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getAdminContacts(userEmail) {
  return request("/admin/contacts", {
    headers: getAdminHeaders(userEmail)
  });
}

export function getAdminAppointments(userEmail) {
  return request("/admin/appointments", {
    headers: getAdminHeaders(userEmail)
  });
}

export function deleteAdminContact(userEmail, id) {
  return request(`/admin/contacts/${id}`, {
    method: "DELETE",
    headers: getAdminHeaders(userEmail)
  });
}

export function deleteAdminAppointment(userEmail, id) {
  return request(`/admin/appointments/${id}`, {
    method: "DELETE",
    headers: getAdminHeaders(userEmail)
  });
}

export function clearAdminData(userEmail) {
  return request("/admin/all", {
    method: "DELETE",
    headers: getAdminHeaders(userEmail)
  });
}
