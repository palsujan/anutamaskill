import React from 'react'
import './style.scss'
import {HomeSlideBanner} from '../../component/Banners'
import CourseCategories from '../../component/CourseCategories'
import Whyanutama from '../../component/Whyanutama'
// import StudentFeedback from '../../component/StudentFeedback'


function Home() {

    return (
    	<React.Fragment>

				<section className="homeBanner">
					<HomeSlideBanner/>
				</section>

				<section className="course-cattegories-sec py-4 py-md-5">
					<div className="container">
						<div className="row mb-5">
							<div className="col col-12">
								<h2 className="sec-heading"> <span>Course</span> Categories</h2>
							</div>
						</div>
						<div className="row">

							<CourseCategories/>
							
						</div>
					</div>
				</section>


				<section className="whyanutamaskills-academy-sec pb-4 pb-md-5">

					<div className="container">
						<div className="row mb-5">
							<div className="col col-12">
								<h2 className="sec-heading"> <span>Why Anutama</span> Skills Academy</h2>					
							</div>								
						</div>

						<div className="row justify-content-center">
							<Whyanutama/>
						</div>
					</div>

				</section>
				{/* 
				<section className="whyanutamaskills-academy-sec studen pb-4 pb-md-5">

					<div className="container px-0">
							
						<StudentFeedback/>

					</div>
				
				</section> */}

			</React.Fragment>
    )
}

export default Home;


