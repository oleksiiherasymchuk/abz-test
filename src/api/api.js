const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

// GET TOKEN QUERY
export const getToken = async () => {
  const res = await fetch(`${BASE_URL}/token`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.token;
};

// GET POSITIONS QUERY
export const getPositions = async () => {
  const res = await fetch(`${BASE_URL}/positions`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
};

// GET USERS GUERY
// DEFAULT FIRST PAGE WITH 6 USERS
export const getUsers = async (page = 1, count = 6) => {
  const res = await fetch(`${BASE_URL}/users?page=${page}&count=${count}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data;
};

// POST USER FROM FORM DATA
export const registerUser = async (formData, token) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { Token: token },
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Помилка при відправці");
  }

  const data = await res.json();
  return data;
};
