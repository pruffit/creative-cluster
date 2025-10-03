import { SignInForm } from '@features/auth/sign-in/ui/SignInForm';

export const SignInPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-amber-600 rounded-2xl mb-4">
            <span className="text-white font-bold text-2xl">CC</span>
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">Добро пожаловать!</h1>
          <p className="text-text-secondary">Войдите в свой аккаунт</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 shadow-soft">
          <SignInForm />
        </div>
      </div>
    </div>
  );
};
