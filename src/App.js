import './App.css';
import Sidebar from './components/Sidebar';
import  AuthProvider  from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import {Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import AddContent from'./components/AddContent';
import EditContent from './components/EditContent';
import ViewContent from './components/ViewContent';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <div className='app-container'>
          <Sidebar/>
          <main className='main-content'>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/add' element={
                <PrivateRoute>
                  <AddContent />
                </PrivateRoute>
                } />
                <Route path='/edit/:id' element={
                <PrivateRoute>
                  <EditContent />
                </PrivateRoute>
                } />
                 <Route path='/view' element={<ViewContent />} />
                  <Route path='/' element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
