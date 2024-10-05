import { Card, Image, Text, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

const PostCard = ({ post }) => {
  const router = useRouter();
  return (
    <Card className="card" shadow="sm" padding="lg" radius="md" withBorder>
      <Image src={post.image} alt={post.title} width={200} height={200} />
      <h4>{post.title}</h4>
      <Text className='corpoPostagem'>{post.body}</Text>
      <Text>Autor: {post.author}</Text>
      <Button
        variant="link"
        onClick={() => router.push(`/posts/${post.id}`)}
        mt="md"
      >
        Ver Mais
      </Button>
    </Card>
  );
};

export default PostCard;