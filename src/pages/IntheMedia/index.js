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


function IntheMedia() {
	
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=45&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])

    return (
			
			<section className="management-sec facility-sec intheMedia">
				<div className="container py-4 py-md-5">
					<div className="row">
						<div className="col col-12">
							<h2>In The Media</h2>
						</div>
					</div>

					<div className="row">	
						{
							state.posts.map(post => (
									
								<div className="col col-12 col-md-12 col-lg-6 col-xl-6 mb-4">
									<div className="profileBox">
										<div className="row">
											<div className="col col-3 col-sm-3 pr-0">
												<div className="face">
													<span className="date">{post.acf.the_day}</span>
													<span className="month">{post.acf.the_month}</span>
													<span className="year">{post.acf.the_year}</span>
												</div>
											</div>
											<div className="col col-9 col-sm-9">
												<div className="found pt-sm-0">
													<h3>{Parser(post.title.rendered)}</h3>
													<div className="newsContent">
														{Parser(post.content.rendered)}
													</div>
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

export default IntheMedia