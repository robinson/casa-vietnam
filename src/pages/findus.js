import React from "react"
import { Link } from "gatsby"
import GoogleMap from "../components/layouts/GoogleMap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ShowHideElement } from '../components/animations'

const SecondPage = ({ location }) => (
  <Layout location={location} stick="stick" headerTitle="Find us">
    <SEO title="Find us" />
    <div>
      <h3>
        
        Viale Nazario Sauro, 5 20124 Milan, Lombardia, Italy<br />
        +39 02 3658 8358<br />
        vietnamristorante@gmail.com
      </h3>
    </div>
    <ShowHideElement>
      <GoogleMap />
    </ShowHideElement>
   
  </Layout>
)

export default SecondPage
