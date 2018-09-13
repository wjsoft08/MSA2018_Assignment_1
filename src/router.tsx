import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Header } from './components/Header';
import CryptoPrice from './CryptoPrice';

import './css/styles.css';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (

        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={CryptoPrice} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}