
const cuteNames = [
  // Japonês
  'Mochi', 'Neko', 'Neko-chan', 'Neko-tan', 'Neko-puff', 'Neko-mochi', 'Neko-dango', 'Neko-yume', 'Neko-hana', 'Neko-sora', 'Neko-tsuki', 'Neko-hoshi', 'Neko-kumo', 'Neko-ame', 'Neko-yuki', 'Neko-fubuki',
  'Mochi-chan', 'Mochi-tan', 'Mochi-puff', 'Mochi-dango', 'Mochi-yume', 'Mochi-hana', 'Mochi-sora', 'Mochi-tsuki', 'Mochi-hoshi', 'Mochi-kumo', 'Mochi-ame', 'Mochi-yuki', 'Mochi-fubuki',
  'Yuki', 'Kira', 'Sakura', 'Luna', 'Chibi', 'Momo', 'Nina', 'Koko', 'Pudding', 'Suki', 'Nana', 'Tama', 'Marshmallow', 'Fubuki', 'Yukine', 'Kumori', 'Hikari', 'Akari', 'Ame', 'Kumo', 'Taiyo', 'Tsuki', 'Hoshi', 'Kage', 'Yoru', 'Asa', 'Hana', 'Sora', 'Yume', 'Tora', 'Mikan', 'Mochiko', 'Kinako', 'Azuki', 'Daifuku', 'Kuri', 'Yuzu', 'Kabocha',
  // Português/Brasil
  'Fofuxo', 'Pipoca', 'Cookie', 'Bubu', 'Pinky', 'Bolinho', 'Biscoito', 'Cupcake', 'Brownie', 'Donut', 'Marsh', 'Marshy', 'Snow', 'Snowy', 'Snowball', 'Floco', 'Fluffy', 'Pelúcia', 'Peludinho', 'Peludona', 'Peludinha',
  'Frajola', 'Tom', 'Manchinha', 'Branquinho', 'Pretinho', 'Amarelinho', 'Cinza', 'Laranja', 'Preto', 'Branco', 'Azul', 'Lilás', 'Estrela', 'Lua', 'Sol', 'Cometa', 'Galáxia', 'Cosmo', 'Astro', 'Meteor', 'Vênus', 'Júpiter', 'Saturno', 'Plutão', 'Urano', 'Netuno', 'Mercúrio', 'Marte', 'Terra', 'Céu', 'Nuvem', 'Tempestade',
  'Tigrão', 'Leão', 'Pantera', 'Lince', 'Jaguar', 'Gatuno', 'Gatinha', 'Gatão', 'Gatito', 'Gatita', 'Gatuxa', 'Gatucho', 'Gatucha', 'Miau', 'Miauzinho', 'Miauzinha', 'Ronron', 'Ronronzinho', 'Ronronzinha', 'Bigode', 'Bigodinho', 'Bigoduda', 'Bigodão', 'Patinha', 'Patudo', 'Patuda', 'Patinhas',
  // Inglês
  'Snowball', 'Shadow', 'Smokey', 'Misty', 'Pumpkin', 'Tiger', 'Midnight', 'Boots', 'Peanut', 'Angel', 'Lucky', 'Ginger', 'Coco', 'Muffin', 'Socks', 'Toby', 'Oliver', 'Simba', 'Salem', 'Felix', 'Garfield', 'Milo', 'Leo', 'Lily', 'Bella', 'Kitty', 'Max', 'Oscar', 'Charlie', 'Jasper', 'Chloe', 'Daisy', 'Ziggy', 'Zuzu', 'Zaza', 'Zizi',
  // Francês
  'Minou', 'Chouchou', 'Bijou', 'Noisette', 'Fifi', 'Lulu', 'Mimi', 'Câline', 'Grisou', 'Perle', 'Fleur', 'Papillon', 'Soleil', 'Lune', 'Étoile', 'Chérie', 'Gigi', 'Poupée', 'Bibi', 'Boubou',
  // Espanhol
  'Pelusa', 'Luna', 'Sol', 'Nube', 'Canela', 'Chispa', 'Copito', 'Galleta', 'Bombón', 'Chispa', 'Manchitas', 'Rayas', 'Tigre', 'Gordito', 'Linda', 'Bonita', 'Chiquita', 'Peque', 'Mimi', 'Nina',
  // Italiano
  'Micio', 'Micia', 'Baffo', 'Pallina', 'Stella', 'Lampo', 'Nuvola', 'Zampa', 'Cipria', 'Fiocco', 'Pippo', 'Gatto', 'Gatta', 'Tigre', 'Luna', 'Sole', 'Pepe', 'Cocco', 'Biscotto', 'Miele',
  // Alemão
  'Mieze', 'Mausi', 'Schnurr', 'Flauschi', 'Flocke', 'Tiger', 'Stern', 'Mond', 'Sonne', 'Schmusi', 'Bärli', 'Mimi', 'Lilly', 'Morle', 'Socke', 'Feli', 'Minka', 'Momo', 'Maus',
  // Russo
  'Мурка', 'Барсик', 'Пушок', 'Снежок', 'Рыжик', 'Василиса', 'Котик', 'Киса', 'Мурчик', 'Соня', 'Зефир', 'Пушистик', 'Лапка', 'Тигра', 'Люся', 'Мотя', 'Боня', 'Глаша', 'Дуся',
  // Outras línguas/temas
  'Bao', 'Baozi', 'Bao-bao', 'Bao-chan', 'Bao-tan', 'Baozi-chan', 'Baozi-tan', 'Baozinho', 'Baozito', 'Baozita', 'Baozucha', 'Baozucho', 'Baozuxa', 'Baozuxa-chan', 'Baozuxa-tan',
  'Pixel', 'Bit', 'Byte', 'Chip', 'Nina-chan', 'Mimi-tan', 'Kiki', 'Lili', 'Lulu', 'Titi', 'Fifi', 'Bibi', 'Bubu', 'Baba', 'Baba-chan', 'Bubu-chan', 'Bibi-chan', 'Fifi-chan', 'Titi-chan', 'Lili-chan', 'Lulu-chan'
];

export default cuteNames;
