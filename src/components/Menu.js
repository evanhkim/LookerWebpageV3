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
// import css from "file.css";
// import { Menu as MenuTag, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
// import "@reach/menu-button/styles.css";
import '../App.css'
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
  MenuItemProps,
} from '@looker/components'
import { ROUTES } from '../Router'
import { Link as Linker, LinkProps } from 'react-router-dom'
import {
  Home as HomeIcon,
  Dashboard as DashboardsIcon,
  ModelTraining as ModelsIcon,
  ScatterPlot as RelValIcon,
  SwapHoriz as EtradeIcon,
  FilterAlt as ScreenerIcon,
  MenuBook as DataDictionaryIcon,
  Insights as InsightsIcon,
  Analytics as MarketDataIcon,
  TrendingUp as ForecastsIcon
} from '@styled-icons/material'

const menuBackgroundColor = (
  // "#37393E"
  // "#4F5054"
  "#29262A"
  // "#84878D"
  // "#39363b"
  // "#4b494d"
)

// light grey/white
// const buttonHighlightColor = "#d5d9db" 

// Dark Green
// const buttonHighlightColor = "#125f58"

// Dark Blue
const buttonHighlightColor = "#0b7ea6"

function highlightBackground(e) {

  if (e.target.children.length === 2) {
    e.target.style.backgroundColor = buttonHighlightColor
    e.target.children[0].style.backgroundColor = buttonHighlightColor
    if (e.target.children[0].children.length > 0) {
      e.target.children[0].children[0].style.backgroundColor = buttonHighlightColor
    }
    e.target.children[1].style.backgroundColor = buttonHighlightColor
    if (e.target.children[1].children.length > 0) {
      e.target.children[1].children[0].style.backgroundColor = buttonHighlightColor
      e.target.children[1].children[1].style.backgroundColor = buttonHighlightColor
    }
  } else {
    console.log("highlight")
    e.target.style.backgroundColor = buttonHighlightColor
  }
}

function unHighlightBackground(e) {

  e.target.style.backgroundColor = "#29262A"
  if (e.target.children.length === 2) {
    e.target.children[0].style.backgroundColor = "#29262A"
    if (e.target.children[0].children.length > 0) {
      e.target.children[0].children[0].style.backgroundColor = "#29262A"
    }
    e.target.children[1].style.backgroundColor = "#29262A"
    if (e.target.children[1].children.length > 0) {
      e.target.children[1].children[0].style.backgroundColor = "#29262A"
      e.target.children[1].children[1].style.backgroundColor = "#29262A"
    }
  } else {
    console.log("unhighlight!")
    console.log(e.target.children)
    e.target.style.backgroundColor = menuBackgroundColor
  }
}

class Menu extends React.Component {
  render() {
    return (
      <>
        <ComponentsProvider>
          <Box
            p="1px"
            display="flex"
            flexDirection="row"
            border-style="dotted solid"
            flex-basis="auto"
            width="100%"
            justifyContent="center"
            mx="auto"
            backgroundColor={menuBackgroundColor}
            // height="8vh"
            height="50px"

          >
            <MenuList portal="false" children="false" type="none">
              <Flex flexDirection="row" >
                <Linker
                  to={ROUTES.HOMEPAGE_ROUTE}
                  style={{
                    backgroundColor: { menuBackgroundColor },
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem onMouseEnter={highlightBackground} onMouseLeave={unHighlightBackground} icon={<HomeIcon />} color="#9B9EA3" >
                    Homepage
                  </MenuItem>
                </Linker>

                {/* <Linker
                  to={ROUTES.DASHBOARD_ROUTE}
                  style={{
                    textDecoration: 'none',
                    backgroundColor: {menuBackgroundColor}
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<DashboardsIcon />} color="#9B9EA3" >
                    Dashboards
                  </MenuItem>
                </Linker>

                <Link
                  href="https://bondintelligence.cloud.looker.com/extensions/data_dictionary::data-dictionary/"
                  target="_blank"
                  style={{
                    textDecoration: '#00FFFF',
                    backgroundColor: {menuBackgroundColor}
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<DataDictionaryIcon />} color="#9B9EA3" >
                    Data Dictionary
                  </MenuItem>
                </Link>

                <Linker
                  to={ROUTES.MODELS_ROUTE}
                  style={{
                    backgroundColor: {menuBackgroundColor},
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<ModelsIcon />} color="#9B9EA3" >
                    Models
                  </MenuItem>
                </Linker>

                <Linker
                  to={ROUTES.SCREENER_ROUTE}
                  style={{
                    backgroundColor: {menuBackgroundColor},
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<ScreenerIcon />} color="#9B9EA3" >
                    Screener
                  </MenuItem>
                </Linker>

                <Linker
                  to={ROUTES.RELVAL_ROUTE}
                  style={{
                    backgroundColor: {menuBackgroundColor},
                    textDecoration: 'none'
                  }}
                >

                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<RelValIcon />} color="#9B9EA3" >
                    RelVal
                  </MenuItem>
                </Linker>

                <Linker
                  to={ROUTES.ETRADE_ROUTE}
                  style={{
                    backgroundColor: {menuBackgroundColor},
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<EtradeIcon />} color="#9B9EA3" >
                    Etrade
                  </MenuItem>
                </Linker>

                <Linker
                  to={ROUTES.INSIGHT_ROUTE}
                  style={{
                    backgroundColor: {menuBackgroundColor},
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<InsightsIcon />} color="#9B9EA3" >
                    Insights
                  </MenuItem>
                </Linker>

                <Linker
                  to={ROUTES.MARKETDATA_ROUTE}
                  style={{
                    backgroundColor: {menuBackgroundColor},
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<MarketDataIcon />} color="#9B9EA3" >
                    Market Data
                  </MenuItem>
                </Linker>

                <Linker
                  to={ROUTES.FORECAST_ROUTE}
                  style={{
                    backgroundColor: {menuBackgroundColor},
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem onMouseOver={highlightBackground} onMouseLeave={unHighlightBackground} icon={<ForecastsIcon />} color="#9B9EA3" >
                    Forecasts
                  </MenuItem>
                </Linker> */}
              </Flex>
            </MenuList>
          </Box>
        </ComponentsProvider>
      </>
    )
  }
}

export default Menu