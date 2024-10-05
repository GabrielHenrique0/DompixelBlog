'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextInput, Button, Title, Text } from '@mantine/core';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((user: { username: string, password: string }) => user.username === username && user.password === password);

    if (user) {
      sessionStorage.setItem('loggedUser', username);
      alert('Login realizado com sucesso!');
      router.push('/postar');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <Container className="login-page">
      <Button onClick={() => router.push('/')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
        Voltar
      </Button>
      <Container className="containerLogin">
        <Title>Login</Title>
        <TextInput
          className="inputsForms"
          label="Nome de Usuário"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
        />
        <TextInput
          className="inputsForms"
          label="Senha"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
        />
        {error && <Text>{error}</Text>}
        <Button onClick={handleLogin} mt="md">Entrar</Button>
        <Button onClick={() => router.push('/cadastrar')} mt="md">Cadastrar</Button>
      </Container>
    </Container>
  );
};

export default LoginPage;