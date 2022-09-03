import { type FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from '../Contexts/Auth/RequireAuth';
import QuizzesProvider from '../Contexts/Quizzes/quizzesContext';
import ROUTES from './routes';

type TProps = {};

const Router: FC<TProps> = () => (
  <Suspense>
    <Routes>
      {ROUTES.map(({ path, Element, children }) => {
        if (Element) {
          return <Route key={path} path={path} element={<Element />} />;
        }

        return (
          <Route key={path} path={path}>
            {children?.map((subRoute) => {
              if (subRoute.auth) {
                return (
                  <Route
                    key={path}
                    path={subRoute.path}
                    element={<RequireAuth Element={subRoute.Element} />}
                  />
                );
              }

              return (
                <Route
                  key={path}
                  path={subRoute.path}
                  element={<subRoute.Element />}
                />
              );
            })}
          </Route>
        );
      })}
    </Routes>
  </Suspense>
);

export default Router;
