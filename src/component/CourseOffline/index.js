
import React, {useState, useReducer, useEffect} from 'react'
import './style.scss'
import { Link } from "react-router-dom"
import axios from 'axios'
import Parser from 'html-react-parser'

import { useParams } from "react-router";

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

function CourseOffline() {

	const [state, dispatch] = useReducer(reducer, initialState);
	const [tagid, setTagid] = useState('');

	let { tag, cat } = useParams();


	useEffect(() => {

		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?tags=35&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
			setTagid(tag)
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [state]);
	

	return (
		<React.Fragment>
			
			{ 
							state.posts.map(post => (
								<div className="col col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mb-4 px-2 course-cart" key={post.id}>
									<div className="cours-categorie">
										<Link to={`/course-detail/${post.id}`}>
										<div className="iconBox">
											<div className="icon">
												<img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered}/>
											</div>
										</div>
						
										<div className="textBox">
											<div className="timeprice">
												<span><i className="fa fa-clock-o"></i> {post.acf.course_duration}</span>
												<span><i className="fa fa-inr"></i> {post.acf.course_price}</span>
											</div>

											<div className="title">
												<h3>{Parser(post.title.rendered)}</h3>
											</div>

											<div className="expect">
												{Parser(post.excerpt.rendered)}
											</div>
										</div>
										</Link>
										<div className="dtl-apply clearfix">
											<span className="float-left"><Link className="dtlBtn" to={`/course-detail/${post.id}`}>Details</Link></span>
											<span className="float-right"><a className="applyBtn" href="#">Apply</a></span>
										</div>
									</div>	
								</div>
							))
						}

						{state.error ? state.error : null }
			
		</React.Fragment>
	)
}

export default CourseOffline


