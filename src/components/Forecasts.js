/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React, { useEffect, useState, useContext, Component } from 'react'
import { ExtensionContext } from '@looker/extension-sdk-react'
import {
  Space,
  ComponentsProvider,
  Text,
  Box,
  Link,
  Flex,
  FlexItem,
  MenuList,
  MenuItem,
} from '@looker/components'
import { ROUTES } from '../Router'
import { Link as Linker, LinkProps } from 'react-router-dom'
import Menu from './Menu'
import { StackedLineChart as ForecastsIcon, Gavel, Business, CorporateFare, AccountBalance } from '@styled-icons/material'
import { iconStyle } from './HomePage.js'

const bgColor = {
  backgroundColor: "#131722"
}

const boxStyle = {
  width: '380px',
  height: '390px',
  borderRadius: '10px',
  backgroundColor: '#1f2436',
}

const menuBackgroundColor = "#1f2436"

const buttonHighlightColor = "#2A2E39"

// Recursive function that traverses down all child branches of an element and styles everything below
function traverseDescendants(node, highlightColor) {

  node.style.backgroundColor = highlightColor
  if (node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      traverseDescendants(node.children[i], highlightColor)
    }
  }
}

function highlightBoxButtonBackground(e) {

  let targ;
  let targetName = e.target.className
  if (e.target.className.baseVal === undefined) {
    switch (e.target.className.substring((e.target.className.length - 3), e.target.className.length)) {
      case "box":
        targ = e.target;
        break;
      default:
        if (targetName.substring(0, 4) === "Flex") {
          targ = e.target.parentNode
        } else {
          targ = e.target.parentNode.parentNode.parentNode
        }
        break;
    }
  } else {
    targ = e.target.parentNode.parentNode.parentNode
  }

  if (targ.className.substring(0, 4) === "Link") {
    targ = targ.parentNode
  }

  traverseDescendants(targ, buttonHighlightColor)
}

function unhighlightBoxButtonBackground(e) {

  let targ;
  let targetName = e.target.className
  if (e.target.className.baseVal === undefined) {
    switch (e.target.className.substring((e.target.className.length - 3), e.target.className.length)) {
      case "box":
        targ = e.target;
        break;
      default:
        if (targetName.substring(0, 4) === "Flex") {
          targ = e.target.parentNode
        } else {
          targ = e.target.parentNode.parentNode.parentNode
        }
        break;
    }
  } else {
    targ = e.target.parentNode.parentNode.parentNode
  }

  if (targ.className.substring(0, 4) === "Link") {
    targ = targ.parentNode
  }

  traverseDescendants(targ, menuBackgroundColor)
}

class Forecast extends React.Component {
  render() {
    return (
      <>
        <ComponentsProvider>
          <Menu />
          <Space style={bgColor} p="xxxxxlarge" width="100%" height="25vh" around>
            <Text p="xxxxxlarge" fontSize="xxxxxlarge" color="#9B9EA3">
              Forecasts
            </Text>
          </Space>
          <Flex style={bgColor} flexDirection="column" mr="large" width="100%">
            {/*Corp Forecast*/}
            <Flex justifyContent="space-around" flexWrap="wrap">
              <Box className="box" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground} >
                <Link
                  href="https://bondintelligence.cloud.looker.com/embed/dashboards-next/29?CUSIP=36962GXZ2"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                  style={{ textDecorationColor: "#3281C5" }}
                >
                  <Flex justifyContent="space-around">
                    <Business style={iconStyle} size="340" />
                    {/* <CorporateFare style={iconStyle} size="340"/> */}
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text className="text0" style={{ color: '#9B9EA3', fontSize: "30" }}> Corp Forecast </Text>
                  </Flex>
                </Link>
              </Box>

              {/*Muni Forecast*/}
              <Box className="box" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground} >
                <Link
                  href="https://bondintelligence.cloud.looker.com/embed/dashboards-next/28?CUSIP%20Parameter=01757LFH4"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                  style={{ textDecorationColor: "#3281C5" }}
                >
                  <Flex justifyContent="space-around">
                    <AccountBalance style={iconStyle} size="340" />
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text className="text1" style={{ color: '#9B9EA3', fontSize: "30" }}> Muni Forecast </Text>
                  </Flex>
                </Link>
              </Box>
            </Flex>
            <Space height="50px" />
          </Flex>
        </ComponentsProvider>
      </>
    )
  }
}

export default Forecast
