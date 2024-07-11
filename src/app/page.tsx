"use client";
import withAuth from "./hoc/withAuth"
import NavBar from "./components/NavBar"
const Home = function() {
  return (
	<>
	<NavBar/>
	<div className="text-blue-500 w-100 h-100">
		<section className='flex flex-row h-screen items-center justify-center pl-4 pr-4'>
			<div className='text-blue-800 text-3xl mx-4'>
				Welcome to Book Keeper!
			</div>
		</section>
	</div>
	
	</>
  )
}

export default withAuth(Home)
