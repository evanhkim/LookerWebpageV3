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
  MenuItemProps,
} from '@looker/components'
import { ROUTES } from '../Router'
import { Link as Linker, LinkProps } from 'react-router-dom'
import {
  Home as HomeIcon,
  StackedLineChart as ForecastsIcon,
  Money as MarketDataIcon,
  Dashboard as DashboardsIcon,
  ModelTraining as ModelsIcon,
  ScatterPlot as RelValIcon,
  SwapHoriz as EtradeIcon,
  FilterAlt as ScreenerIcon,
  Lightbulb as InsightsIcon,
  MenuBook as DataDictionaryIcon,
} from '@styled-icons/material'

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
            backgroundColor="#4F5054"
            // backgroundColor="#84878D"
            // backgroundColor="#"
            height="8vh"
          >
            <MenuList type="none">
              <Flex flexDirection="row">
                <Linker
                  to={ROUTES.HOMEPAGE_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<HomeIcon />} color="#00D5FF">
                    Homepage
                  </MenuItem>
                </Linker>
                <Link
                  href="https://bondintelligence.cloud.looker.com/browse"
                  target="_blank"
                  style={{ textDecoration: 'none', backgroundColor: '#4F5054' }}
                >
                  <MenuItem icon={<DashboardsIcon />} color="#00D5FF">
                    Dashboards
                  </MenuItem>
                </Link>
                <Link
                  href="https://bondintelligence.cloud.looker.com/extensions/data_dictionary::data-dictionary/"
                  target="_blank"
                  style={{textDecoration: '#00FFFF', backgroundColor: '#4F5054'}}
                >
                  <MenuItem icon={<DataDictionaryIcon />} color="#00D5FF">
                    Data Dictionary
                  </MenuItem>
                </Link>
                <Linker
                  to={ROUTES.MODELS_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<ModelsIcon />} color="#00D5FF">
                    Models
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.SCREENER_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<ScreenerIcon />} color="#00D5FF">
                    Screener
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.RELVAL_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<RelValIcon />} color="#00D5FF">
                    RelVal
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.ETRADE_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<EtradeIcon />} color="#00D5FF">
                    Etrade
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.INSIGHT_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<InsightsIcon />} color="#00D5FF">
                    Insights
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.MARKETDATA_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<MarketDataIcon />} color="#00D5FF">
                    Market Data
                  </MenuItem>
                </Linker>
                <Linker
                  to={ROUTES.FORECAST_ROUTE}
                  style={{ backgroundColor: '#4F5054', textDecoration: 'none' }}
                >
                  <MenuItem icon={<ForecastsIcon />} color="00D5FF">
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

export default Menu;