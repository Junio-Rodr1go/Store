import styles from './Products.module.css';
import Details from '../components/details';
import { useWishes } from '../context/productsContext';
import { useState } from 'react';

const products = [
  { id: 1, name: 'Camiseta Linen', price: 89, description: 'Camiseta de linho leve, corte relaxado e acabamento natural.', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { id: 2, name: 'Calça Slate', price: 159, description: 'Calça de alfaiataria em tom acinzentado, caimento reto.', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
  { id: 3, name: 'Jaqueta Moor', price: 299, description: 'Jaqueta inspirada em tons de pântano, tecido resistente ao vento.', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
  { id: 4, name: 'Vestido Ivory', price: 199, description: 'Vestido fluido em tom marfim, ideal para ocasiões especiais.', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80' },
  { id: 5, name: 'Blusa Dune', price: 79, description: 'Blusa de malha suave em tom areia, manga longa.', img: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=400&q=80' },
  { id: 6, name: 'Shorts Pebble', price: 99, description: 'Shorts casual em tom pedra, cintura elástica confortável.', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=900&fit=crop' },
  { id: 7, name: 'Casaco Fog', price: 349, description: 'Casaco oversized em tom névoa, forro interno macio.', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&q=80' },
  { id: 8, name: 'Saia Chalk', price: 129, description: 'Saia midi plissada em tom giz, leveza e movimento.', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=900&fit=crop' },
  { id: 9, name: 'Moletom Ash', price: 189, description: 'Moletom de algodão pesado em cinza carvão, bolso canguru.', img: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&h=900&fit=crop' },
  { id: 10, name: 'Regata Stone', price: 59, description: 'Regata básica em tom pedra, corte slim e tecido respirável.', img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80' },
  { id: 11, name: 'Calça Flint', price: 179, description: 'Calça cargo em tom sílex, bolsos laterais funcionais.', img: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&q=80' },
  { id: 12, name: 'Blazer Birch', price: 389, description: 'Blazer estruturado em tom bétula, botões discretos.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80' },
  { id: 13, name: 'Camiseta Drift', price: 69, description: 'Camiseta de algodão lavado, efeito desbotado natural.', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80' },
  { id: 14, name: 'Vestido Haze', price: 229, description: 'Vestido longo em tom névoa azulada, decote sutil.', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80' },
  { id: 15, name: 'Jaqueta Thorn', price: 319, description: 'Jaqueta com textura espinhada, corte estruturado e moderno.', img: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&q=80' },
  { id: 16, name: 'Blusa Parch', price: 89, description: 'Blusa de seda sintética em tom pergaminho, caimento elegante.', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80' },
];

export default function Products() {
  const { wishes, setWishes } = useWishes()
  const [showDetail, setShowDetail] = useState(false)
  const [product, setProduct] = useState({})
  const [search, setSearch] = useState('')

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className={styles.page}>

      {showDetail && (<Details product={product} setShowDetail={setShowDetail} />)}

      <p className={styles.tag}>catálogo</p>
      <h1 className={styles.title}>todos os produtos</h1>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="buscar produto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {filtered.length === 0 && (
        <p className={styles.noResults}>nenhum produto encontrado.</p>
      )}

      <div className={styles.grid}>
        {filtered.map(p => (
          <div key={p.id} className={styles.card}>
            <div onClick={() => { setProduct(p); setShowDetail(true) }} className={styles.imgWrapper}>
              <img src={p.img} alt={p.name} className={styles.img} />
              <div className={styles.overlay}>
                <button onClick={() => { setProduct(p); setShowDetail(true) }} className={styles.btn}>
                  ver detalhes
                </button>
              </div>
            </div>
            <div className={styles.info}>
              <span>{p.name}</span>
              <span className={styles.price}>R${p.price}</span>
            </div>
          </div>
        ))}
      </div>

    </main>
  );
}
