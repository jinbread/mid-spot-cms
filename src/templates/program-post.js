import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const ProgramPostTemplate = ({
  content,
  contentComponent,
  tags,
  category,
  title,
  englishtitle,
  author,
  englishauthor,
  date,
  location,
  englishlocation,
  sponsor,
  englishsponsor,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <small>{category}</small>
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title} | {englishtitle}
            </h1>
            <p>{date}</p>
            <p>{author} | {englishauthor}</p>
            {location && <p>{location} | {englishlocation}</p>}
            {sponsor && <p>{sponsor} | {englishsponsor}</p>}
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ProgramPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  category: PropTypes.string,
  title: PropTypes.string,
  englishtitle: PropTypes.string,
  author: PropTypes.string,
  englishauthor: PropTypes.string,
  location: PropTypes.string,
  englishlocation: PropTypes.string,
  sponsor: PropTypes.string,
  englishsponsor: PropTypes.string,
  helmet: PropTypes.object,
}

const ProgramPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ProgramPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet
            titleTemplate="%s | Program"
          >
            <title>{`${post.frontmatter.title}`}</title>
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

ProgramPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ProgramPost

export const pageQuery = graphql`
  query ProgramPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`
