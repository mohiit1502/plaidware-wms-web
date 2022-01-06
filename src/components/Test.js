import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../config/authProvider';

export default function Test() {
  const { t } = useTranslation();
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return (
      <>
        <p>You are not logged in.</p>{' '}
        <button
          onClick={() => {
            auth.signin('newuser name', () => navigate('/'));
          }}
        >
          Sign in
        </button>
      </>
    );
  }

  return (
    <p>
      <h3>{t('app_title')}</h3>
      <div>{t('welcome_message')}</div>
      Welcome {auth.user}!{' '}
      <button
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}
