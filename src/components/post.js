import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"
import TableOfContents from './table_of_contents'
//import { Paper } from '@material-ui/core'
//import Img from 'gatsby-image'
import { Paper, Grid, Box, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'

const shortcuts = {}


const PostHeader = ({ node }) => (
    <header className={styles.header}>
        <div className={styles.date}>{node.frontmatter.date}</div>
        <h2 className={styles.title}>
            <Link to={'/' + node.slug}>
                {node.frontmatter.title}
            </Link>
        </h2>
        <div className={styles.directory}>
            <Link to={'/' + node.fields.directory}>
                {node.fields.directory}
            </Link>
        </div>

    </header>
)

const Post = ({ node }) => (
    <div className={styles.post}>
        <PostHeader node={node} />
        <main>
            {node.frontmatter.toc === true && (
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary>
                            <h4>Table Of Contents</h4>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TableOfContents toc={node.tableOfContents} />
                        </AccordionDetails>
                    </Accordion>
                )

            }
            <MDXProvider components={shortcuts}>
                <MDXRenderer>
                    {node.body}
                </MDXRenderer>
            </MDXProvider>
        </main>
    </div>

)

export const PostExcerpt = ({ node }) => (
    <div className={styles.post}>
        <PostHeader node={node} />
        <main>
            <div>{node.excerpt}</div>
            <div className={styles.continueReading}>
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
        </main>
    </div>
)

export default Post
