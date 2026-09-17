import css from './Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <p className={css.eyebrow}>A quieter place for loud ideas</p>
        <h1 className={css.title}>
          Your thoughts,
          <br /> beautifully kept.
        </h1>
        <p className={css.description}>
          NoteHub brings your notes, plans, and small sparks of insight into one
          calm, considered workspace.
        </p>
        <div className={css.ctas}>
          <Link href="/notes/filter/all" className={css.primary}>
            Explore notes
          </Link>
          <Link href="/sign-up" className={css.secondary}>
            Create an account
          </Link>
        </div>
        <div className={css.note}>
          <span className={css.noteMark}>01</span>
          <p>Make space for what matters.</p>
        </div>
      </div>
    </main>
  );
}
