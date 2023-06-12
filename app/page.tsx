import Image from 'next/image';
import styles from './page.module.css';
import { Header } from './components/header/Header';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', margin: '0', padding: '0' }}>
      <Header />
      <div>Hello world</div>
    </div>
  );
}
