import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

//создание контекста
const AuthContext = createContext({});
// доступ к контексту
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
// Компонент-провайдер
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Функция для выхода
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    // 1. Проверка на то залогинен или нет
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Подписываемся на изменения состояния авторизации (например, при логине в другой вкладке)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 3. Отписываемся при размонтировании компонента, чтобы не было утечек памяти
    return () => subscription.unsubscribe();
  }, []);

  // Значения, которые будут доступны во всём приложении
  const value = {
    user,
    loading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};