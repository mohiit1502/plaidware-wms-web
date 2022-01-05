import { useTranslation } from 'react-i18next';

export default function Test() {
  const { t } = useTranslation();
  return (
    <>
      <h3>{t('app_title')}</h3>
      <div>{t('welcome_message')}</div>
    </>
  );
}
