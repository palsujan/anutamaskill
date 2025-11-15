import React from 'react'
import './style.scss'
import SocialLink from '../SocialLink'

function TopHeader() {
	return (
		<div className="top-header py-1 py-md-2">
			<div className="container"> 
				<div className="row justify-content-between align-items-center">

					<div className="col col-12 col-md-8"> 
						<div className="mobEml">
							<span><a href="#"><i className="fa fa-phone"></i> +91 7349489182</a></span>
							<span><a href="#"><i className="fa fa-envelope"></i> suport@anutamaacademy.com</a></span>
						</div>
					</div>
					
					<div className="col col-12 col-md-4"> 
						<SocialLink/>
					</div>

				</div>
			</div>
		</div>
	)
}

export default TopHeader;

