import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import DirectoryTree from '../components/DirectoryTree'
import Layout from '../components/Layout'

export default ({ pageContext}) => {
    const { breadcrumb: { crumbs } } = pageContext

    return (
        <Layout>
            <Breadcrumb crumbs={crumbs} crumbLabel='Directory Archives'/>
            <h3>Directory Archives</h3>
            <DirectoryTree/>
        </Layout>
    )
}

