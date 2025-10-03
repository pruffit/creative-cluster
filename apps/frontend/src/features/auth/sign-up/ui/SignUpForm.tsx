import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@shared/ui';
import { authApi } from '@shared/api/auth.api';
import { useUserStore } from '@entities/user/model/user.store';

const signUpSchema = z.object({
  email: z.string().email('Неверный формат email'),
  username: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Только буквы, цифры, дефис и подчеркивание'),
  password: z
    .string()
    .min(8, 'Минимум 8 символов')
    .regex(/[A-Z]/, 'Нужна хотя бы одна заглавная буква')
    .regex(/[a-z]/, 'Нужна хотя бы одна строчная буква')
    .regex(/[0-9]/, 'Нужна хотя бы одна цифра'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setError('');
      const response = await authApi.signUp(data);

      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);

      setUser(response.user);

      navigate('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response?: { data?: { message?: string } } };
        setError(axiosError.response?.data?.message || 'Ошибка регистрации');
      } else {
        setError('Ошибка регистрации');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-text mb-2">
            Имя
          </label>
          <input
            {...register('firstName')}
            id="firstName"
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-text mb-2">
            Фамилия
          </label>
          <input
            {...register('lastName')}
            id="lastName"
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
          Email *
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
        <label htmlFor="username" className="block text-sm font-medium text-text mb-2">
          Имя пользователя *
        </label>
        <input
          {...register('username')}
          id="username"
          type="text"
          autoComplete="username"
          className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
          Пароль *
        </label>
        <div className="relative">
          <input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
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
            Регистрация...
          </>
        ) : (
          'Зарегистрироваться'
        )}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Уже есть аккаунт?{' '}
        <Link to="/auth/sign-in" className="text-primary hover:text-primary-dark font-medium">
          Войти
        </Link>
      </p>
    </form>
  );
};
