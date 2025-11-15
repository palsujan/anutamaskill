import React, {useState,useReducer, useEffect} from 'react'
import './style.scss'
import axios from 'axios' 
import Parser from 'html-react-parser'
import renderHTML from 'react-render-html';

import VideoPlayer from "../../component/VideoPlayer"

const initialState = {
	loading: true,
	error: '',
	post: {}
}


const reducer = (state, action) => {
	switch (action.type) {
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
				error: 'Someting Went Wrong'
			}
		default: 
			return state
	}
}


function Gallery() {
	
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts/322?_embed&per_page=100')

		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])

	const {post} = state;

    return (
			<React.Fragment>
				{Object.keys(post).length ? (

					<section className="management-sec gallery-sec">
						<div className="container-fluid py-4 py-md-5">
							<div className="row">
								<div className="col col-12">
									{/* <h2>Gallery</h2> */}
								</div>
							</div>

							<div className="row">				
								<div className="col col-12 mb-4 galleryCol">
									{renderHTML(post.content.rendered)}
								</div>
							</div>
						</div>

					</section>

					) : '' }

			</React.Fragment>
    )
}

export default Gallery