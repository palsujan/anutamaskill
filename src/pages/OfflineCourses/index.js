
import React from 'react'
import './style.scss'
import CourseOffline from '../../component/CourseOffline'


function OfflineCourses() {
    return (
			<section className="courses-sec offlineCourse py-4 py-md-5">
				
				<div className="container">
					<div className="row">
						<div className="col col-12 col-lg-12 col-xl-12">
							<div className="row m-0">
								<CourseOffline/>
								{/* <h3 style={{textAlign:"center",fontSize:"36px"}}>Coming Soon</h3> */}
							</div>
						</div>
					</div>
				</div>

			</section>
    )
}

export default OfflineCourses;

