import React, {useState,useReducer, useEffect} from 'react'
import './style.scss'
import axios from 'axios' 
import Parser from 'html-react-parser'
import renderHTML from 'react-render-html';

import VideoPlayer from "../../component/VideoPlayer"


const initialState = {
	loading: true,
	error: '',
	posts: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				posts: action.payload,
				error: ''
			}
		case 'FETCH_ERROR':
			return{
				loading: false,
				posts: [],
				error: 'Someting Went Wrong'
			}
		default: 
			return state
	}
}


function Management() {
	
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=41&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])



    return (
			
			<section className="management-sec">
				<div className="container py-4 py-md-5">
					<div className="row">
						<div className="col col-12">
							<h2>Our Management Team</h2>
						</div>
					</div>

					<div className="row">	
						{
							state.posts.map(post => (
									
								<div className="col col-12 col-md-6 col-lg-6 col-xl-4 mb-4">
									<div className="profileBox">
										<div className="row">
											<div className="col col-5">
												<div className="face" style={{backgroundImage: `url(${post._embedded['wp:featuredmedia']['0'].source_url})`}}>
													{/* <img src="" alt=""/> */}
												</div>
												<div className="social pt-3">
													<ul>
														<li><a href={post.acf.whats_app_url}><i className="fa fa-whatsapp"></i> </a></li>
														<li><a href={post.acf.facebook_url}><i className="fa fa-facebook"></i> </a></li>
														<li><a href={post.acf.twitter_url}><i className="fa fa-twitter"></i> </a></li>
													</ul>
												</div>
											</div>
											<div className="col col-7 pl-0">
												<div className="found">
													<h3>{Parser(post.title.rendered)}</h3>
													<h5>{post.acf.job_title}</h5>
													{Parser(post.content.rendered)}
												</div>
											</div>
										</div>
									</div>
								</div>

								))
						 	}

						 {state.error ? state.error : null }

					</div>
				</div>

			</section>
			
    )
}

export default Management







