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

const boxStyle = {
  width: '350px',
  height: '330px',
  borderRadius: '10px',
  backgroundColor: '#2A2E39',
}

class Forecast extends React.Component {
  render() {
    return (
      <>
        <ComponentsProvider>
          <Menu />
          <Space p="xxxxxlarge" width="100%" height="50vh" around>
            <Text p="xxxxxlarge" fontSize="xxxxxlarge" color="white">
              Forecasts
            </Text>
          </Space>
          <Flex flexDirection="column" mr="large">
            {/*Corp Forecast*/}
            <Flex justifyContent="space-around" flexWrap="wrap">
              <Box style={boxStyle}>
                <Link
                  href="https://bondintelligence.cloud.looker.com/embed/dashboards-next/29?CUSIP=36962GXZ2"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img>
                  <Flex justifyContent="space-around">
                    <text style={{ color: 'white' }}>Corp Forecast {'>'}</text>
                  </Flex>
                </Link>
              </Box>

              {/*Muni Forecast*/}
              <Box style={boxStyle}>
                <Link
                  href="https://bondintelligence.cloud.looker.com/embed/dashboards-next/28?CUSIP%20Parameter=01757LFH4"
                  target="_blank"
                  sandbox="allow-scripts allow-modals allow-popups"
                >
                  <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img>
                  <Flex justifyContent="space-around">
                    <text style={{ color: 'white' }}>Muni Forecast {'>'}</text>
                  </Flex>
                </Link>
              </Box>
            </Flex>
            <Space height="50px"></Space>
          </Flex>
        </ComponentsProvider>
      </>
    )
  }
}

export default Forecast
