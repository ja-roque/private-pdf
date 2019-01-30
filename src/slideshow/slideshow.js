import React, {Component} from 'react';
import './../css/reveal.css';
import './../css/lab-fisica-pdfs.css';
import Reveal from 'reveal.js'
import axios from 'axios'
export default class Slideshow extends Component {
constructor(props) {
    super(props)
    this.state = { sections: [], status: true } ;
  }

componentWillMount() {
	
}

componentDidMount() {
    Reveal.initialize({
    	slideNumber: true
    })

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


	axios.get('https://dyvl2cyi55.execute-api.us-east-1.amazonaws.com/V1/get-bucket-contents').then(res => {
		const sections = res.data.body;
		this.setState({ sections: sections });
	})

	axios.get('https://dyvl2cyi55.execute-api.us-east-1.amazonaws.com/V1/check-pdf-status').then(res => {
		const status = res.data.body;
		console.log(res.data)
		this.setState({status: status });
	})
  }

initReveal(){
	
  }

render() {
	const sections = [];
	console.log(this.state)
	if (this.state.status == true){		
    	this.state.sections.map( page_path =>
    	sections.push(<section>
						<img className="pdfPage" data-src={"http://lab-fisica-pdfs.s3.amazonaws.com/"+page_path} alt={page_path} >
						</img>
					</section>)
     	)
	} else {
		sections.push(<section>
						<h1>Por el momento, la plataforma se encuentra deshabilitada.</h1>
					</section>)     	
	}

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