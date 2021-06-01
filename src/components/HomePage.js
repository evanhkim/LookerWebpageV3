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

import React, { useContext, useState } from 'react'
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
import { ExtensionContext } from '@looker/extension-sdk-react'
import {
  Link as RouterLink,
  LinkProps,
  Link as Linker,
  BrowserRouter,
} from 'react-router-dom'
import { ROUTES } from '../Router.tsx'
// import Message from './Hooks.js'

const boxStyle = {
  width: '350px',
  height: '390px',
  borderRadius: '10px',
  backgroundColor: '#2A2E39',
}

export const iconStyle = {
  color: '#00D5FF',
}

//Function to style clickable text on mouse over
function underlineText(e) {
  e.target.style.textDecoration = 'underline'
  e.target.style.textDecorationColor = 'red'
  e.target.style.cursor = 'pointer'
}

//Function to style clickable text on mouse exit (return to original)
function noUnderline(e) {
  e.target.style.textDecoration = 'none'
}

//Function to make cursor a hand on mouse over
function cursorHand(e) {
  e.target.style.cursor = 'pointer'
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
      <div>
        <ComponentsProvider>
          {/* Ticker at Top */}
          <iframe
            width="100%"
            frameBorder="0"
            height="70vh"
            src="https://s.tradingview.com/embed-widget/tickers/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22OANDA%3ASPX500USD%22%2C%22title%22%3A%22S%26P%20500%22%7D%2C%7B%22description%22%3A%22PIMCO%20ETF%22%2C%22proName%22%3A%22BOND%22%7D%2C%7B%22description%22%3A%22BLACKROCK%22%2C%22proName%22%3A%22NYSE%3ABBF%22%7D%2C%7B%22description%22%3A%22PIMCO%20MUNI%22%2C%22proName%22%3A%22AMEX%3AMUNI%22%7D%2C%7B%22description%22%3A%22VANGAURD%22%2C%22proName%22%3A%22NASDAQ%3ABND%22%7D%2C%7B%22description%22%3A%22ISHARE%20MUNI%22%2C%22proName%22%3A%22BOND%22%7D%2C%7B%22description%22%3A%22PGIM%20HY%22%2C%22proName%22%3A%22NYSE%3AISD%22%7D%2C%7B%22description%22%3A%22HARTFORD%22%2C%22proName%22%3A%22BOND%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22height%22%3A72%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22tickers%22%7D"
          ></iframe>

          {/* Welcome Message */}
          <Space width="100%" height="10vh" around>
            <Text fontSize="xxxxxlarge" color="#f3efeb">
              {/* {this.props.messageProp} */}
              Welcome To Our Looker Extension!
            </Text>
          </Space>

          {/* Time Display */}
          <Box
            style={{
              width: '100vw',
              height: '3vh',
              backgroundColor: '#00B9F3',
            }}
          >
            <div align="center" style={{ color: '#f3efeb' }} my="auto">
              <h3 my="auto"> {datetime} </h3>
            </div>
          </Box>
          <Space height="4vh" />

          {/* Market Overview */}
          <div align="center">
            <Text
              backgroundColor="#131722"
              color="white"
              fontSize="37px"
              padding="30px 10px 40px 10px"
            >
              Market Overview
            </Text>
            <Space height="5vh" />
          </div>
          <iframe
            width="100%"
            frameBorder="0"
            height="700"
            src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fbondintelligence.cloud.looker.com%2Fextensions%2Fbond_intelligence_webpage%3A%3Ahelloworld-js%2F%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22plotLineColorGrowing%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(25%2C%20118%2C%20210%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(42%2C%2046%2C%2057%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(120%2C%20123%2C%20134%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22symbolActiveColor%22%3A%22rgba(33%2C%20150%2C%20243%2C%200.12)%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22d%22%3A%22Nasdaq%20100%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3ADJI%22%2C%22d%22%3A%22Dow%2030%22%7D%2C%7B%22s%22%3A%22INDEX%3ANKY%22%2C%22d%22%3A%22Nikkei%20225%22%7D%2C%7B%22s%22%3A%22INDEX%3ADEU30%22%2C%22d%22%3A%22DAX%20Index%22%7D%2C%7B%22s%22%3A%22FOREXCOM%3AUKXGBP%22%2C%22d%22%3A%22FTSE%20100%22%7D%5D%2C%22originalTitle%22%3A%22Indices%22%7D%2C%7B%22title%22%3A%22Commodities%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME_MINI%3AES1!%22%2C%22d%22%3A%22S%26P%20500%22%7D%2C%7B%22s%22%3A%22CME%3A6E1!%22%2C%22d%22%3A%22Euro%22%7D%2C%7B%22s%22%3A%22COMEX%3AGC1!%22%2C%22d%22%3A%22Gold%22%7D%2C%7B%22s%22%3A%22NYMEX%3ACL1!%22%2C%22d%22%3A%22Crude%20Oil%22%7D%2C%7B%22s%22%3A%22NYMEX%3ANG1!%22%2C%22d%22%3A%22Natural%20Gas%22%7D%2C%7B%22s%22%3A%22CBOT%3AZC1!%22%2C%22d%22%3A%22Corn%22%7D%5D%2C%22originalTitle%22%3A%22Commodities%22%7D%2C%7B%22title%22%3A%22Bonds%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22CME%3AGE1!%22%2C%22d%22%3A%22Eurodollar%22%7D%2C%7B%22s%22%3A%22CBOT%3AZB1!%22%2C%22d%22%3A%22T-Bond%22%7D%2C%7B%22s%22%3A%22CBOT%3AUB1!%22%2C%22d%22%3A%22Ultra%20T-Bond%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBL1!%22%2C%22d%22%3A%22Euro%20Bund%22%7D%2C%7B%22s%22%3A%22EUREX%3AFBTP1!%22%2C%22d%22%3A%22Euro%20BTP%22%7D%2C%7B%22s%22%3A%22EUREX%3AFGBM1!%22%2C%22d%22%3A%22Euro%20BOBL%22%7D%5D%2C%22originalTitle%22%3A%22Bonds%22%7D%2C%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%2C%22originalTitle%22%3A%22Forex%22%7D%5D%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%7D"
          ></iframe>

          <Space width="100%" height="5vh" />

          {/* Two Looks at Top */}
          <Flex
            alignItems="center"
            flexDirection="column"
            justifyContent="space-around"
          >
            {/* Top 10 Undervalued */}
            <FlexItem marginBottom="30px">
              <div align="center">
                <Text
                  color="white"
                  fontSize="37px"
                  padding="50px 10px 50px 5px"
                >
                  Here are the top 10 undervalued bonds
                </Text>
                <Space height="5vh" />
              </div>
              <Box
                style={{
                  width: '100vw',
                  height: '293px',
                  borderRadius: '5px',
                  backgroundColor: '#3B4346',
                }}
              >
                <div align="center">
                  <iframe
                    frameBorder="0"
                    height="282px"
                    width="99%"
                    id="l9"
                    src="https://bondintelligence.cloud.looker.com:443/embed/looks/11?allow_login_screen=true/embed_domain=https://bondintelligence.cloud.looker.com"
                  ></iframe>
                </div>
              </Box>
            </FlexItem>

            {/* Recommendation Engine */}
            <FlexItem marginBottom="50px" backgroundColor="#131722">
              <div align="center">
                <Text
                  color="white"
                  fontSize="37px"
                  padding="50px 10px 50px 5px"
                >
                  Here are the recommendations for you today
                </Text>
                <Space height="5vh" />
              </div>
              <Box
                style={{
                  width: '100vw',
                  height: '293px',
                  borderRadius: '5px',
                  backgroundColor: '#3B4346',
                }}
              >
                <div align="center">
                  <iframe
                    frameBorder="0"
                    height="282px"
                    width="99%"
                    id="l15"
                    src="https://bondintelligence.cloud.looker.com/embed/looks/15?allow_login_screen=true/embed_domain=https://bondintelligence.cloud.looker.com"
                  />
                </div>
              </Box>
              <Space p="large" />

              {/* BUTTON GALLERY BELOW
                       wwwwwww
                        wwwww
                         www
                          v            */}

              <Flex flexDirection="column" mr="large">
                {/*TOP THREE BUTTONS*/}
                <Flex justifyContent="space-around" flexWrap="wrap">
                  {/*DASHBOARDS BUTTON*/}
                  <Box style={boxStyle}>
                    <Link
                      href="https://bondintelligence.cloud.looker.com/browse"
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
                        <DashboardsIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text style={{ color: 'white' }}>Dashboards {'>'}</Text>
                      </Flex>
                    </Link>
                  </Box>

                  {/*DATA DICT BUTTON*/}
                  <Box style={boxStyle}>
                    <Link
                      href="https://bondintelligence.cloud.looker.com/extensions/data_dictionary::data-dictionary/"
                      target="_blank"
                      sandbox="allow-scripts allow-modals allow-popups"
                    >
                      {/* <img
                          id="datadict"
                          src="https://marketplace-api.looker.com/visualization-screenshots/calendar_icon.png"
                          height="280"
                          width="350"
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <DataDictionaryIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text style={{ color: 'white' }}>
                          Data Dictionary {'>'}
                        </Text>
                      </Flex>
                    </Link>
                  </Box>

                  {/*MODELS BUTTON*/}
                  <Linker to={ROUTES.MODELS_ROUTE}>
                    <Box style={boxStyle}>
                      {/* <img
                          id="models"
                          src="https://marketplace-api.looker.com/visualization-screenshots/grouped_card_icon.png"
                          height="280"
                          width="350"
                          onMouseOver={cursorHand}
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <ModelsIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={{ color: 'white' }}
                          onMouseOver={underlineText}
                          onMouseLeave={noUnderline}
                        >
                          Models {'>'}
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>
                </Flex>
                <Space height="10vh" />

                {/*MIDDLE THREE BUTTONS*/}
                <Flex justifyContent="space-around" flexWrap="wrap">
                  {/*SCREENER BUTTON*/}
                  <Linker to={ROUTES.SCREENER_ROUTE}>
                    <Box style={boxStyle}>
                      {/* <img
                          id="screener"
                          height="280"
                          width="350"
                          src="https://marketplace-api.looker.com/visualization-screenshots/grouped_card_icon.png"
                          onMouseOver={cursorHand}
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <ScreenerIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={{ color: 'white' }}
                          onMouseOver={underlineText}
                          onMouseLeave={noUnderline}
                        >
                          Screener {'>'}
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*RELVAL BUTTON*/}
                  <Linker to={ROUTES.RELVAL_ROUTE}>
                    <Box style={boxStyle}>
                      {/* <img
                          id="relval"
                          height="280"
                          width="350"
                          src="https://marketplace-api.looker.com/visualization-screenshots/grouped_card_icon.png"
                          onMouseOver={cursorHand}
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <RelValIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={{ color: 'white' }}
                          onMouseOver={underlineText}
                          onMouseLeave={noUnderline}
                        >
                          Relval {'>'}
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*ETRADE BUTTON*/}
                  <Linker to={ROUTES.ETRADE_ROUTE}>
                    <Box style={boxStyle}>
                      {/* <img
                          id="etrade"
                          height="280"
                          width="350"
                          src="https://marketplace-api.looker.com/visualization-screenshots/grouped_card_icon.png"
                          onMouseOver={cursorHand}
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <EtradeIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={{ color: 'white' }}
                          onMouseOver={underlineText}
                          onMouseLeave={noUnderline}
                        >
                          Etrade {'>'}
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>
                </Flex>
                <Space height="10vh" />

                {/*BOTTOM THREE BUTTONS*/}
                <Flex justifyContent="space-around" flexWrap="wrap">
                  {/*INSIGHTS BUTTON*/}
                  <Linker to={ROUTES.INSIGHT_ROUTE}>
                    <Box style={boxStyle}>
                      {/* <img
                          id="insights"
                          height="280"
                          width="350"
                          src="https://marketplace-api.looker.com/visualization-screenshots/grouped_card_icon.png"
                          onMouseOver={cursorHand}
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <InsightsIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={{ color: 'white' }}
                          onMouseOver={underlineText}
                          onMouseLeave={noUnderline}
                        >
                          Insights {'>'}
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*MARKET DATA BUTTON*/}
                  <Linker to={ROUTES.MARKETDATA_ROUTE}>
                    <Box style={boxStyle}>
                      {/* <img
                          id="marketdata"
                          height="280"
                          width="350"
                          src="https://marketplace-api.looker.com/visualization-screenshots/grouped_card_icon.png"
                          onMouseOver={cursorHand}
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <MarketDataIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={{ color: 'white' }}
                          onMouseOver={underlineText}
                          onMouseLeave={noUnderline}
                        >
                          Market Data {'>'}
                        </Text>
                      </Flex>
                    </Box>
                  </Linker>

                  {/*FORECASTS BUTTON*/}
                  <Linker to={ROUTES.FORECAST_ROUTE}>
                    <Box style={boxStyle}>
                      {/* <img
                          id="forecasts"
                          height="280"
                          width="350"
                          src="https://marketplace-api.looker.com/visualization-screenshots/grouped_card_icon.png"
                          onMouseOver={cursorHand}
                        ></img> */}
                      <Flex justifyContent="space-around">
                        <ForecastsIcon style={iconStyle} />
                      </Flex>
                      <Flex justifyContent="space-around">
                        <Text
                          style={{ color: 'white' }}
                          onMouseOver={underlineText}
                          onMouseLeave={noUnderline}
                        >
                          Forecasts {'>'}
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
      </div>
    )
  }
}

export default HomePage
