import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Toxxic WhatsApp Bots Database</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Toxxic WhatsApp Bots Database</h1>
        <p className={styles.description}>Who are You</p>
        <div className={styles.buttonContainer}>
          <Link href="/prexzy" passHref>
            <button className={styles.glassButton}>Prexzy Villa</button>
          </Link>
          <Link href="/api/bots/2" passHref>
            <button className={styles.glassButton}>Bot 2</button>
          </Link>
          <Link href="/api/bots/3" passHref>
            <button className={styles.glassButton}>Bot 3</button>
          </Link>
          <Link href="/api/bots/4" passHref>
            <button className={styles.glassButton}>Bot 4</button>
          </Link>
          <Link href="/api/bots/5" passHref>
            <button className={styles.glassButton}>Bot 5</button>
          </Link>
        </div>
      </main>
    </div>
  );
}