import React from 'react'
import Img from 'gatsby-image'
import { css } from '@emotion/react'

const cssWrapperSmall = css`
    width: 100px;
    height: 100px;
    float: left;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
    margin-right: 1em;
    margin-bottom: 0em;
    background-color: #f2f2f2;

    .gatsby-image-wrapper {
        width: 100%;
        height: 100%;
    }
`

const cssWrapperWide = css`
    .gatsby-image-wrapper {
        height: 150px;
}
`

const CoverImage = ({ node, size = "regular", ...props }) => {
    const cssWrapper = (size === "small") ? cssWrapperSmall : cssWrapperWide

    return (
        <div css={cssWrapper} {...props}>
            {node.frontmatter.cover &&
                (<Img fluid={node.frontmatter.cover.childImageSharp.fluid} />)}
        </div>
    )
}
export default CoverImage
