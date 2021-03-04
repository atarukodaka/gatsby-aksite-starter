import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from 'prop-types'

import PostCard from './PostCard'

const query = graphql`
    {
        allMdx {
            nodes {
                ...postFields
            }
        }
    }
`

const LinkPost = ({ to }) => { 
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(v => v.fields.slug === to)
    if (node === undefined) { return <div>NO SUCH SLUG: {to}</div> }
    return (<PostCard node={node} />)
}

LinkPost.propTypes = {
    to: PropTypes.string.isRequired
}

export default LinkPost