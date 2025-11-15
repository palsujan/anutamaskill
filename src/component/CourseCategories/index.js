
import React, {useReducer, useEffect} from 'react'
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
				error: 'Someting Went Wrong'
			}
		default: 
			return state
	}
}


function CourseCategories() {

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=5&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data});
			window.scrollTo(0, 0);
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])

	return (
		<React.Fragment>

			{ 
				state.posts.map(post => (

					<div className="col col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4 px-2" key={post.id}>
						<div className="cours-categorie">
							<Link to={`/${post.slug}/${post.tags[0]}`}>
							<div className="iconBox">
								<div className="icon">
									<img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered}/>
								</div>
							</div>
			
							<div className="textBox">
								<h3>{Parser(post.title.rendered)}</h3>
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

export default CourseCategories


