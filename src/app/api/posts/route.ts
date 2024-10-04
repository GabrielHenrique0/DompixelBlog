// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';

let posts = [
  { id: 1, title: 'Primeiro Post', body: 'Conteúdo do primeiro post', userId: 1 },
  { id: 2, title: 'Segundo Post', body: 'Conteúdo do segundo post', userId: 1 },
];

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const newPost = await req.json();
  newPost.id = posts.length + 1;
  posts.push(newPost);
  return NextResponse.json(newPost);
}
