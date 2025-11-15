import React, {useState, useEffect} from 'react';
import './style.scss';
import { Link } from "react-router-dom";
import SocialLink from '../SocialLink'
import SiteLogo from '../SiteLogo';


function Footer() {

  return (
	<React.Fragment>
	
	<footer className="mt-0">
		<div className="footer1-sec">
			<div className="container">
				<div className="row aligns-item-center">
					<div className="col col-12 col-md-6 col-lg-2 mt-4">
					<h2 className="widget-title">About Us</h2>
					<ul className="p-0 m-0">
							<li><Link to="/our-profile">Our Profile</Link></li>
							<li><Link to="/management">Management</Link></li>
							<li><Link to="/facility">Facility</Link></li>
							{/* <li><Link to="/academy-council">Academy Council</Link></li> */}
							{/* <li><Link to="/placement">Placement</Link></li> */}
							{/* <li><Link to="/inthe-media">In The Media</Link></li> */}
						</ul>
					</div>
					<div className="col col-12 col-md-6 col-lg-3 mt-4">
						<h2 className="widget-title">Student Portal</h2>
						<ul className="p-0 m-0">
							<li><a href="https://studentportal.anutamaskillsacademy.com/student-enquiry/" target="_blank">Student Enquary</a></li>
							<li><a href="https://studentportal.anutamaskillsacademy.com/admission/" target="_blank">Admission</a></li>
							{/* <li><a href="#" target="_blank">Exam</a></li> */}
							{/* <li><a href="#" target="_blank">Result</a></li> */}
							{/* <li><a href="#" target="_blank">Student Feedback</a></li> */}
						</ul>
					</div>
					<div className="col col-12 col-md-6 col-lg-3 mt-4">
						<h2 className="widget-title">Others Links</h2>
						<ul className="p-0 m-0">
							<li><Link to="/offline-courses">Offline Courses</Link></li>
							<li><Link to="/online-courses">Online Courses</Link></li>
							<li><Link to="/our-experts">Our Experts</Link></li>
							<li><Link to="/contactus">Contact us</Link></li>
							{/* <li><Link to="/career">Career</Link></li> */}
							{/* <li><Link to="/blog">Blog</Link></li> */}
							{/* <li><Link to="/gallery">Gallery</Link></li> */}
						</ul> 
					</div>
					<div className="col col-12 col-md-6 col-lg-4 mt-4 text-center text-md-left">
						<h2 className="widget-title">Find Us</h2>
						<p>Ramkrishna Ashram, Vivekananda Chowmuhani, Kumarghat, Unakoti Tripura, Pin - 799264, India</p>
						<div className="site-logo mb-2">
							<SiteLogo/>
						</div>
						<ul className="m-0 p-0">
							<li><i className="fa fa-envelope-o mr-2"></i><a href="mailto:info@anutamaskillsacademy.com">info@anutamaskillsacademy.com</a></li>
							<li><i className="fa fa-phone mr-2"></i><a href="tel:+91 7005 939 112"></a></li>
							<li><i className="fa fa-phone mr-2"></i><a href="tel: +91 9612 288 745"> +91 9612 288 745</a></li>
						</ul>
						<div className="media">
							<SocialLink/> 
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="footer2-sec">
			<div className="container">
				<div className="row aligns-item-center">
					<div className="col col-12 col-md-6">
						<p className="text-center text-md-left">© Copyright 2021, All Rights Reserved</p>
					</div>
					<div className="col col-12 col-md-6">
						<p className="text-center text-md-right">Developed By <a href="https://ftide.tech/" target="_blank">Ftide Technologies</a></p>
					</div>
				</div>
			</div>
		</div>
	</footer>

		</React.Fragment>
  )
}

export default Footer


