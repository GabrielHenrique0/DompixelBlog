// src/app/posts/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, Textarea, Button, Container, Title, FileInput } from '@mantine/core';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // Arquivo local de imagem
  const [imageUrl, setImageUrl] = useState(''); // URL da imagem
  const router = useRouter();

  const handleSubmit = () => {
    const existingPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');

    // Buscar o último ID das postagens
    const existingApiPosts = JSON.parse(localStorage.getItem('apiPosts') || '[]');
    const allPosts = [...existingApiPosts, ...existingPosts];
    const lastId = allPosts.length > 0 ? Math.max(...allPosts.map(post => post.id)) : 100;

    // Usar o arquivo de imagem ou a URL, priorizando a imagem local
    const imageToUse = imageFile
      ? URL.createObjectURL(imageFile) // Usar a URL temporária gerada pelo File
      : imageUrl || 'https://via.placeholder.com/150'; // Usar a URL inserida ou uma imagem padrão

    const newPost = {
      id: lastId + 1,
      title,
      body,
      image: imageToUse,
    };

    const updatedPosts = [...existingPosts, newPost];
    localStorage.setItem('userPosts', JSON.stringify(updatedPosts));

    router.push('/');
  };

  return (
    <Container>
      <Title order={1} mb="md">Criar Nova Postagem</Title>
      <TextInput
        label="Título"
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        mb="md"
        required
      />
      <Textarea
        label="Conteúdo"
        value={body}
        onChange={(event) => setBody(event.currentTarget.value)}
        mb="md"
        required
      />
      <FileInput
        label="Imagem de Capa (Local)"
        placeholder="Escolha uma imagem"
        value={imageFile}
        onChange={setImageFile}
        accept="image/*"
        mb="md"
      />
      <TextInput
        label="URL da Imagem (Opcional)"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.currentTarget.value)}
        mb="md"
        placeholder="Insira uma URL de imagem"
      />
      <Button onClick={handleSubmit}>Criar Postagem</Button>
    </Container>
  );
};

export default CreatePost;
