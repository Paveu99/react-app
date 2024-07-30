import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './views/Header'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './views/HomePage'
import { LoginForm } from './views/LoginForm'
import { LogoutForm } from './views/LogoutForm'
import { NotFoundView } from './views/NotFoundView'
import { CalculationHistory } from './views/CalculationHistory'
import { LoanCalculator } from './views/LoanCalculator'
import { ProtectedRoute } from './helpers/ProtectedRoute'
import { ProtectedLoginRoute } from './helpers/ProtectedLoginRoute'

const queryClient = new QueryClient();

function App() {

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/user/login' element={<ProtectedLoginRoute element={<LoginForm />} />} />
          <Route path='/user/logout' element={<ProtectedRoute element={<LogoutForm />} />} />
          <Route path='/history' element={<ProtectedRoute element={<CalculationHistory />} />} />
          <Route path='/calculator' element={<ProtectedRoute element={<LoanCalculator />} />} />
          <Route path='*' element={<NotFoundView />} />
        </Routes>
      </QueryClientProvider>
    </div>
  )
}

export default App