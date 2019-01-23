import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

export default class ExhibitionPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-4">exhibition</h1>
              <hr/>
            </div>
            
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ padding: '2em 0' }}
                  key={post.id}
                >
                  <h5>
                    <Link className="has-text-primary" to={post.fields.slug}>
                      {post.frontmatter.title}  &bull; {post.frontmatter.englishtitle}
                    </Link>
                  </h5>
                  <p>
                    <Link className="has-text-primary"to={post.fields.slug}>
                      {post.frontmatter.author}
                    </Link>
                  </p>
                  <p>
                  
                    <small>
                      <Link className="has-text-primary" to={post.fields.slug}>
                        {post.frontmatter.startdate} - {post.frontmatter.enddate}
                      </Link>
                    </small>
                  </p>
                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

ExhibitionPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query ExhibitionQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "exhibition-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            englishtitle
            templateKey
            author
            startdate(formatString: "YYYY.MM.DD")
            enddate(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  }
`
