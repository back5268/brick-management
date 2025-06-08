import { Fragment, useEffect, useState } from 'react';
import { routes } from '@view/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AccessDenied, ErrorPage } from '@view/default';
import { Layout } from '@view/layout';
import { useUserState } from '@store';

const App = () => {
  const { userInfo, isAuthenticated, tools } = useUserState();
  const [toolz, setToolz] = useState([]);

  useEffect(() => {
    if (Array.isArray(tools)) {
      const newTool = [];
      tools.forEach((tool) => {
        if (tool.route) newTool.push(tool.route);
        if (Array.isArray(tool.items)) {
          tool.items.forEach((t) => {
            if (t.route) {
              if (Array.isArray(t.actions)) {
                t.actions.forEach((a) => {
                  if (t.route === '/') {
                    newTool.push(t.route);
                  } else {
                    if (a === 'read') {
                      newTool.push(t.route);
                      newTool.push(t.route + '/detail/:_id');
                    } else if (a === 'create') {
                      if (t.route === '/shift') {
                        newTool.push(t.route + '/create');
                        newTool.push(t.route + '/create/:_idz');
                      } else newTool.push(t.route + '/create');
                    }
                  }
                });
              } else newTool.push(t.route);
            }
          });
        }
      });
      setToolz(newTool);
    }
  }, [tools]);

  return (
    <Routes>
      {routes.map((route, index) => {
        const DefaultLayout = route.layout ? Layout : Fragment;
        const isPublicRoute = route.public;
        const checkPermission = isPublicRoute || ['admin'].includes(userInfo?.role) ? true : toolz.includes(route.path);

        if (isPublicRoute && isAuthenticated) {
          return <Route key={index} path={route.path} element={<Navigate to="/" />} />;
        }

        if (!isPublicRoute && !isAuthenticated) {
          return <Route key={index} path={route.path} element={<Navigate to="/auth/sign-in" />} />;
        }

        return (
          <Route
            key={index}
            path={route.path}
            element={
              checkPermission ? (
                <DefaultLayout>
                  <route.element />
                </DefaultLayout>
              ) : (
                <AccessDenied />
              )
            }
          />
        );
      })}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
