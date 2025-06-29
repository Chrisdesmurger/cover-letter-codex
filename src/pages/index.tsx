import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('welcome')}</h1>
      <nav className="space-x-4">
        <Link href="/auth/login" className="underline">
          {t('login')}
        </Link>
        <Link href="/auth/register" className="underline">
          {t('register')}
        </Link>
        <Link href="/modern-webapp" className="underline">
          Modern Webapp
        </Link>
      </nav>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});
