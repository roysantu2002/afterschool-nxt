import React, { Component } from 'react';
import Breadcrumb from '../src/UI/Components/Common/Breadcrumb';
import WhoList from '../src/views/WhoList'

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumb title="Who" />
                <WhoList/>
            </React.Fragment>
        );
    }
}

export default Index;
