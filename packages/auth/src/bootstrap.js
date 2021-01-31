import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

const mount = (element, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(<App onSignIn={onSignIn} history={history} />, element);

    return {
        onParentNavigate({ pathname: nextPathname }) {
            console.log("PATHNAME: " + nextPathname);
            if (history.location.pathname !== nextPathname) {
                history.push(nextPathname);
            }

        }
    };
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');
    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };