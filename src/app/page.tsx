// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Title, Button, Loader, Grid, Card, Text, Image, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  body: string;
  image: string;
  author: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const apiPosts = response.data.map((post: Post) => ({
          id: post.id,
          title: post.title,
          body: post.body,
          image: 'https://via.placeholder.com/150',
          author: 'desconhecido',
        }));

        localStorage.setItem('apiPosts', JSON.stringify(apiPosts));
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
        setPosts([...apiPosts, ...userPosts]);
      } catch (error) {
        console.error('Erro ao carregar as postagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    const storedUsername = sessionStorage.getItem('loggedUser');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleCreatePost = () => {
    const isLoggedIn = sessionStorage.getItem('loggedUser') != null;

    if (isLoggedIn) {
      router.push('/create');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedUser');
    setUsername(null);
    router.push('/'); // Redireciona para a página inicial após deslogar
  };

  const filteredPosts = posts.filter((post) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchTermLower) ||
      post.body.toLowerCase().includes(searchTermLower)
    );
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title order={1} mb="md">Postagens do Blog</Title>

        {username ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Text>{username}</Text>
            <Button onClick={handleLogout} ml="md">Sair</Button> {/* Altera de Deslogar para Sair */}
          </div>
        ) : (
          <Button onClick={() => router.push('/login')}>Login</Button>
        )}
      </div>

      <TextInput
        placeholder="Buscar postagens..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
        mb="md"
      />

      <Button onClick={handleCreatePost} mb="md">
        Criar Nova Postagem
      </Button>

      <Grid>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Grid.Col key={post.id} span={4}>
              <Card shadow="sm" padding="lg">
                <Image src={post.image} alt={post.title} height={140} />
                <Text weight={500} size="lg" mt="md">{post.title}</Text>
                <Text size="sm" color="dimmed" mt="xs">{post.body.slice(0, 100)}...</Text>
                <Text size="sm" color="dimmed" mt="xs">Autor: {post.author}</Text>
                <Button
                  variant="link"
                  onClick={() => router.push(`/posts/${post.id}`)}
                  mt="md"
                >
                  Ver Mais
                </Button>
              </Card>
            </Grid.Col>
          ))
        ) : (
          <Text>Nenhuma postagem encontrada</Text>
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
