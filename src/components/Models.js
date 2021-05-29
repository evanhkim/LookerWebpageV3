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
import { ModelTraining as ModelsIcon } from '@styled-icons/material'

const boxStyle = {
  width: '350px',
  height: '390px',
  borderRadius: '10px',
  backgroundColor: '#2A2E39',
}

class Model extends React.Component {
  render() {
    return (
      <>
        <ComponentsProvider>

          {/* Navigation Bar */}
          <Menu />

          <Space p="large" width="100%" height="25vh" around>
            <Text p="large" fontSize="xxxxxlarge" color="white">
              Models
            </Text>
          </Space>
          <Flex flexDirection="column" mr="large">
            {/*Price Prediction Model*/}
            <Flex justifyContent="space-around" flexWrap="wrap">
              <Box style={boxStyle}>
                <Link
                  href="https://bondintelligence.cloud.looker.com/explore/Fixed_Income/pricemodel"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  {/* <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img> */}
                  <Flex justifyContent="space-around">
                    <ModelsIcon style={iconStyle} />
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text style={{ color: 'white' }}>
                      Price Prediction Model {'>'}
                    </Text>
                  </Flex>
                </Link>
              </Box>

              {/*Corp Risk Prediction Model*/}
              <Box style={boxStyle}>
                <Link
                  href="https://bondintelligence.cloud.looker.com/explore/Fixed_Income/risk_predicted_corp"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  {/* <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img> */}
                  <Flex justifyContent="space-around">
                    <ModelsIcon style={iconStyle} />
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text style={{ color: 'white' }}>
                      Corp Risk Prediction Model {'>'}
                    </Text>
                  </Flex>
                </Link>
              </Box>

              {/*Muni Risk Prediction Model*/}
              <Box style={boxStyle}>
                <Link
                  href="https://bondintelligence.cloud.looker.com/explore/Fixed_Income/risk_predicted_muni"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  {/* <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img> */}
                  <Flex justifyContent="space-around">
                    <ModelsIcon style={iconStyle} />
                  </Flex>
                  <Flex justifyContent="space-around">
                    <Text style={{ color: 'white' }}>
                      Muni Risk Prediction Model {'>'}
                    </Text>
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

export default Model;
