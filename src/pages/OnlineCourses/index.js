import React from 'react'
import './style.scss'
import CourseOnline from '../../component/CourseOnline'



function OnlineCourses() {
    return (
		<section className="courses-sec onlineCourse  py-4 py-md-5">
				
				<div className="container">
					<div className="row">
						<div className="col col-12 col-lg-12 col-xl-12">
							<div className="row m-0">
								{/* <CourseOnline/>  */}
								<div className="col col-12 col-lg-12 col-xl-12">
								<h3 style={{textAlign:"center",fontSize:"36px"}}>Coming Soon</h3>
								</div>
							</div>
						</div>
					</div>
				</div>

			</section>
    )
}

export default OnlineCourses


