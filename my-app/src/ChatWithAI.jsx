import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ChatWithAI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const inviteCode = '28888';

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegister = () => {
    if (!registerUsername || !registerPassword || !inviteCodeInput) {
      alert('Please fill in all fields.');
      return;
    }

    if (inviteCodeInput !== inviteCode) {
      alert('Invalid invite code.');
      return;
    }

    localStorage.setItem('username', registerUsername);
    localStorage.setItem('password', registerPassword);
    alert('Registration successful! You can now log in.');
  };

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('loggedIn', 'true');
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    // Clear user token and update state
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setRegisterUsername('');
    setRegisterPassword('');
    setUserInput('');
    setResponse('');
    alert('You have been logged out.');
  };

  const handleSubmitMessage = async () => {
    if (!userInput) {
      alert('Please enter a message.');
      return;
    }

    if (!isLoggedIn) {
      alert('You are not authorized to send messages.');
      return;
    }

    try {
      const response = await fetch('https://ai.mingowhk.workers.dev/', {
        method: 'POST',
        body: JSON.stringify({ content: userInput }),
      });

      const data = await response.json();

      if (data.error) {
        setResponse('Error: ' + data.error);
      } else {
        setResponse('AI: ' + data.result);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while communicating with the server.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Chat with AI</h1>

      {!isLoggedIn ? (
        <>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: '#4CAF50', // Green
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#45a049',
                    },
                  }}
                >
                  Login
                </Button>
              </Stack>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
            />
            <input
              type="text"
              placeholder="Invite Code"
              value={inviteCodeInput}
              onChange={(e) => setInviteCodeInput(e.target.value)}
              style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={handleRegister}
                  sx={{
                    backgroundColor: '#2196F3', // Blue
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#0b7dda',
                    },
                  }}
                >
                  Register
                </Button>
              </Stack>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Type your message here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              style={{ padding: '10px', width: '300px', marginBottom: '10px' }} // Add marginBottom here
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  onClick={handleSubmitMessage}
                  sx={{
                    backgroundColor: '#FF5722', // Orange
                    color: 'white',
                    padding: '10px 20px',
                    marginTop: '10px', // Add marginTop here
                    '&:hover': {
                      backgroundColor: '#e64a19',
                    },
                  }}
                >
                  Send
                </Button>
                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: '#f44336', // Red
                    color: 'white',
                    padding: '10px 20px',
                    marginTop: '10px', // Add marginTop here
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    },
                  }}
                >
                  Logout
                </Button>
              </Stack>
            </div>
          </div>
        </>
      )}

      <div
        id="response"
        style={{
          marginTop: '20px',
          border: '1px solid #ccc',
          padding: '10px',
          width: '300px',
          minHeight: '50px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {response}
      </div>
    </div>
  );
}

export default ChatWithAI;
