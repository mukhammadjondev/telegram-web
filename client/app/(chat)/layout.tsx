import { ChildProps } from '@/types';
import { FC } from 'react';

const Layout: FC<ChildProps> = async ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
