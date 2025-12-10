import Cookies from "js-cookie";

// 🔹 UNIVERSAL FETCHER (Guest + Auth support)
export const fetcher = async (endpoint, options = {}) => {
  const token = Cookies.get("token");
  const headers = new Headers();

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const isFormData = options.body instanceof FormData;
  if (!isFormData && options.method !== "GET") {
    headers.append("Content-Type", "application/json");
  }

  const fetchOptions = {
    method: options.method || "GET",
    headers,
    next: { revalidate: 3600 * 2 },
  };

  // Body handling
  if (options.method !== "GET") {
    if (isFormData) {
      fetchOptions.body = options.body;
    } else if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }
  }

  // Tambahkan credentials hanya di client (bukan server)
  if (typeof window !== "undefined") {
    fetchOptions.credentials = "include";
  }
  const res = await fetch(`${endpoint}`, fetchOptions);

  if (res.status === 401 || res.status === 403) {
    Cookies.remove("token");
    throw new Error("Unauthorized — please log in again.");
  }
  if (!res.ok) {
    let errorMessage = `Failed to fetch ${endpoint}`;

    try {
      const error = await res.json();
      if (error.message) errorMessage = error.message;
    } catch {}

    throw new Error(errorMessage);
  }

  return res.json();
};
