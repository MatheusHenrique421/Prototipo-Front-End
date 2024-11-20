import { Button } from "@mantine/core";

interface WhatsAppLinkProps {
  telefone: string; // Tipo explícito para 'telefone'
  mensagem: string; // Tipo explícito para 'mensagem'
}
export default function WhatsAppLink({ telefone, mensagem } : WhatsAppLinkProps) {
  const mensagemCodificada = encodeURIComponent(mensagem); // Codifica a mensagem para URL
  const linkWhatsApp = `https://wa.me/${telefone}?text=${mensagemCodificada}`;

  return (
    <Button
      component="a"
      href={linkWhatsApp}
      target="_blank"
      color="green"
      radius="md"
    >
      Fale pelo WhatsApp
    </Button>
  );
}
