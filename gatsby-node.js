
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const { paginate } = require('gatsby-awesome-pagination')

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        const directory = slug.split("/").slice(1,-2).join("/")
        // add directory field
        //console.log("create node fields directory", directory)
        createNodeField({
                node,
                name: 'directory',
                value: directory
            })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data: { mdxPages, directories } } = await graphql(`
    {
        mdxPages: allMdx (sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                }
                fields {
                    directory
                }
                body
                slug
            }            
        }
        directories: allMdx(filter: {fields: {directory: {ne: ""}}}) {
            group(field: fields___directory) {
              directory: fieldValue
            }
        }

    }`)

    // markdown pages
    console.log("** all markdown pages")
    mdxPages.nodes.map(node => {
        //console.log(`create markdown page: ${node.slug}`)
        createPage({
            path: node.slug,
            component: path.resolve(`./src/templates/post-template.js`),
            context: {
                node: node,
            },
        })
    })
    // index paginate
    console.log("** index paginate")
    const itemsPerPage = 10
    paginate({
        createPage,
        items: mdxPages.nodes,
        itemsPerPage: itemsPerPage,
        //pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
        pathPrefix: '/',
        component: path.resolve("./src/templates/index-template.js")
    })

    // directory index   
    console.log("** creating directory index")
    directories.group.forEach ( ({ directory }) => {
        console.log(directory)
        console.log(directory)
        createPage({
            path: `/${directory}`,
            component: path.resolve(`./src/templates/directory_index-template.js`),
            context: {
                directory: directory
            }
        })
    })

    // monthly archives    
    console.log("** creating monthly archives")
    const dates = mdxPages.nodes.map(node=>new Date(node.frontmatter.date))
    const ym1s = dates.filter((date, i, self) => 
        self.findIndex(d => 
            (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth())
        ) === i)

    ym1s.forEach(ym1 => {
        const year = ym1.getFullYear()
        const month = ym1.getMonth()+1
        const fromDate = ym1
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1)

        console.log(`${year}/${month}`)
        createPage({
            path: `/archives/${year}${month.toString().padStart(2, 0)}`,
            component: path.resolve(`./src/templates/archive-template.js`),
            context: {
                archive: 'monthly',
                year: year,
                month: month,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            }
        })        
    })
}