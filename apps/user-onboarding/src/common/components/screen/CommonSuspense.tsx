import GlobalLoading from '@components/GlobalLoading/GlobalLoading';
import React, { Suspense } from 'react';

function CommonSuspense({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Suspense fallback={<GlobalLoading isLoading />}>{children}</Suspense>;
}

export function withCommonSuspense(Component: React.ComponentType<any>): React.FC<any> {
  return function WrappedComponent(props: any) {
    return (
      <CommonSuspense>
        <Component {...props} />
      </CommonSuspense>
    );
  };
}

export default CommonSuspense;
