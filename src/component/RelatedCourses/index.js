
import React, {useState, useReducer, useEffect} from 'react'
import './style.scss'
import { Link } from "react-router-dom"
import axios from 'axios' 
import Parser from 'html-react-parser'


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
				error: 'Someting Went Wrong In CourseCatSingle'
			}
		default: 
			return state 
	}
}


function RelatedCourses(props) {

	const [state, dispatch] = useReducer(reducer, initialState);
	
	const {tag} = props;

	useEffect(() => {

		axios.get(`https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?tags=${tag}&per_page=100&_embed`)
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, []);
	

	return (
		<React.Fragment>
			
						{ 
							state.posts.map(post => (
								
								<div className="col col-12 pr-2 pl-0 pb-3 releted-courses-wrap" key={post.id}>
									<div className="releted-courses">
										<Link to={`/course-detail/${post.id}`}>
											<div className="row mx-0">
												<div className="col col-3 px-0">	
													<div className="iconBox">
														<img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered}/>
													</div>
												</div>

												<div className="col col-9 pr-0">
														<div className="title">
															<h3>{Parser(post.title.rendered)}</h3>
														</div>

														<div className="expect">
															{Parser(post.excerpt.rendered)}
														</div>
												</div>
											</div>
										</Link>
									</div>	
								</div>

							))
						}

						{state.error ? state.error : null }
		
		</React.Fragment>
	)
}


export default RelatedCourses

