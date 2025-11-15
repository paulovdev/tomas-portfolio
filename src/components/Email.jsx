import { Html, Button, Text } from "@react-email/components";

export const Email = ({ url, name, message }) => {
  return (
    <Html lang="en">
      <Text>Olá, {name}!</Text>
      <Text>{message}</Text>
      <Button href={url}>Clique aqui</Button>
    </Html>
  );
};
