import PropTypes from 'prop-types'
import { useContext } from "react"
import { ContextProvider } from "../Context/Context"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
	const { isAuth } = useContext(ContextProvider)
	return isAuth ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PrivateRoute