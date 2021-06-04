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
// import { Menu as MenuHeader, MenuButton, MenuList, MenuItem } from "@reach/menu-button";
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
  Menu as MenuHeader,
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

function highlightBackground() {
  e.target.style.backgroundColor = "red"
}

function unHighlightBackground(e) {
  e.target.style.backgroundColor = "#29262A"
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
            // backgroundColor="#37393E"
            // backgroundColor="#4F5054"
            backgroundColor="#29262A"
            // backgroundColor="#84878D"
            height="8vh"
          >
            <MenuList type="none" >
              <Flex flexDirection="row" >
                <Linker
                  to={ROUTES.HOMEPAGE_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem icon={<HomeIcon />} color="#9B9EA3" >
                    Homepage
                  </MenuItem>
                </Linker>
                <Link
                  href="https://bondintelligence.cloud.looker.com/browse"
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                    backgroundColor: '#29262A'
                  }}
                >
                  <MenuItem icon={<DashboardsIcon />} color="#9B9EA3">
                    Dashboards
                  </MenuItem>
                </Link>
                <Link
                  href="https://bondintelligence.cloud.looker.com/extensions/data_dictionary::data-dictionary/"
                  target="_blank"
                  style={{
                    textDecoration: '#00FFFF',
                    backgroundColor: '#29262A'
                  }}
                >
                  <MenuItem icon={<DataDictionaryIcon />} color="#9B9EA3">
                    Data Dictionary
                  </MenuItem>
                </Link>
                <Linker
                  to={ROUTES.MODELS_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  {/* <MenuHeader
                    content={
                      <>
                        <MenuItem icon={<ModelsIcon />} color="#00D5FF">
                          Models
                        </MenuItem>
                        <MenuItem icon={<ModelsIcon />} color="#00D5FF">
                          Models
                        </MenuItem>
                      </>
                    }
                  >
                    <MenuItem icon={<ModelsIcon />} color="#00D5FF">
                      Models
                    </MenuItem>
                  </MenuHeader> */}
                  <MenuItem icon={<ModelsIcon /> } color="#9B9EA3" >
                    <span> Models </span>
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.SCREENER_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem icon={<ScreenerIcon />} color="#9B9EA3">
                    Screener
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.RELVAL_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem icon={<RelValIcon />} color="#9B9EA3">
                    RelVal
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.ETRADE_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem icon={<EtradeIcon />} color="#9B9EA3">
                    Etrade
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.INSIGHT_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem icon={<InsightsIcon />} color="#9B9EA3">
                    Insights
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.MARKETDATA_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem icon={<MarketDataIcon />} color="#9B9EA3">
                    Market Data
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.FORECAST_ROUTE}
                  style={{
                    backgroundColor: '#29262A',
                    textDecoration: 'none'
                  }}
                >
                  <MenuItem icon={<ForecastsIcon />} color="#9B9EA3">
                    Forecasts
                  </MenuItem>
                </Linker>
              </Flex>
            </MenuList>
          </Box>
        </ComponentsProvider>
      </>
    )
  }
}

export default Menu