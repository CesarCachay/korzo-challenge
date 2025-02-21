// Example React code
import { useState } from 'react';

export default function ActivateUserForm() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleActivate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_STOCK_API_URL}/auth/activate-user    `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Failed to activate user');
      }
    } catch (error) {
      console.error('Error activating user:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <form
      onSubmit={handleActivate}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}
    >
      <label htmlFor="userId">
        User ID:
        <input
          style={{ marginLeft: '10px', height: '40px', marginBottom: '20px' }}
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        New Password:
        <input
          style={{ marginLeft: '10px', height: '40px' }}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button style={{ marginTop: '20px', height: '50px', width: '240px' }} type="submit">
        Activate User
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}
