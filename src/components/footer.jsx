import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span>vendável</span>
            <span>© {new Date().getFullYear()}</span>
        </footer>
    );
}
