
import React, {useState,useReducer, useEffect} from 'react'
import './style.scss'
import axios from 'axios' 
import Parser from 'html-react-parser'
import renderHTML from 'react-render-html';

import { useParams } from "react-router";

import RelatedCourses from "../../component/RelatedCourses";
import {StudentReviewes} from '../../component/Banners'
import FaqsList from '../../component/Faqs' 
import VideoPlayer from "../../component/VideoPlayer"


const initialState = {
	loading: true,
	post: {},
	error:''
}

const reducer = (state, action) => {

	switch(action.type){
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				post: action.payload,
				error: ''
			}
		case 'FETCH_ERROR':
			return{
				loading: false,
				post: {},
				error: 'Someting Went Worong'
			}
		default : 
			return state
	}

}


function CourseSingle(props) {	

	const [state, dispatch] = useReducer(reducer, initialState);
	const [tagids, setTagids] = useState('');
	

	let {id} = useParams();

	useEffect(() => {
		axios.get(`https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts/${id}?_embed&per_page=100`)
		.then(response => {	
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
			setTagids(id)
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [id])

	const {post} = state;
	
	return (
		<React.Fragment>
			{Object.keys(post).length ? (

			<div className="coursedtl-sec py-3 py-md-4">
				
				<div className="container">
					<div className="row">
						<div className="col col-12 col-lg-8 pr-lg-0 left-container">
							<div className="postimage" style={{backgroundImage: `url(${post._embedded['wp:featuredmedia']['0'].source_url})`}}>
								{/* <img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.slug}/> */}
								<div className="postimgbar">
									<span className="price"><i className="fa fa-inr"></i> {post.acf.course_price}</span>									
									<span className="float-right"><a className="applyBtn" target="_blank" href="https://studentportal.anutamaskillsacademy.com/admission/">Apply</a></span>
								</div>
							</div>

							<div className="row my-4 coursedtl-help-row">
								<div className="col col-12 col-md-6 mb-3 mb-md-0 pr-md-2">
									<div className="dtl-help">
										<h2>Course Details -</h2>
										<h4><span>Location </span> : <span>{post.acf.location}</span></h4>
										<h4><span>Duration </span> : <span>{post.acf.course_duration}</span></h4>
										<h4><span>Cost </span> : <span><i className="fa fa-inr"></i> {post.acf.course_price}</span></h4>
										<h4><span>Eligibility </span> : <span>{post.acf.eligibility}</span></h4>
										<h4><span>Categorie</span> : <span>{post.acf.categorie}</span></h4>
									</div>
								</div>
								<div className="col col-12 col-md-6 pl-md-2">
									<div className="dtl-help helpyou">
										<h4><span><i className="fa fa-headphones"></i></span> We are hare to help you if you have any problem</h4>
										<p>Please Call Us : <a href="tel:+917005939112">+91-7005 939 112</a></p>
									</div>
								</div>
							</div> {/*eo row coursedtl-help-row */}							

							<div className="row course-alldetails mx-0">
								<div className="col col-12 course-detailscol py-3">
									<h1>{renderHTML(post.title.rendered)}</h1>

									<div class="content-box">{renderHTML(post.content.rendered)}</div>

									{/* <div className="row">
										<div className="col col-12 col-lg-8">
											<div className="studentsay">
												<VideoPlayer videoURL={post.acf.video_url} width="100%" height="290px"/>
											</div>	
										</div>
									</div> */}

									{/* <p>Microsoft Teams is a collaboration tool designed to bring together people, communication and content in a single interface.</p>
									<p>This course is aimed at anyone who needs to create and work with the Microsoft Teams app. You may be a Microsoft Team owner required to create and manage a Teams area for colleagues, or someone who will use Teams to work with colleagues.</p>

									<h2>What you will learn</h2>
									<ul>
										<li>Navigate around the Microsoft Teams App</li>
										<li>Create a Microsoft Team</li>
										<li>Add and Manage Owners and Members</li>
										<li>Create Channels</li>
										<li>Set Team and Channel Options</li>
										<li>Use the Conversation Tools</li>
										<li>Arrange Teams Meetings</li>
									</ul>

									<h2>Course Modules</h2>
									<ul>
										<li>Module 1 : Navigate around the Microsoft Teams App</li>
										<li>Module 2 : Create a Microsoft Team</li>
										<li>Module 3 : Add and Manage Owners and Members</li>
										<li>Module 4 : Create Channels</li>
										<li>Module 5 : Set Team and Channel Options</li>
										<li>Module 6 : Use the Conversation Tools</li>
										<li>Module 7 : Arrange Teams Meetings</li>
									</ul> */}

								</div>
							</div> {/* course-alldetails */}
																		
						</div> {/* eo left-container */}


						<div className="col col-12 col-lg-4 pl-lg-4 right-container">
							<h2>Related Courses</h2>

							<div className="reletedCourseBox mt-1">
								<div className="row mx-0 related-courses-row justify-content-start align-items-start">
									<RelatedCourses tag={post.tags[0]}/>
								</div>	
							</div>	

							<div className="studentReviewesBox pt-4">
								<StudentReviewes reviewTag={post.tags[2]}/>
							</div>

							<div className="faqsBox">
								<h2>FAQ's</h2>
								<div className="faqsBoxinner">
									<FaqsList/>
								</div>
							</div>

							{/* <div className="studentsay my-4 my-md-5">
								<VideoPlayer videoURL={post.acf.video_url} width="100%" height="240px"/>
							</div>	 */}

						</div> {/* eo right-container */}

					</div>
					
				</div>
			
			</div>
				
			) : '' }
			
		</React.Fragment>
	)
}

export default CourseSingle



