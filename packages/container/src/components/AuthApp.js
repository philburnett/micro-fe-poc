import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(
            ref.current,
            {
                initialPath: history.location.pathname,
                onNavigate: ({ pathname: nextPathname }) => {
                    if (history.location.pathname !== nextPathname) {
                        history.push(nextPathname);
                    }
                }
            }
        );
        history.listen(onParentNavigate);
    });


    return (
        <div ref={ref}></div>
    );
}
