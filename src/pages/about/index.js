import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/Layout'

export default class AboutPage extends React.Component {
  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-4">about</h1>
              <hr/>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}