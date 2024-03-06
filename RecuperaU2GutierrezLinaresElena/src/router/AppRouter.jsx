//navegar entre componentes por medio de URL

import React, { useContext } from 'react';
import SignInPage from '../module/auth/SingInpage';
import AuthContext from '../config/context/auth-context'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AdminLayout from '../module/AdminLayout';
import UserPage from '../module/users/UserPage';
import ClientPage from '../module/client/ClientPage';
const AppRouter = () => {
  const {user}= useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       
        {
          // Publico 
        }
        {   
          user.signed ? (<>
             
            if(user.signed == 'ADMIN_ROLE'){
              <Route path='/' element= {<AdminLayout/>}>             
               <Route path='admin' element={<AdminLayout/>}/>
              </Route>
            }
            if(user.signed=='USER_ROLE'){
              <Route path='/' element= {<UserPage/>}>             
               <Route path='user' element={<UserPage/>}/>
              </Route>

            }
            if(user.signed=='CLIENT_ROLE'){
              <Route path='/' element= {<ClientPage/>}>             
               <Route path='client' element={<ClientPage/>}/>
              </Route>

            }
          </>
           ):  <Route path='/' element={<SignInPage />} /> }
           <Route path='*' element={<>404 NOT FOUND </>} />
      </>
    )
  );
  return <RouterProvider router={router}/>;
   (
    <div>
<SignInPage />
    </div>
  )
}

export default AppRouter