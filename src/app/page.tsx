"use client";
import withAuth from "./hoc/withAuth"
import DashBoard from "./components/Dashboard"

const Home = function() {
  return (
	<>
	<DashBoard/>
	</>
  )
}

export default withAuth(Home)
