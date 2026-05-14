import { useState } from 'react'
import { PlusLg } from 'react-bootstrap-icons'
import styles from './details.module.css'
import { useWishes } from '../context/productsContext'

function Detail({ product, setShowDetail }) {

    const [qtd, setQtd] = useState(1)
    const { wishes, setWishes } = useWishes()

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <img src={product?.img} alt={product?.name} className={styles.img} />
                <div className={styles.content}>
                    <PlusLg onClick={() => setShowDetail(null)} className={styles.close} size={24} />
                    <p className={styles.tag}>detalhes do produto</p>
                    <h2 className={styles.title}>{product?.name ?? 'Produto'}</h2>
                    <p className={styles.description}>{product?.description ?? 'sem descrição'}</p>
                    <span className={styles.price}>R${product?.price * qtd}</span>

                    <div className={styles.counter}>
                        <div onClick={() => setQtd(q => Math.max(1, q - 1))}>−</div>
                        <span className={styles.qtd}>{qtd}</span>
                        <div onClick={() => setQtd(q => q + 1)}>+</div>
                    </div>

                    <button onClick={() => {
                        setWishes([...wishes, {...product, qtd: qtd}])
                        setShowDetail(false)
                }} className={styles.btn}>Adicionar ao carrinho</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;
