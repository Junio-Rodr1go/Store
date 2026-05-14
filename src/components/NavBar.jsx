import { useEffect } from 'react';
import { use, useState } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { CartFill } from 'react-bootstrap-icons'
import { useWishes } from '../context/productsContext'

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isMobile = innerWidth <= 855;
  const { wishes, setWishes } = useWishes()
  const [num, setNum] = useState();
  
  useEffect(() => {
    setNum(wishes.length)
  }, [wishes])

  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>vendável</span>
      {isMobile ? (
        <div className={styles.hamburguer} onClick={() => setToggleMenu(!toggleMenu)}>
          {toggleMenu ? 'X' : '☰'}
        </div>
      ) : (
        <ul className={styles.links}>
          <li><Link to="/">home</Link></li>
          <li><Link to="/produtos">produtos</Link></li>
          <li><Link to="/sobre">sobre</Link></li>
          <li className={styles.cart}>
            <Link to="/carrinho">
              <CartFill size={20}/> {num > 0 && <i className={styles.numero}>{num}</i>}
            </Link>
          </li>
        </ul>
      )}

      {toggleMenu && (
        <ul className={styles.linksMobile}>
          <li><Link to="/">home</Link></li>
          <li><Link to="/produtos">produtos</Link></li>
          <li><Link to="/sobre">sobre</Link></li>
          <li>
            <Link to="/carrinho">
              carrinho {num > 0 && <i className={styles.numero}>{num}</i>}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
