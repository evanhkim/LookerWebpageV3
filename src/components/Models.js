/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2021 Looker Data Sciences, Inc.
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

import React, { Component, useEffect, useState, useContext } from 'react'
import {
  Space,
  ComponentsProvider,
  Text,
  Box,
  Link,
  Flex,
  FlexItem,
  MenuList,
  MenuItem
} from '@looker/components'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { ROUTES } from '../Router'
import { Link as Linker, LinkProps } from 'react-router-dom'
import Menu from './Menu'
import { iconStyle } from './HomePage.js'
import {
  Speed as RiskIcon,
  RequestQuote as PricePredictionIcon
} from '@styled-icons/material'
import mainTextColor from './HomePage.js'
import buttonFont from './HomePage.js'

const bgColor = {
  backgroundColor: "#131722"
}

const boxStyle = {
  width: '23vw',
  height: '390px',
  borderRadius: '10px',
  backgroundColor: '#1f2436',
}

const menuBackgroundColor = "#1f2436"

const buttonHighlightColor = "#2A2E39"

function highlightBoxButtonBackground(e) {

  console.log(e.target)
  let targ;
  let targetName = e.target.className
  switch (targetName) {
    case "Box-sc-5738oh-0 gKGXwr box0":
      targ = e.target;
      break;
    case "Box-sc-5738oh-0 gKGXwr box1":
      targ = e.target;
      break;
    case "Box-sc-5738oh-0 gKGXwr box2":
      targ = e.target;
      break;
    case "Flex-sc-1ak395a-0 dcdUyk":
      targ = e.target.parentNode.parentNode;
      break;
    default:
      targ = e.target.parentNode.parentNode.parentNode;
      break;
  }

  targ.style.backgroundColor = buttonHighlightColor
  if (targ.children.length > 0) {
    for (let i = 0; i < targ.children.length; i++) {
      targ.children[i].style.backgroundColor = buttonHighlightColor
      if (targ.children[i].children.length > 0) {
        for (let j = 0; j < targ.children[i].children.length; j++) {
          targ.children[i].children[j].style.backgroundColor = buttonHighlightColor
          if (targ.children[i].children[j].children.length > 0) {
            for (let k = 0; k < targ.children[i].children[j].children.length; k++) {
              targ.children[i].children[j].children[k].style.backgroundColor = buttonHighlightColor
              if (targ.children[i].children[j].children[k].children.length > 0) {
                for (let m = 0; m < targ.children[i].children[j].children[k].children.length; m++) {
                  targ.children[i].children[j].children[k].children[m].style.backgroundColor = buttonHighlightColor
                  if (targ.children[i].children[j].children[k].children[m].children.length > 0) {
                    for (let n = 0; n < targ.children[i].children[j].children[k].children[m].children.length; n++) {
                      targ.children[i].children[j].children[k].children[m].children[n].style.backgroundColor = buttonHighlightColor
                      if (targ.children[i].children[j].children[k].children[m].children[n].children.length > 0) {
                        for (let p = p; n < targ.children[i].children[j].children[k].children[m].children[n].children.length; p++) {
                          targ.children[i].children[j].children[k].children[m].children[n].children[p].style.backgroundColor = buttonHighlightColor
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function unhighlightBoxButtonBackground(e) {

  console.log(e.target)
  let targ;
  let targetName = e.target.className
  switch (targetName) {
    case "Box-sc-5738oh-0 gKGXwr box0":
      targ = e.target;
      break;
    case "Box-sc-5738oh-0 gKGXwr box1":
      targ = e.target;
      break;
    case "Box-sc-5738oh-0 gKGXwr box2":
      targ = e.target;
      break;
    case "Flex-sc-1ak395a-0 dcdUyk":
      targ = e.target.parentNode.parentNode;
      break;
    default:
      targ = e.target.parentNode.parentNode.parentNode;
      break;
  }

  targ.style.backgroundColor = menuBackgroundColor
  if (targ.children.length > 0) {
    for (let i = 0; i < targ.children.length; i++) {
      targ.children[i].style.backgroundColor = menuBackgroundColor
      if (targ.children[i].children.length > 0) {
        for (let j = 0; j < targ.children[i].children.length; j++) {
          targ.children[i].children[j].style.backgroundColor = menuBackgroundColor
          if (targ.children[i].children[j].children.length > 0) {
            for (let k = 0; k < targ.children[i].children[j].children.length; k++) {
              targ.children[i].children[j].children[k].style.backgroundColor = menuBackgroundColor
              if (targ.children[i].children[j].children[k].children.length > 0) {
                for (let m = 0; m < targ.children[i].children[j].children[k].children.length; m++) {
                  targ.children[i].children[j].children[k].children[m].style.backgroundColor = menuBackgroundColor
                  if (targ.children[i].children[j].children[k].children[m].children.length > 0) {
                    for (let n = 0; n < targ.children[i].children[j].children[k].children[m].children.length; n++) {
                      targ.children[i].children[j].children[k].children[m].children[n].style.backgroundColor = menuBackgroundColor
                      if (targ.children[i].children[j].children[k].children[m].children[n].children.length > 0) {
                        for (let p = p; n < targ.children[i].children[j].children[k].children[m].children[n].children.length; p++) {
                          targ.children[i].children[j].children[k].children[m].children[n].children[p].style.backgroundColor = menuBackgroundColor
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

class Model extends React.Component {
  render() {
    return (
      <>
        <ComponentsProvider>

          {/* Navigation Bar */}
          <Menu />

          <Space style={bgColor} p="large" width="100%" height="25vh" around>
            <Text p="large" fontSize="xxxxxlarge" color="#9B9EA3">
              Models
            </Text>
          </Space>

          <Flex width="100%" flexDirection="column" mr="large" style={bgColor}>
            {/*Price Prediction Model*/}
            <Flex justifyContent="space-around" flexWrap="wrap">
              <Box className="box0" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground} >
                <Link
                  href="https://bondintelligence.cloud.looker.com/explore/Fixed_Income/pricemodel"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  <Flex justifyContent="space-around">
                    <PricePredictionIcon style={iconStyle} size="340" />
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text className="text0" style={{ color: '#9B9EA3', fontSize: "30" }}>
                      Price Prediction
                    </Text>
                  </Flex>
                </Link>
              </Box>

              {/*Corp Risk Prediction Model*/}
              <Box className="box1" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground} >
                <Link
                  href="https://bondintelligence.cloud.looker.com/explore/Fixed_Income/risk_predicted_corp"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  <Flex justifyContent="space-around">
                    <RiskIcon style={iconStyle} size="340" />
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text className="text1" style={{ color: '#9B9EA3', fontSize: "30" }}>
                      Corp Risk Prediction
                    </Text>
                  </Flex>
                </Link>
              </Box>

              {/*Muni Risk Prediction Model*/}
              <Box className="box2" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground} >
                <Link
                  href="https://bondintelligence.cloud.looker.com/explore/Fixed_Income/risk_predicted_muni"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  <Flex justifyContent="space-around">
                    <RiskIcon style={iconStyle} size="340" />
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text className="text2" style={{ color: '#9B9EA3', fontSize: "30" }}>
                      Muni Risk Prediction
                    </Text>
                  </Flex>
                </Link>
              </Box>
            </Flex>
            <Space height="50px" style={bgColor} />
          </Flex>
        </ComponentsProvider>
      </>
    )
  }
}

export default Model;