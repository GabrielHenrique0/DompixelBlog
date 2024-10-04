// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextInput, Button, Title, Text } from '@mantine/core';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Verificar se o usuário já existe
    if (users.some((user: { username: string }) => user.username === username)) {
      setError('Usuário já existe');
      return;
    }

    // Salvar novo usuário no localStorage
    const newUser = { username, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    alert('Cadastro realizado com sucesso!');
    router.push('/login');
  };

  return (
    <Container>
      <Title>Cadastrar-se</Title>
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
      <Button onClick={handleRegister} mt="md">Cadastrar</Button>
    </Container>
  );
};

export default RegisterPage;
