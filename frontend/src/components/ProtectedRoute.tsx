import { useContext } from "react"
import { Store } from "../Stores"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRouter() {
  const {
    state: { userInfo },
  } = useContext(Store)
  if (userInfo) {
    return <Outlet />
  } else {
    return <Navigate to="/signin/" />
  }
}
