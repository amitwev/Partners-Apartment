import React, { Component } from 'react';
import { css } from '@emotion/core';
// Another way to import. This is recommended to reduce bundle size
import RingLoader from 'react-spinners/RingLoader';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  position: fixed;
  top: 40%;
  height: 100%;
  width: 100%;
  left: 50%;
`;
 
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={60}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}
export default Loading;