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

const bgColor = {
  backgroundColor: "#131722"
}

class Relval extends React.Component {

  render() {
    return (
      <>
        <ComponentsProvider>
          <Menu />
          {/* <Space style={bgColor} p="xxxxxlarge" width="100%" height="25vh" around>
            <Text p="xxxxxlarge" fontSize="xxxxxlarge" color="#9B9EA3">
              Relval Page
            </Text>
          </Space> */}
          <Box height="1000px" style={{backgroundColor: "#1d1d1d"}}>
            <iframe
              frameBorder="0"
              height="1000px"
              width="100%"
              src="https://relvalapp-dot-bi-model-development.wl.r.appspot.com/"
            ></iframe>
          </Box>

          
        </ComponentsProvider>
      </>
    )
  }
}

export default Relval
