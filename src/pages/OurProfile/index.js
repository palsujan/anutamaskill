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


function OurProfile() {

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=39&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])

    return (
			
			<section className="ourprofile-sec management-sec facility-sec">
				<div className="container py-4 py-md-5">

					{
						state.posts.map(post => (
							<React.Fragment>
						
							<div className="row ourprofileRow m-0 py-3 mb-4">	
								<div className="col col-12 col-xl-12">
									<h2>{Parser(post.title.rendered)}</h2>
									{Parser(post.content.rendered)}
								</div>
								{/* <div className="col col-12 col-xl-6 mt-4 mt-xl-5">
									<div className="aboutVideo">
										<VideoPlayer videoURL={post.acf.any_url} width="100%" height="400px"/>
									</div>
								</div> */}
							</div>

							<div className="row justify-content-center align-items-center">
								<div className="col col-12 col-md-12 col-lg-10 col-xl-10 mb-4">
									<div className="profileBox">
										<div className="row align-items-center">
											<div className="col col-12 col-sm-6 pr-sm-0">
												<div className="face">
													<img src={post.acf.image_url_a} alt={post.acf.title_a}/>
												</div>
											</div>
											<div className="col col-12 col-sm-6">
												<div className="found pt-3 pt-sm-0">
													<h3>{Parser(post.acf.title_a)}</h3>
													<p>{Parser(post.acf.content_a)}</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col col-12 col-md-12 col-lg-10 col-xl-10 mb-4">
									<div className="profileBox">
										<div className="row align-items-center">
											<div className="col col-12 col-sm-6">
												<div className="found pt-3 pt-sm-0">
													<h3>{Parser(post.acf.title_b)}</h3>
													<p>{Parser(post.acf.content_b)}</p>
												</div>
											</div>
											<div className="col col-12 col-sm-6 pr-sm-0">
												<div className="face">
													<img src={post.acf.image_url_b} alt={post.acf.title_b}/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							</React.Fragment>
							))
					}		

					{state.error ? state.error : null }			
				</div>

			</section>
			
    )
}

export default OurProfile







