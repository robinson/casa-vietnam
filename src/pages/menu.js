import React, { useState } from "react"
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from "gatsby"
import { Waypoint } from 'react-waypoint';
import styled from 'styled-components'
import { useTrail, config, animated } from 'react-spring'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useWindowSize } from '../components/hooks/useWindowSize'
import { size, anyIsTrue, above } from '../components/utilities'
import { Button, Select, Card } from "../components/elements"
import { Checkbox } from "../components/layouts"
import Image from '../components/image'
import { ShowHideElement } from '../components/animations'
import menupdf from '../components/assets/Casa-Vietnam-Milano-2024.pdf'


const menu = ['Antipasto', 'Tagliatelle di riso', 'spagetti di riso', 'riso', 'piatti gevani', 'Panino vietnamita', 'Secondo', 'Contorni','Bevande', 'Dolce']

const StyledList = styled(animated.ul)`
margin:0 0 5rem 0;
padding:0;
list-style:none;
display:flex;
li {
  flex: 1 0 auto;
  display:flex;
  padding:0;
  margin:0;
}
`
const MenuWrapper = styled.div`
display:flex;
/* flex-flow:column wrap; */
justify-content:space-between;
margin-bottom:3rem;

`

const MenuImage = styled.div`
display:none;
max-width:300px;
width:100%;
 ${above.med`
    display:flex;
    `} 
`

const MenuButton = styled(Button)`
display:block;
margin-left: auto;
margin-right: auto;
width:100%;
max-width:500px;
margin-bottom:5rem;`


const StyledButtonList = ({ options, state, setState }) => {
  const [isVisible, setIsVisible] = useState(false)

  const trail = useTrail(options.length,
    {
      opacity: isVisible ? 1 : 0,
      y: isVisible ? 0 : 50,
      from: { opacity: 0, y: 50 },
      delay: 200,
      config: { mass: 1, tension: 120, friction: 14 },

    }

  )
  return (
    <Waypoint onEnter={() => setIsVisible(true)}>
      <StyledList>
        {trail.map(({ y, ...rest }, index) => {
          const option = options[index];
          return (

            <animated.li id="menu" style={{ ...rest, transform: y.interpolate(y => `translate(0,${y}px)`) }}>
              <Button modifiers="D3"
                value={option}
                active={option === state}
                onClick={(e) => {
                  setState(e.target.value)
                }}
              >
                {option}
              </Button>
            </animated.li>
          )
        }
        )}
      </StyledList>
    </Waypoint>
  )
}

const StyledSelectList = ({ options, setState, state }) => (

  <Select css={`
    margin:0 0 2rem 0;
    `}
    onChange={(e) => {
      setState(e.target.value)
    }}
  ><option selected>{state}</option>
    {options.map((option) => (
      <option value={option} >{option}</option>
    ))}
  </Select>

)

const MenuPage = ({ location }) => {
  
  const { cmsAsset, cmsMenu, cmsPdf } = useStaticQuery(graphql`
  query menu {
    cmsAsset: allDatoCmsAsset(filter: {tags: {eq: "pho"}}) {
      edges {
        node {
          id
          fluid {
         ...GatsbyDatoCmsFluid
          }
        }
      }
    }
    cmsMenu: allDatoCmsMenu {
   edges {
     node {
      id
      name
      category
      ingredients
      tag
      price
     }
   }
   
}
cmsPdf: allDatoCmsAsset(filter: {tags: {eq: "menu"}}) {
  edges {
    node {
      id
      url
    }
  }
}
}
` )

  const windowWidth = useWindowSize().width;
  const [menuOption, setMenuOption] = useState('Antipasto')
  const [checkedItems, setCheckedItems] = useState({})


  // const trail = useTrail(items.length,
  //   {

  //     opacity: on ? 0 : 1,
  //     transform: on ? 'scale(0.2)' : 'scale(1)'

  //   }
  // )

  const handleCheckboxChange = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;
    setCheckedItems({ ...checkedItems, [name]: isChecked })

  }
  const checkIfChecked = (string) => {
    // if (!anyIsTrue(checkedItems)) 
    for (const key in checkedItems) {
      if (checkedItems.hasOwnProperty(key)) {
        const element = checkedItems[key];
        if (element) {
          return string.includes(key);
        }
      }
    }
    return false
  }

  const { asset } = cmsAsset;
  const { edges } = cmsMenu;
  const { pdf } = cmsPdf;
 
  return (
    <Layout location={location} stick="stick" headerTitle={"menu"}>
      <SEO title="Menu" />
      {/* <ShowHideElement> */}

      {windowWidth > size.med
        ?
        <StyledButtonList
          options={menu}
          state={menuOption}
          setState={setMenuOption}
        />
        : <StyledSelectList options={menu} state={menuOption} setState={setMenuOption} />}

      {/* </ShowHideElement> */}

      {console.log(asset)}
      {console.log(pdf)}
      <MenuWrapper>
        <MenuImage>
          <ShowHideElement cssProps={`
          width:100%;
          max-width:300px;
          margin: 0 2rem 0 0;
          `}>
            <Image fluid={asset} cssProps={`
          width:100%;
          height:550px;
          `} />
          </ShowHideElement>

        </MenuImage>
        <ShowHideElement>
          <Card css={`
            width:100%;
    `}>
           
            <Card.CardRow>
              {edges.map(({ node }) => {
                const { category, tag } = node;
                if (category === menuOption) {
                  return (
                    <Card.CardRowItem modifiers={anyIsTrue(checkedItems) ? !checkIfChecked(tag) && 'transparent' : ''}>
                      <Card.CardHeader modifiers={["textFont", "red", anyIsTrue(checkedItems) ? checkIfChecked(tag) && "green" : '']}>{node.name}</Card.CardHeader>
                      <Card.CardBody> {node.ingredients}</Card.CardBody>
                      <Card.CardFooter>{node.price}</Card.CardFooter>
                    </Card.CardRowItem> 
                  )
                }
              })}
            </Card.CardRow>
          </Card>
        </ShowHideElement>
      </MenuWrapper>
      <ShowHideElement><MenuButton><a href={menupdf}>
              Download menu on PDF</a></MenuButton></ShowHideElement>
    </Layout >

  )
}

export default MenuPage
