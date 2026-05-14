import styles from './wishes.module.css';
import { CartFill } from 'react-bootstrap-icons'
import { useWishes } from '../context/productsContext'
import { useEffect, useState } from 'react'
import Forms from '../components/forms'

export default function Wishes() {

    const [form, setForm] = useState(false)
    const { wishes, setWishes } = useWishes()

    return (
        <>
                  
            {wishes.length === 0 ? (
                <main className={styles.page}>
                    <p className={styles.tag}>carrinho</p>
                    <h1 className={styles.title}>seus itens</h1>

                    <div className={styles.empty}>
                        <span><CartFill color='#000' size={50} /></span>
                        <p>seu carrinho está vazio.</p>
                        <a href="/produtos" className={styles.cta}>ver produtos</a>
                    </div>
                </main>
            ) : (
                <main className={styles.page}>
                    <p className={styles.tag}>carrinho</p>
                    <h1 className={styles.title}>seus itens</h1>
                    {
                        wishes.map(product => (
                            <div key={product.id} className={styles.product}>
                                <img src={product.img} alt={product.name} />
                                <div className={styles.info}>
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <p>Quantidade: {product.qtd}</p>
                                    <span>R${product.price * product.qtd}</span>
                                </div>
                            </div>
                        ))
                    }
                </main>
            )}
    
            { form && (<Forms setForm={setForm} />)}

            <div className={styles.finalize}>
                <button className={styles.finalizeBtn} onClick={() => setForm(!form)}>Fazer pedido</button>
            </div>

        </>
    );
}
