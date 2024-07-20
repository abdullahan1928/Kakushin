import AuthGuard from './guards/AuthGuard';
import PublicGuard from './guards/PublicGuard';
import Dashboard from './pages/Dashboard/Dashboard';
import EditTask from './pages/EditTask/EditTask';
import Home from './pages/Home/Home';
import NewTask from './pages/NewTask/NewTask';

interface IRoute {
    index?: boolean;
    path?: string;
    element: JSX.Element;
}

interface IRoutes {
    path?: string;
    element?: JSX.Element;
    children?: IRoute[];
}

const routes: IRoutes[] = [
    {
        path: '/',
        element: <PublicGuard />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ]
    },
    {
        path: 'dashboard/*',
        element: <AuthGuard />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: 'new',
                element: <NewTask />,
            },
            {
                path: 'edit/:id',
                element: <EditTask />,
            }
        ]
    },
];

export default routes;
