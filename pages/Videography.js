import React, { Component } from 'react';
import Link from 'next/link';
import Breadcrumb from '../src/UI/Components/Common/Breadcrumb';

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Breadcrumb title="Videography" />
            </React.Fragment>
        );
    }
}

export default Index;
