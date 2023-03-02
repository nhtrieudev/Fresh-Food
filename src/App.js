import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Layout from "./layouts";
import { store } from "./redux/stores/store";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store} >
      <Layout />
      <ToastContainer
        autoClose={1000}
        theme='colored' />
    </Provider>
  );
}

export default App;
