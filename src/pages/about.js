import React from "react"
import Layout from "../components/layout.js"
import { graphql } from 'gatsby'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Card, LinkCard} from '../components/LinkCard'
import { Link } from 'gatsby'

export const query = graphql`
  query {
    site {
      ...siteInformation
    }
  }
`

const AboutPage = ({ data, pageContext }) => {
  const { breadcrumb: { crumbs } } = pageContext

  const twitterUrl = `http://www.twitter.com/${data.site.siteMetadata.social.twitter}`
  const gitHubUrl = `http://github.com/${data.site.siteMetadata.social.github}`

  return (
    <Layout title="about">
      <Breadcrumb crumbs={crumbs} crumbLabel='About' />
      <h2 className="pageTitle">About</h2>
      <p>title: {data.site.siteMetadata.title} </p>
      <p>author: {data.site.siteMetadata.author} </p>
      <p>description: {data.site.siteMetadata.description} </p>
      <div>
        <a href={twitterUrl}><TwitterIcon aria-label="button" /></a>
        <a href={gitHubUrl}><GitHubIcon aria-label="button" /></a>
      </div>
      <LinkCard to="/">top</LinkCard>
    </Layout>
  )
}


export default AboutPage
