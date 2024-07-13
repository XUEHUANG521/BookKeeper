"use client";
import withAuth from "./hoc/withAuth"
import NavBar from "./components/NavBar"
import DashBoard from "./components/Dashboard"

const Home = function() {
  return (
	<>
	<NavBar/>
	<DashBoard/>
	</>
  )
}

export default withAuth(Home)
