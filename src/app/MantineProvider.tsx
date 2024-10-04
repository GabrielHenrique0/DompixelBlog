import { MantineProvider } from '@mantine/core';

export function MantineWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          brand: [
            '#f0f',  // Tonalidade 0
            '#e0e',  // Tonalidade 1
            '#d0d',  // Tonalidade 2
            '#c0c',  // Tonalidade 3
            '#b0b',  // Tonalidade 4
            '#a0a',  // Tonalidade 5
            '#909',  // Tonalidade 6
            '#808',  // Tonalidade 7
            '#707',  // Tonalidade 8
            '#606',  // Tonalidade 9
          ],
        },
        primaryColor: 'brand', // Define a cor personalizada 'brand' como cor primária
      }}
    >
      {children}
    </MantineProvider>
  );
}
