import { Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import React, {useContext} from 'react';
import * as yup from 'yup';
import { customAlert } from '../../config/alert/alert';
import AxiosClient from '../../config/http-gateway/http-client';
import AuthContext from '../../config/context/auth-context';


const SignInPage = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      try {
        const response = await AxiosClient({
          url: "auth/signin",
          method: "POST",
          data: values
        });
        if (!response.error) {
          dispatch({ type: 'SIGNIN', payload: response.data });
          // validar por el rol del usuario
          // admin -> /admin
          // Client -> /client
          navigate('/admin', { replace: true });
        } else throw Error('Error')
      } catch (error) {
        console.error(error);
        customAlert("Iniciar sesión", "Usuario y contraseña incorrecto", "error");
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST" noValidate onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Correo</label>
              <input id="email-address" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Correo electrónico" />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-600">{formik.errors.username}</div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input id="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Contraseña" />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600">{formik.errors.password}</div>
              )}
            </div>
          </div>

          <div>
            <button type="submit" disabled={formik.isSubmitting || !formik.isValid} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {formik.isSubmitting ? <Spinner /> : 'Iniciar sesión'}
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4 8V7a6 6 0 1112 0v1h2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V8h2z" clipRule="evenodd" />
                </svg>
              </span>
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;