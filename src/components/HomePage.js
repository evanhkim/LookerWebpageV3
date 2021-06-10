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

import React, { useContext, useState, useEffect } from 'react'
import {
  Space,
  ComponentsProvider,
  Text,
  Box,
  Link,
  Flex,
  FlexItem,
} from '@looker/components'
import {
  Dashboard as DashboardsIcon,
  ModelTraining as ModelsIcon,
  ScatterPlot as RelValIcon,
  SwapHoriz as EtradeIcon,
  FilterAlt as ScreenerIcon,
  MenuBook as DataDictionaryIcon,
  Analytics as MarketDataIcon,
  Insights as InsightsIcon,
  TrendingUp as ForecastsIcon,
} from '@styled-icons/material'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { ExtensionProvider } from '@looker/extension-sdk-react'
import {
  Link as RouterLink,
  LinkProps,
  Link as Linker,
  BrowserRouter,
} from 'react-router-dom'
import { ROUTES } from '../Router.tsx'
import { Message } from './Hooks.js'
import '../App.css'

export const bgColor = {
  backgroundColor: '#131722',
}

const boxStyle = {
  width: '23vw',
  height: '390px',
  borderRadius: '10px',
  backgroundColor: '#1f2436',
}

export const mainTextColor = {
  color: '#9B9EA3',
}

export const buttonFont = {
  color: '#9B9EA3',
  fontSize: '40',
}

export const iconStyle = {
  color: '#9B9EA3',
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

  console.log(e.target)
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
    if (e.target.className.baseVal.length > 0) {
      targ = e.target.parentNode.parentNode.parentNode
    } else {
      targ = e.target.parentNode.parentNode.parentNode.parentNode
    }
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
          targ = e.target.parentNode.parentNode
        } else {
          targ = e.target.parentNode.parentNode.parentNode
        }
        break;
    }
  } else {
    if (e.target.className.baseVal.length > 0) {
      targ = e.target.parentNode.parentNode.parentNode
    } else {
      targ = e.target.parentNode.parentNode.parentNode.parentNode
    }
  }

  traverseDescendants(targ, menuBackgroundColor)
}

function underlineText(e) {

  let targ;
  let targetName = e.target.className
  if (e.target.className.baseVal === undefined) {
    switch (e.target.className.substring((e.target.className.length - 3), e.target.className.length)) {
      case "box":
        targ = e.target.parentNode;
        break;
      default:
        if (targetName.substring(0, 4) === "Flex") {
          targ = e.target.parentNode.parentNode
        } else {
          targ = e.target.parentNode.parentNode.parentNode
        }
        break;
    }
  } else {
    if (e.target.className.baseVal.length > 0) {
      targ = e.target.parentNode.parentNode.parentNode
    } else {
      targ = e.target.parentNode.parentNode.parentNode.parentNode
    }
  }

  targ.style.textDecoration = "underline"
  targ.style.textDecorationColor = "#3281C5"
  targ.style.cursor = "pointer"
}

function noUnderlineText(e) {

  let targ;
  let targetName = e.target.className
  if (e.target.className.baseVal === undefined) {
    switch (e.target.className.substring((e.target.className.length - 3), e.target.className.length)) {
      case "box":
        targ = e.target.parentNode;
        break;
      default:
        if (targetName.substring(0, 4) === "Flex") {
          targ = e.target.parentNode.parentNode
        } else {
          targ = e.target.parentNode.parentNode.parentNode
        }
        break;
    }
  } else {
    if (e.target.className.baseVal.length > 0) {
      targ = e.target.parentNode.parentNode.parentNode
    } else {
      targ = e.target.parentNode.parentNode.parentNode.parentNode
    }
  }

  targ.style.textDecoration = "none"
}

// Allows for calling two functions in a mouseEvent
function underlineAndHighlight(e) {
  underlineText(e);
  highlightBoxButtonBackground(e);
}

// Allows for calling two functions in a mouseEvent
function undoUnderlineAndHighlight(e) {
  noUnderlineText(e);
  unhighlightBoxButtonBackground(e);
}

var currentdate = new Date()
var min = currentdate.getMinutes()
if (min < 10) {
  min = '0' + min
}
var datetime =
  'As of ' +
  (currentdate.getMonth() + 1) +
  '/' +
  currentdate.getDate() +
  '/' +
  currentdate.getFullYear() +
  ' at ' +
  currentdate.getHours() +
  ':' +
  min

class HomePage extends React.Component {
  render() {
    return (
      <>
        <ComponentsProvider>
          {/* Ticker at Top */}
          <iframe
            width="100%"
            frameBorder="0"
            height="70vh"
            src="https://s.tradingview.com/embed-widget/tickers/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22title%22%3A%22S%26P%20500%22%7D%2C%7B%22proName%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22title%22%3A%22Nasdaq%20100%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22description%22%3A%22PIMCO%22%2C%22proName%22%3A%22NYSE%3APHK%22%7D%2C%7B%22description%22%3A%22FIDELITY%22%2C%22proName%22%3A%22AMEX%3AFDVV%22%7D%2C%7B%22description%22%3A%22VANGUARD%22%2C%22proName%22%3A%22AMEX%3AVOO%22%7D%2C%7B%22description%22%3A%22BLACKROCK%22%2C%22proName%22%3A%22NYSE%3ABLK%22%7D%2C%7B%22description%22%3A%22SPDR%20NYSE%22%2C%22proName%22%3A%22AMEX%3AXNTK%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A104%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22tickers%22%7D"
          />

          {/* Welcome Message */}
          <Message />

          {/* Time Display */}
          <Box
            style={{
              width: '100%',
              height: '3vh',
              backgroundColor: '#3e8bcf',
              verticalAlign: 'center',
              borderRadius: "5%"
            }}
          >
            <div align="center" style={{ color: '#dadfe8' }}>
              <Text
                style={{
                  fontSize: '20',
                  verticalAlign: 'center',
                  lineHeight: '3vh',
                }}
              >
                {datetime}
              </Text>
            </div>
          </Box>

          {/* Market Overview */}
          <div align="center" width="100%" height="9vh" style={bgColor}>
            <Text
              backgroundColor="#131722"
              style={{ lineHeight: '9vh' }}
              color={mainTextColor}
              fontSize="37px"
            >
              Market Overview
            </Text>
          </div>
          <iframe
            width="100%"
            frameBorder="0"
            height="700"
            src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22plotLineColorGrowing%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(42%2C%2046%2C%2057%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(120%2C%20123%2C%20134%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME%3AGE1!%22%2C%22d%22%3A%22Eurodollar%22%7D%2C%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%2C%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22d%22%3A%22Nasdaq%20100%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%2030%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU30%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3AUKXGBP%22%2C%22d%22%3A%22UK%20100%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Commodities%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Natural%20Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Commodities%22%7D%5D%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22market-overview%22%7D"
          />

          {/* Two Looks at Top */}
          <Flex
            alignItems="center"
            flexDirection="column"
            justifyContent="space-around"
            width="100%"
          >
            {/* Top 10 Undervalued */}
            <FlexItem style={bgColor} width="100%">
              <div style={bgColor} align="center" height="12vh" width="100%">
                <Text
                  style={{
                    color: '#9B9EA3',
                    backgroundColor: '#131722',
                    lineHeight: '12vh',
                  }}
                  fontSize="37px"
                >
                  Here are the top 10 undervalued bonds
                </Text>
              </div>
              <Box
                style={{
                  width: '100%',
                  height: '282px',
                  borderRadius: '5px',
                  backgroundColor: '#3B4346',
                }}
              >
                <div align="center" width="100%">
                  <iframe
                    frameBorder="0"
                    height="282px"
                    width="100%"
                    id="l9"
                    src="https://bondintelligence.cloud.looker.com:443/embed/looks/11?allow_login_screen=true/embed_domain=https://bondintelligence.cloud.looker.com"
                  />
                </div>
              </Box>
            </FlexItem>

            {/* Recommendation Engine */}
            <FlexItem style={bgColor} width="100%">
              <div style={bgColor} align="center" height="12vh" width="100%">
                <Text
                  style={{ lineHeight: '12vh' }}
                  color={mainTextColor}
                  fontSize="37px"
                >
                  Here are the recommendations for you today
                </Text>
              </div>
              <Box
                style={{
                  width: '100%',
                  height: '282px',
                  borderRadius: '5px',
                  backgroundColor: '#3B4346',
                }}
              >
                <div align="center" width="100%">
                  <iframe
                    frameBorder="0"
                    height="282px"
                    width="100%"
                    id="l15"
                    src="https://bondintelligence.cloud.looker.com/embed/looks/15?allow_login_screen=true/embed_domain=https://bondintelligence.cloud.looker.com"
                  />
                </div>
              </Box>
              <Space height="100px" />

              {/* BUTTON GALLERY BELOW
                  wwwwwwwwwwwwwwwww
                   wwwwwwwwwwwwwww
                    wwwwwwwwwwwww
                     wwwwwwwwwww
                      wwwwwwwww
                       wwwwwww
                        wwwww
                         www
                          v            */}

              <Flex flexDirection="column" mr="large">
                {/*TOP THREE BUTTONS*/}
                <Flex justifyContent="space-around" flexWrap="wrap">
                  {/*DASHBOARDS BUTTON*/}
                  <Linker
                    to={ROUTES.DASHBOARD_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <DashboardsIcon className="icon0" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Dashboards
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>


                  {/*DATA DICT BUTTON*/}
                  <Link
                    href="https://bondintelligence.cloud.looker.com/extensions/data_dictionary::data-dictionary/"
                    target="_blank"
                    sandbox="allow-scripts allow-modals allow-popups"
                    style={{ textDecorationColor: "#3281C5" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                      <Flex justifyContent="space-around">
                        <DataDictionaryIcon className="icon1" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Data Dictionary
                        </Text>
                      </Flex>
                    </Box>
                  </Link>

                  {/*MODELS BUTTON*/}
                  <Linker
                    to={ROUTES.MODELS_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <ModelsIcon className="icon2" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Models
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>
                </Flex>
                <Space height="10vh" />

                {/*MIDDLE THREE BUTTONS*/}
                <Flex justifyContent="space-around" flexWrap="wrap">
                  {/*SCREENER BUTTON*/}
                  <Linker
                    to={ROUTES.SCREENER_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <ScreenerIcon className="icon3" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Screener
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*RELVAL BUTTON*/}
                  <Linker
                    to={ROUTES.RELVAL_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <RelValIcon className="icon4" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          RelVal
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*ETRADE BUTTON*/}
                  <Linker
                    to={ROUTES.ETRADE_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <EtradeIcon className="icon5" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Etrade
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>
                </Flex>
                <Space height="10vh" />

                {/*BOTTOM THREE BUTTONS*/}
                <Flex justifyContent="space-around" flexWrap="wrap">
                  {/*INSIGHTS BUTTON*/}
                  <Linker
                    to={ROUTES.INSIGHT_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <InsightsIcon className="icon6" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Insights
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*MARKET DATA BUTTON*/}
                  <Linker
                    to={ROUTES.MARKETDATA_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <MarketDataIcon className="icon7" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Market Data
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*FORECASTS BUTTON*/}
                  <Linker
                    to={ROUTES.FORECAST_ROUTE}
                    style={{ textDecoration: "none" }}
                  >
                    <Box className="box" style={boxStyle} onMouseEnter={underlineAndHighlight} onMouseLeave={undoUnderlineAndHighlight}>
                      <Flex justifyContent="space-around">
                        <ForecastsIcon className="icon8" style={iconStyle} size="340" />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={buttonFont}
                        >
                          Forecasts
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>
                  <Space height="10vh" />
                </Flex>
              </Flex>
            </FlexItem>
          </Flex>
        </ComponentsProvider>
      </>
    )
  }
}

export default HomePage
