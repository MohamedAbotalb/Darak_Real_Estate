import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Dashboard from 'layouts/Dashboard';
import ReviewList from 'components/ReviewList';
import ReportUserList from 'components/ReportUserList';
import ReportPropertyList from 'components/ReportPropertyList';
import PropertyDetails from 'components/PropertyDetails';
import NotFound from 'pages/NotFound';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Dashboard />}>
          <Route path="reviews" element={<ReviewList />} />
          <Route path="report-users" element={<ReportUserList />} />
          <Route path="report-properties" element={<ReportPropertyList />} />
          <Route path="properties/:slug" element={<PropertyDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
