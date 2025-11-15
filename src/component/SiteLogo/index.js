import React from 'react'
import './style.scss'
import siteLogo from '../../assets/anutamalogo.png'
import {Link} from "react-router-dom";

function SiteLogo() {
	return (

			<div className="sitelogo">
				<Link to="/">
					<img src={siteLogo}/>
				</Link>
			</div>
		
	)
}

export default SiteLogo

