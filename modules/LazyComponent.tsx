import React from 'react';

const getLazyComponent = (LazyComponent: any) => {
    const WrappedComponent: React.FC = () => {
        return <React.Suspense fallback={<div>Loading</div>}>
            <LazyComponent />
        </React.Suspense>
    }
    return WrappedComponent;
}

export { getLazyComponent };