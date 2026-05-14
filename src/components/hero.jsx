import styles from './hero.module.css';
import { useState, useEffect, useRef } from 'react';

const images = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=900&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=900&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=900&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=900&fit=crop',
]

const phrases = [
  { line1: 'simples.', line2: 'essencial.' },
  { line1: 'leve.', line2: 'moderno.' },
  { line1: 'puro.', line2: 'atemporal.' },
  { line1: 'livre.', line2: 'autêntico.' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const sliderRef = useRef(null)
  const [slideWidth, setSlideWidth] = useState(0)

  useEffect(() => {
    const update = () => setSlideWidth(sliderRef.current?.offsetWidth || 0)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent(i => (i + 1) % images.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.tag}>nova coleção</p>
        <h1 className={`${styles.title} ${visible ? styles.textIn : styles.textOut}`}>
          {phrases[current].line1}<br />{phrases[current].line2}
        </h1>
        <a href="#" className={styles.cta}>explorar</a>
      </div>

      <div className={styles.slider} ref={sliderRef}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${current * slideWidth}px)` }}
        >
          {images.map((img, i) => (
            <img key={i} src={img} alt="loja" className={styles.slide} style={{ width: slideWidth }} />
          ))}
        </div>
      </div>
    </section>
  );
}
