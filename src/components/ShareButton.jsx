import React from 'react';

export default function ShareButton({ url, name }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Olha esse gatinho fofo: ${name}`,
          text: `Achei esse gatinho no Yume.gg! 😻`,
          url,
        });
      } catch (e) {
        // Usuário cancelou ou erro
      }
    } else {
      // Fallback: copia o link
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copiado!');
      } catch {
        alert('Não foi possível compartilhar.');
      }
    }
  };
  return (
    <button className="btn-secondary" style={{ marginLeft: 8 }} onClick={handleShare} title="Compartilhar favorito">
      Compartilhar 🔗
    </button>
  );
}
