
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


function CourseCatSideBar(props) {

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=5&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])

	return (
		<React.Fragment>

			{ 
				state.posts.map(post => (
				
					<li className="sidebarCat" key={post.id}>
						
						<Link to={`/${post.slug}/${post.tags[0]}`} className={props.cat === post.slug? 'active':''}>
							<span className="icon">
								<img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered}/>
							</span>
							{Parser(post.title.rendered)}
						</Link>
				
					</li>

				))
			}

			{state.error ? state.error : null }
			
		</React.Fragment>
	)
}

export default CourseCatSideBar

