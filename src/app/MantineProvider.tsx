import { MantineProvider } from '@mantine/core';

export function MantineWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            '#f0f', 
            '#e0e',  
            '#d0d',  
            '#c0c',  
            '#b0b',  
            '#a0a',  
            '#909',  
            '#808',  
            '#707',  
            '#606', 
          ],
        },
        primaryColor: 'brand',
      }}
    >
      {children}
    </MantineProvider>
  );
}