import React, {Component} from 'react';
import './../css/reveal.css';
import './../css/lab-fisica-pdfs.css';
import Reveal from 'reveal.js'
import axios from 'axios'
export default class Slideshow extends Component {
constructor(props) {
    super(props)
    this.state = { sections: [] } ;
  }

componentWillMount() {

}

componentDidMount() {
    Reveal.initialize({})

    function resetSlideScrolling(slide) {
    slide.classList.add('scrollable-slide');
	}

	function handleSlideScrolling(slide) {
	    if (slide.scrollHeight >= 800) {
	        slide.classList.add('scrollable-slide');
	    }
	}

	Reveal.addEventListener('ready', function (event) {
	    handleSlideScrolling(event.currentSlide);
	});

	Reveal.addEventListener('slidechanged', function (event) {
	    if (event.previousSlide) {
	        resetSlideScrolling(event.previousSlide);
	    }
	    handleSlideScrolling(event.currentSlide);
	});

	axios.get('https://jsonplaceholder.typicode.com/posts').then(res => {
		const sections = res.data;
		this.setState({ sections });

	})
  }

initReveal(){
	
  }

render() {
	const sections = [];
    this.state.sections.map( section =>
    	sections.push(<section>
						<img className="pdfPage" src={require('./../pages/instructor_WB_2011_ESP-076.jpg')} alt="Up arrow" >
						</img>
					</section>)
     	)

    return (	        	
		<div className="slideshowContainer" >
			<div className="reveal">			
				<div className="slides pdfSlide">
				<section>
						<h1>Bienvenido</h1>
				</section>
				{sections}				
				</div>
			</div>
		</div>

	)
  }
}