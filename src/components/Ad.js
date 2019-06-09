import React, { Component } from 'react';

class Ad extends Component {

	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	render() {
		return(
			<div className='ad'>
				<ins className='adsbygoogle'
				style={{ display: 'block' }}
				data-ad-client='ca-pub-1885725169510443'
				data-enable-page-level-ads='true' />
		  </div>
		);
	}
}

export default Ad;