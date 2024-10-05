// src/app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextInput, Button, Title, Text } from '@mantine/core';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Novo estado para confirmar a senha
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    // Verificação de campos vazios
    if (!username || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

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
    <Container className="cadastro-page">
      {/* Botão de voltar */}
      <Button onClick={() => router.push('/login')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
        Voltar
      </Button>

      <Container className='containerCadastro'>
        <Title>Cadastrar-se</Title>

        {/* Campo para Nome de Usuário */}
        <TextInput
        className='inputsForms'
          label="Nome de Usuário"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
          required
        />

        {/* Campo para Senha */}
        <TextInput
        className='inputsForms'
          label="Senha"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          required
        />

        {/* Campo para Confirmar Senha */}
        <TextInput
        className='inputsForms'
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          required
        />

        {/* Exibe erros, se houver */}
        {error && <Text color="red">{error}</Text>}

        {/* Botão de cadastro */}
        <Button onClick={handleRegister} mt="md">Cadastrar</Button>
      </Container>
    </Container>
  );
};

export default RegisterPage;
