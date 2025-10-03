import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@shared/ui';
import { authApi } from '@shared/api/auth.api';
import { useUserStore } from '@entities/user/model/user.store';

const signInSchema = z.object({
  email: z.string().email('Неверный формат email'),
  password: z.string().min(1, 'Введите пароль'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      setError('');
      const response = await authApi.signIn(data);

      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);

      setUser(response.user);

      navigate('/');
    } catch {
      setError('Неверный email или пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
          Пароль
        </label>
        <div className="relative">
          <input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Вход...
          </>
        ) : (
          'Войти'
        )}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Нет аккаунта?{' '}
        <Link to="/auth/sign-up" className="text-primary hover:text-primary-dark font-medium">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
};
