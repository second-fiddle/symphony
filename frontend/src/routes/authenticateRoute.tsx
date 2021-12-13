import { VFC } from 'react';
import { Route, Routes } from 'react-router';

const AuthenticatedRoute: VFC = () => (
  <Routes>
    <Route path="/" element={<div>dashboard</div>} />
  </Routes>
);

export default AuthenticatedRoute;
