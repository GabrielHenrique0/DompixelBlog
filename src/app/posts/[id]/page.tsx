// src/app/posts/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { Container, Title, Text, Image, Loader, Button } from '@mantine/core';

interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
}

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Primeiro, verificar se a postagem está no localStorage
        const storedPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        const localPost = storedPosts.find((post: Post) => post.id.toString() === id);

        if (localPost) {
          setPost(localPost);
        } else {
          // Se não estiver no localStorage, buscar na API
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
          const apiPost = {
            id: response.data.id,
            title: response.data.title,
            body: response.data.body,
            image: response.data.imageUrl, // Imagem simulada
          };
          setPost(apiPost);
        }
      } catch (error) {
        console.error('Erro ao carregar a postagem:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!post) {
    return <Text>Postagem não encontrada.</Text>;
  }

  return (
    <Container className="post-page">
      <Button onClick={() => router.push('/')} style={{ position: 'absolute', top: '10px', left: '10px' }}>
        Voltar
      </Button>
      <Container className='containerPost'>
        <Title>{post.title}</Title>
        <Image src={post.image} alt={post.title} width={200} height={200} mt="md" />
        <Text mt="md">{post.body}</Text>
      </Container>
    </Container>
  );
};

export default PostDetail;
