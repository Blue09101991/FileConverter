import { FC } from 'react';
import { AppProps } from 'next/app';
import 'config/firebase';
import Layout from './layout';
import ProtectedRoute from 'constant/Protectedroute';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ProtectedRoute>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ProtectedRoute>
    );
};

export default MyApp;
