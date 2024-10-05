'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Loader, Text, TextInput, Image, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import PostCard from './components/postCards';

// Altere o tipo do id para string
interface Post {
  id: string;
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
          id: post.id.toString(), // Certifique-se de que o id é uma string
          title: post.title,
          body: post.body,
          image: 'https://via.placeholder.com/150',
          author: 'API',
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
      router.push('/postar');
    } else {
      router.push('/login');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedUser');
    setUsername(null);
    router.push('/');
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
    <>
      <div className="header">
        <div className="header-content">
          <Button onClick={() => router.push('/')} style={{ border: 'none', background: 'none', padding: 0 }}>
            <Image src="/imgs/logo.png" alt="Logo do Blog" fit="contain" height={60} />
          </Button>
          {username ? (
            <div className="user-info">
              <strong>Usuário: {username}</strong>
              <Button className="botoes" id="botaoSair" onClick={handleLogout} ml="md">Sair</Button>
            </div>
          ) : (
            <div>
              <Button className="botoes" onClick={() => router.push('/login')}>Login</Button>
              <Button className="botoes" onClick={() => router.push('/cadastrar')}>Cadastrar</Button>
            </div>
          )}
        </div>
      </div>

      <Container className="container">
        <div className="search-container">
          <Title order={1} mb="md">Postagens do blog</Title>
          <TextInput
            className="search-input"
            placeholder="Buscar postagens..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
            mb="md"
          />
        </div>

        <Button className="botaoCriarPostagem" onClick={handleCreatePost} mb="md">
          Criar nova postagem
        </Button>

        <div className="cards-container">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <Text>Nenhuma postagem encontrada</Text>
          )}
        </div>
      </Container>
    </>
  );
};

export default HomePage;