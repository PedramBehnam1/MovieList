
import { Provider } from 'react-redux';
import './App.css';
import  Router  from './Router';
import store from './redux/store/configure-store'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Provider store={store}>
      <div className="App  bg-dark ">
        <Router />
      </div>
    </Provider>
  );
}

export default App;
