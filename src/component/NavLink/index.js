
import React, {useState, useEffect} from 'react';
import './style.scss';
import SiteLogo from '../SiteLogo';
import { Link } from "react-router-dom";

function NavLink(props) {

	const [wsize, setWsize] = useState({width:false})

	useEffect(() => {
		if(window.innerWidth < 992){
			setWsize({width:true})
		}
	}, [])

	

	return (
		<React.Fragment>		

			<nav className="siteMenu">

				{wsize.width ? <SiteLogo/> :null}

				{/* {console.log(props.closeNav)} */}

				<ul className="float-lg-right">
					<li><Link to="/" className="active" onClick={props.closeNav}>Home</Link></li>
					<li className="hasSub"><a href="#">About us</a>
						<ul className="subMenu">
							<li><Link to="/our-profile" onClick={props.closeNav}>Our Profile</Link></li>
							<li><Link to="/management" onClick={props.closeNav}>Management</Link></li>
							<li><Link to="/facility" onClick={props.closeNav}>Facility</Link></li>
							{/* <li><Link to="/academy-council" onClick={props.closeNav}>Academy Council</Link></li> */}
							{/* <li><Link to="/placement" onClick={props.closeNav}>Placement</Link></li> */}
							{/* <li><Link to="/inthe-media" onClick={props.closeNav}>In The Media</Link></li> */}
						</ul>
					</li>
					<li className="hasSub"><a href="#">Courses</a>
						<ul className="subMenu">
							<li><Link to="/offline-courses" onClick={props.closeNav}>Offline Courses</Link></li>
							<li><Link to="/online-courses" onClick={props.closeNav}>Online Courses</Link></li>
						</ul>
					</li>
					<li><Link to="/our-experts" onClick={props.closeNav}>Our Experts</Link></li>
					<li className="hasSub"><a target="_blank" href="https://studentportal.anutamaskillsacademy.com/" onClick={props.closeNav}>Student Portal</a>
						<ul className="subMenu">
							<li><a href="https://studentportal.anutamaskillsacademy.com/student-enquiry/" target="_blank" onClick={props.closeNav}>Student Enquary</a></li>
							<li><a href="https://studentportal.anutamaskillsacademy.com/admission/" target="_blank" onClick={props.closeNav}>Admission</a></li>
							{/* <li><a href="#" target="_blank" onClick={props.closeNav}>Exam</a></li> */}
							{/* <li><a href="#" target="_blank" onClick={props.closeNav}>Result</a></li> */}
							{/* <li><a href="#" target="_blank" onClick={props.closeNav}>Student Feedback</a></li> */}
						</ul>
					</li>
					{/* <li><Link to="/contactus" onClick={props.closeNav}>Contact us</Link></li> */}
					<li><a href="https://studentportal.anutamaskillsacademy.com/student-enquiry/" target="_blank">Contact us</a></li>
					{/* <li><Link to="/career" onClick={props.closeNav}>Career</Link></li> */}
					{/* <li><Link to="/blog" onClick={props.closeNav}>Blog</Link></li> */}
					{/* <li><Link to="/gallery" onClick={props.closeNav}>Gallery</Link></li> */}
				</ul>

			</nav>
			
		</React.Fragment>
	)
}

export default NavLink

