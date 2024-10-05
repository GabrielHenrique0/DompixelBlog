'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextInput, Button, Title, Textarea } from '@mantine/core';
import axios from 'axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [apiPostsCount, setApiPostsCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchApiPostsCount = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setApiPostsCount(response.data.length);
      } catch (error) {
        console.error('Erro ao buscar as postagens da API:', error);
      }
    };

    fetchApiPostsCount();
  }, []);

  const handleCreatePost = () => {
    const loggedUser = sessionStorage.getItem('loggedUser');
    if (!loggedUser) {
      alert('Você precisa estar logado para criar uma postagem.');
      router.push('/login');
      return;
    }

    // Buscar postagens existentes
    const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');

    const lastApiId = apiPostsCount;
    const lastUserId = existingPosts.length > 0 ? existingPosts[existingPosts.length - 1].id : lastApiId;
    const newId = lastUserId + 1;

    // Criar nova postagem com ID sequencial à última postagem da API
    const newPost = {
      id: newId,
      title,
      body,
      image: image || 'https://via.placeholder.com/150', // Template de imagem se não for fornecida
      author: loggedUser,
    };

    // Armazenar nova postagem no localStorage
    localStorage.setItem('userPosts', JSON.stringify([...existingPosts, newPost]));

    alert('Postagem criada com sucesso!');
    router.push('/');
  };

  return (
    <Container className="create-page">
      <Button onClick={() => router.push('/')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
        Voltar
      </Button>
      <Container className="containerCreate">
        <Title>Criar nova postagem</Title>
        <TextInput
          label="Título"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          required
        />
        <Textarea
          className="conteudoPostagem"
          label="Conteúdo"
          value={body}
          onChange={(event) => setBody(event.currentTarget.value)}
          required
        />
        <TextInput
          label="URL da Imagem"
          value={image}
          onChange={(event) => setImage(event.currentTarget.value)}
        />
        <Button onClick={handleCreatePost} mt="md">Criar</Button>
      </Container>
    </Container>
  );
};

export default CreatePostPage;