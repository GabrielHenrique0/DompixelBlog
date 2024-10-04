// src/app/login/page.tsx
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
      router.push('/');
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <TextInput
        label="Nome de Usuário"
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
        required
      />
      <TextInput
        label="Senha"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        required
      />
      {error && <Text color="red">{error}</Text>}
      <Button onClick={handleLogin} mt="md">Entrar</Button>
      <Button onClick={() => router.push('/register')} mt="md">Cadastrar</Button>
    </Container>
  );
};

export default LoginPage;
