import styles from './About.module.css';
import { useState, useRef, useEffect } from 'react';

const blocks = [
  { num: '01', title: 'nossa origem', text: 'Nascemos da vontade de criar moda com propósito — designs limpos, caimentos estruturados e detalhes que valorizam a identidade de quem veste.' },
  { num: '02', title: 'nosso processo', text: 'Cada coleção é criada com foco em qualidade, usando materiais cuidadosamente selecionados para garantir conforto e durabilidade.' },
  { num: '03', title: 'nosso valor', text: 'Acreditamos que menos é mais. Estética minimalista, atitude e elegância em cada peça — para o dia a dia e além.' },
  { num: '04', title: 'nossa identidade', text: 'Cada detalhe comunica quem somos — uma marca que valoriza a autenticidade, a simplicidade e a sofisticação discreta em tudo que produz.' },
  { num: '05', title: 'nosso compromisso', text: 'Entregamos mais do que roupas. Entregamos confiança, conforto e um estilo de vida que une performance e elegância no cotidiano.' },
]

export default function About() {
  const [current, setCurrent] = useState(0)
  const carouselRef = useRef(null)
  const [slideWidth, setSlideWidth] = useState(0)

  useEffect(() => {
    const update = () => setSlideWidth(carouselRef.current?.offsetWidth || 0)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const prev = () => setCurrent(i => (i - 1 + blocks.length) % blocks.length)
  const next = () => setCurrent(i => (i + 1) % blocks.length)

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.tag}>sobre nós</p>
        <h1 className={styles.title}>minimalismo.<br />performance.</h1>
      </section>

      <section className={styles.manifesto}>
        <p>Nossa empresa nasceu com a proposta de unir minimalismo, estilo e performance em cada peça. Trabalhamos com roupas modernas e versáteis, desenvolvidas para quem busca conforto, autenticidade e um visual sofisticado no dia a dia.</p>
        <p>Mais do que roupas, entregamos um estilo de vida voltado para atitude, elegância e desempenho — peças que combinam estética limpa com qualidade e conforto para diferentes ocasiões.</p>
      </section>

      <div className={styles.carousel} ref={carouselRef}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * slideWidth}px)` }}
        >
          {blocks.map(b => (
            <div key={b.num} className={styles.block}>
              <span className={styles.num}>{b.num}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.arrow} onClick={prev}>&#8592;</button>
        <div className={styles.dots}>
          {blocks.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrent(i)}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            />
          ))}
        </div>
        <button className={styles.arrow} onClick={next}>&#8594;</button>
      </div>
    </main>
  );
}
