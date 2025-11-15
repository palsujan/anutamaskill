import React from 'react'
import './style.scss'

function SocialLink() {
	return (
		<React.Fragment>
			<ul className="socialLink float-md-right">
				<li><a href="#"><i className="fa fa-facebook"></i></a></li>
				<li><a href="#"><i className="fa fa-envelope-o"></i></a></li>
				<li><a href="#"><i className="fa fa-instagram"></i></a></li>
				<li><a href="#"><i className="fa fa-twitter"></i></a></li>
				<li><a href="#"><i className="fa fa-whatsapp"></i></a></li>
			</ul>
		</React.Fragment>
	)
}

export default SocialLink;

