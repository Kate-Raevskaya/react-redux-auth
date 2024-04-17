import {useSelector} from "react-redux";
import {IRootState} from "../pages/loginPage";
import {Outlet} from "react-router-dom";

export const PrivatRout = (): React.ReactElement => {
    const {user} = useSelector((state: IRootState) => state.users);

    return (
        <>
            {
                user ?
                    <Outlet />
                    :
                    <>You're not registered</>
            }
        </>
    )
}