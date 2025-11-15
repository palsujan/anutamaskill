
import React, {useState, useReducer, useEffect} from 'react'
import './style.scss'
import { Link } from "react-router-dom"
import axios from 'axios' 
import Parser from 'html-react-parser'
import CourseCatSideBar from '../../component/CourseCatSideBar'

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


function CourseCatSingle() {

	const [state, dispatch] = useReducer(reducer, initialState);
	const [tagid, setTagid] = useState('');

	let { tag, cat } = useParams();

	useEffect(() => {

		axios.get(`https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?tags=${tag}&per_page=100&_embed`)
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
			setTagid(tag)
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})
	
	}, [state]);

	useEffect(() => {		
		window.scrollTo(0, 0);
	}, []);


	return (
		<React.Fragment>

			<section className="courses-sec py-3 py-md-4">

				<div className="container">
					<div className="row">
						<div className="col col-12 col-lg-4 col-xl-3 pr-lg-0">
							
							<div className="row mb-3 mx-lg-0">
								<div className="col col-12 px-lg-2">
									<h2>Course categories</h2>
								</div>
							</div>
							
							<ul className="categoriesSidebar">
								<CourseCatSideBar cat={cat}/>
							</ul>

						</div>
					
						<div className="col col-12 col-lg-8 col-xl-9">
							<div className="row mb-3 mx-lg-0">
								<div className="col col-12 px-lg-2">
									<h2>{cat.replace(/-/g, " ").replace(/\b[a-z]/g, function() {return arguments[0].toUpperCase()})}</h2>
								</div>
							</div>

							<div className="row m-0">
						{ 
							state.posts.map(post => (
								<div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4 px-2 course-cart" key={post.id}>
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
											<span className="float-right"><a className="applyBtn" href="https://studentportal.anutamaskillsacademy.com/admission/" target="_blank">Apply</a></span>
										</div>
									</div>	
								</div>
							))
						}

						{state.error ? state.error : null }
					</div>
						</div>
					</div>
				</div>

			</section>
		
		</React.Fragment>
	)
}

export default CourseCatSingle


