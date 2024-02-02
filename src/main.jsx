import './index.css';

import Contact, {
	action as contactAction,
	loader as contactLoader,
} from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';
import Root, {
	action as rootAction,
	loader as rootLoader,
} from './routes/root';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorPage from './error-page';
import Index from './routes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { action as destroyAction } from './routes/destroy';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		loader: rootLoader,
		action: rootAction,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Index />,
					},
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:contactId/edit',
						element: <EditContact />,
						loader: contactLoader,
						action: editAction,
					},
					{
						path: 'contacts/:contactId/destroy',
						action: destroyAction,
						errorElement: <div>Oops! There was an error.</div>,
					},
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
