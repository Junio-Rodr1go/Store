import styles from './forms.module.css'
import { useState } from 'react'
import { PlusLg } from 'react-bootstrap-icons'
import { useWishes } from '../context/productsContext'

function Forms({ setForm }) {
    const [cep, setCep] = useState('')
    const [address, setAddress] = useState(null)
    const [error, setError] = useState(false)
    const { wishes, setWishes } = useWishes()

    async function fetchCep(value) {
        const clean = value.replace(/\D/g, '')
        setCep(value)
        if (clean.length !== 8) return
        const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`)
        const data = await res.json()
        if (data.erro) { setError(true); setAddress(null) }
        else { setError(false); setAddress(data) }
    }

    function handleOrder(e) {
        e.preventDefault()

        if (wishes.length === 0 || !address ) return

        const itens = wishes.map(p => `• ${p.name} x${p.qtd} — R$${p.price * p.qtd}`).join('\n')
        const total = wishes.reduce((acc, p) => acc + p.price * p.qtd, 0)
        const endereco = address
            ? `\n\n📍 Endereço: ${address.logradouro}, ${address.bairro}, ${address.localidade} - ${address.uf} | CEP: ${cep}`
            : ''

        const msg = encodeURIComponent(`Olá! Gostaria de fazer um pedido:\n\n${itens}\n\nTotal: R$${total}${endereco}`)
        window.open(`https://wa.me/18998176206?text=${msg}`)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>
                <PlusLg onClick={() => setForm(false)} className={styles.close} size={30} />
                <p className={styles.tag}>finalizar pedido</p>
                <h2 className={styles.title}>entrega</h2>

                <form onSubmit={handleOrder} className={styles.field}>
                    <label htmlFor="cep">CEP</label>
                    <input
                        id="cep"
                        type="text"
                        maxLength={9}
                        placeholder="ex: 01310-100"
                        value={cep}
                        onChange={e => fetchCep(e.target.value)}
                    />
                    {error && <span className={styles.error}>CEP não encontrado.</span>}

                    {address && (
                        <>
                            <label htmlFor="rua">Rua</label>
                            <input id="rua" type="text" defaultValue={address.logradouro} />

                            <label htmlFor="bairro">Bairro</label>
                            <input id="bairro" type="text" defaultValue={address.bairro} />

                            <label htmlFor="cidade">Cidade / UF</label>
                            <input id="cidade" type="text" defaultValue={`${address.localidade} - ${address.uf}`} />
                        </>
                    )}

                    <button type="submit" className={styles.btn}>Encerrar pedido</button>
                </form>
            </div>
        </div>
    )
}

export default Forms;
