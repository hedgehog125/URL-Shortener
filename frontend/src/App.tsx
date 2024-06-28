import { Provider } from "react-redux";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import store from "./store.js";

import Index from "./pages/Index/Index";
import Root from "./pages/Root";
import UrlId from "./pages/UrlId/UrlId";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route path="" element={<Index />}></Route>
			<Route path=":urlId" element={<UrlId />} />
		</Route>,
	),
	{ basename: import.meta.env.BASE_URL },
);

function App() {
	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);
}

export default App;
