import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

//import Activity from "../../screens/activity/Activity";
import Modal from '../modal/Modal';
import NavMenu from "../nav-menu/NavMenu";
//import ThruAdminRoutes from "../../screens/thru-admin/thru-admin-routes/ThruAdminRoutes"
//import OrgRoutes from "../../screens/organizations/org-routes/OrgRoutes"
//import FlowRoutes from "../../screens/flows/flow-routes/FlowRoutes"
//import Overview from "../../screens/overview/Overview";
import Home from "../../screens/Home"
import { SecondaryNavProvider } from "../../contexts/SecondaryNavContext";
import useLoginTimeout from "../../utils/useLoginTimeout"
import AdminRoutes from "../../screens/admin/admin-routes/AdminRoutes";
import AccountRoutes from "../../screens/account/account-routes/AccountRoutes"
import { DataCacheProvider } from "../../contexts/DataCacheContext";
import {ProductsProvider} from '../../contexts/products-context'
import AlertsRoute from "../../screens/alerts/alert-routes/AlertRoutes"
import InactiveModal from "../inactive-modal/InactiveModal"
import { useModal } from "../../contexts/ModalContext"
import { useIdleTimer } from "react-idle-timer"
import ProductRoutes from '../../screens/products/product-routes/ProductRoutes'

const AuthenticatedApp = () => {
    const AppendMenu = (child, secondaryMenu = true) => {
        return <div>
            <SecondaryNavProvider>
                <NavMenu secondaryMenu={secondaryMenu}></NavMenu>
                {child}
            </SecondaryNavProvider>

        </div>
    }
    const { createModal } = useModal()

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * 30,
        onIdle: () => {
            createModal(<InactiveModal />)
        },
        debounce: 500
    })

    useLoginTimeout()

    return <div>
        <DataCacheProvider>
            <ProductsProvider>
                <Router>
                    <Modal />
                    <Switch>
                        <Route path="/products" render={routerProps => AppendMenu(<ProductRoutes />, false)} />
                        <Route path="/" render={routerProps => AppendMenu(<Home />, false)} />
                    </Switch>
                </Router>
            </ProductsProvider>
        </DataCacheProvider>
    </div>
}

export default AuthenticatedApp;