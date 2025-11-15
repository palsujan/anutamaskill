import React, {useState, useEffect} from 'react';
import './style.scss';
import TopHeader from '../TopHeader';
import NavLink from '../NavLink';
import SiteLogo from '../SiteLogo';


function Header() {
	const [state, setState] = useState({humbtn:true, nav:false})

	useEffect(() => {

		if(window.innerWidth >= 992){
			setState({...state, humbtn:false, nav:true})
		}

	}, [])


	const navClickRend = () => {
		if(window.innerWidth <= 992){
			!state.nav ? setState({...state, nav:true}) : setState({...state, nav:false}) 
		}
	}

	let addClass = state.nav ? 'closeit' : ''

	
  return (
		<React.Fragment>

			{/* <TopHeader/> */}

    	<header className="site-header py-2">
				<div className="container">
					<div className="row align-items-center">
						<div className="col col-12 col-lg-3">
							
							<SiteLogo/>
						{
							state.humbtn ? 
							<div className={`${addClass} humBtn`} onClick={navClickRend}>
								<span></span>
								<span></span>
								<span></span>
							</div>
							: null
						}
						
						</div>
						
						<div className="col col-12 col-lg-9">
							{state.nav ? <NavLink closeNav={navClickRend}/> : null }
						</div>

					</div>
				</div>
			</header>

		</React.Fragment>
  )
}

export default Header

