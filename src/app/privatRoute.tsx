import {useSelector} from "react-redux";
import {IRootState} from "../pages/loginPage";
import {Navigate, Outlet} from "react-router-dom";

export const PrivatRoute = (): React.ReactElement => {
    const {user} = useSelector((state: IRootState) => state.users);

    return (
        <>
            {
                user ?
                    <Outlet />
                    :
                    <Navigate to={'/'} />
            }
        </>
    )
}