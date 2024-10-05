// src/components/Navbar.tsx
'use client';

import { Navbar as MantineNavbar, Text, UnstyledButton, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  const links = [
    { label: 'Home', route: '/' },
    { label: 'Postagens', route: '/posts' },
    { label: 'Cadastro', route: '/register' },
    { label: 'Login', route: '/login' },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <MantineNavbar width={{ base: 300 }} p="xs">
      <MantineNavbar.Section>
        <Text weight={700} size="lg" mb="md">Meu Blog</Text>
        {links.map((link) => (
          <UnstyledButton
            key={link.label}
            onClick={() => handleNavigation(link.route)}
            style={{ display: 'block', width: '100%', padding: '10px 15px', borderRadius: '4px', color: '#000', '&:hover': { backgroundColor: '#f0f0f0' } }}
          >
            {link.label}
          </UnstyledButton>
        ))}
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
