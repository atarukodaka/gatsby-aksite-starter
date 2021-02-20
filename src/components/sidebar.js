import React from "react"
import { useStaticQuery, Link, graphql, navigate } from "gatsby"
import MonthlyArchives from './monthly_archives'
import DirectoryArchives from './directory_archives'

import { Paper, Box } from '@material-ui/core'
/*
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight' */
import { List, ListItem } from '@material-ui/core'
import styles from './sidebar.module.css'
/* import Typography from '@material-ui/core' */

const Sidebar = () => {
    const { site,  recentPosts } = useStaticQuery(
        graphql`
            {
                site {
                    siteMetadata {
                        title
                        author
                    }                    
                }

                recentPosts: allMdx(
                    limit: 5,
                    sort: {fields: frontmatter___date, order: DESC}
                    ) {
                    nodes {
                        frontmatter { title, date(formatString: "YYYY-MM-DD") }
                        slug
                        fields { directory }
                        id
                        excerpt(pruneLength: 100)
                    }
                }
            }

        `
    )
    return (
        <div className="sidebar">
   
            <h3 className={styles.title}>Profile</h3>
            <List>
                <ListItem key="author">{site.siteMetadata.author}</ListItem>
                <ListItem key="description">{site.siteMetadata.descriptino}</ListItem>
            </List>

            <h3 className={styles.title}>Recent Posts</h3>
                {recentPosts.nodes.map(node => (
                    <div key={node.id} className={styles.recentPost}>
                        <div className={styles.recentPostDate}>{node.frontmatter.date}</div>
                        <h4 variant="h4" className={styles.recentPostTitle}>
                            <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                        </h4>
                        <div className={styles.recentPostDirectory}>{node.fields.directory}</div>
                        <div className={styles.recentPostExcerpt}>
                            {node.excerpt}
                        </div>

                    </div>
                ))
                }
            <h3 className={styles.title}>Directories</h3>
            <DirectoryArchives/>

            <h3 className={styles.title}>Monthly Archives</h3>
            <MonthlyArchives/>
          
        </div>
    )
}

export default Sidebar