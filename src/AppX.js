//import logo from './logo.svg';
import './App.css';
import "./styles/bootstrap.min.css"
import "./styles/thru.css"
import "./styles/thru-ad-hock.css"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavMenu from './components/nav-menu/NavMenu'
import Products from './screens/Products'
import ProductEdit from './screens/Product-Edit'
import Home from './screens/Home'
import {ProductsProvider} from './contexts/products-context'

function AppX() {
  return (
    <ProductsProvider>
      <Router>
        <div>
          <NavMenu />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <div className="container">
            <Switch>
              <Route path="/products/:id" component={ProductEdit}></Route>
              <Route path="/products" component={Products}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ProductsProvider>
  );
}

export default AppX

