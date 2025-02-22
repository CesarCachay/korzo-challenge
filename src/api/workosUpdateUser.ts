const WORKOS_API_URL = 'https://api.workos.com/user_management/authenticate';

export async function authenticateUser(email: string, password: string) {
  try {
    const response = await fetch(WORKOS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_WORKOS_CLIENT_SECRET}`,
      },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_WORKOS_CLIENT_ID,
        grant_type: 'password',
        email,
        password,
        ip_address: '192.0.2.1',
        user_agent: navigator.userAgent,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Authentication failed');

    return data; // Returns { token, user }
  } catch (error) {
    console.error('Authentication Error:', error.message);
    return { error: error.message };
  }
}
