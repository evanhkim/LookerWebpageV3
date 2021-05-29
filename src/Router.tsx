/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
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

import React, { useEffect, useState, useContext, Suspense, useRef } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Link as Linker, LinkProps } from 'react-router-dom'
import { intersects } from 'semver'
import { Looker40SDK } from '@looker/sdk'
import {
  ComponentsProvider,
  Section,
} from '@looker/components'
import {
  ExtensionContext,
  ExtensionContext2,
  ExtensionContextData2,
} from '@looker/extension-sdk-react'
import { ConfigurationData } from './types'

// Import Class Components that will be rendered from different buttons on webpage
import HomePage from './components/HomePage.js'
import Screener from './components/Screener.js'
import Model from './components/Models.js'
import Etrade from './components/Etrades.js'
import Forecast from './components/Forecasts.js'
import MarketData from './components/MarketDatas.js'
import Relval from './components/RelVals.js'
import Insight from './components/insights.js'
import ScrollToTop from './ScrollToTop.js'

// URL Routes for Routing
export enum ROUTES {
  HOMEPAGE_ROUTE = '/',
  SCREENER_ROUTE = '/screener',
  MODELS_ROUTE = '/models',
  RELVAL_ROUTE = '/relval',
  ETRADE_ROUTE = '/etrade',
  INSIGHT_ROUTE = '/insight',
  MARKETDATA_ROUTE = '/marketdata',
  FORECAST_ROUTE = '/forecast'
}

export const Router = () => {

  // const { core40SDK } = useContext(ExtensionContext)
  // const [message, setMessage] = useState()

  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       const value = await core40SDK.ok(core40SDK.me())
  //       setMessage(
  //         `${value.display_name.split(' ')[0]}, Welcome to Bond Intelligence `
  //       )
  //     } catch (error) {
  //       setMessage('Error occured getting information about me!')
  //       console.error(error)
  //     }
  //   }
  //   initialize()
  // }, [])

  const extensionContext = useContext<ExtensionContextData2<Looker40SDK>>(
    ExtensionContext2
  )
  const { extensionSDK } = extensionContext
  const [canPersistContextData, setCanPersistContextData] = useState<boolean>(
    false
  )
  const [
    configurationData,
    setConfigurationData,
  ] = useState<ConfigurationData>()

  // Getting rid of useEffect() will screw up the format of the Market Overview Looks
  useEffect(() => {

    const initialize = async () => {
      // Context requires Looker version 7.14.0. If not supported provide
      // default configuration object and disable saving of context data.
      let context
      if (
        intersects(
          '>=7.14.0',
          extensionSDK.lookerHostData?.lookerVersion || '7.0.0',
          true
        )
      ) {
        try {
          context = await extensionSDK.getContextData()
          setCanPersistContextData(true)
        } catch (error) {
          console.error(error)
        }
      }
    }
    initialize()
  }, [])

  return (
    <>
      <ComponentsProvider>
        {/* <Section> */}
        {/* This <Suspense> tag is needed to render the second part of Market Overview look (under graph) */}
        <Suspense fallback={<></>}>

          {/* Scroll Function that moves window to top of page before rendering page */}
          <ScrollToTop />
          <Switch>
            <Route path={ROUTES.MODELS_ROUTE}>
              <Model />
            </Route>
            <Route path={ROUTES.SCREENER_ROUTE}>
              <Screener />
            </Route>
            <Route path={ROUTES.RELVAL_ROUTE}>
              <Relval />
            </Route>
            <Route path={ROUTES.ETRADE_ROUTE}>
              <Etrade />
            </Route>
            <Route path={ROUTES.INSIGHT_ROUTE}>
              <Insight />
            </Route>
            <Route path={ROUTES.MARKETDATA_ROUTE}>
              <MarketData />
            </Route>
            <Route path={ROUTES.FORECAST_ROUTE}>
              <Forecast />
            </Route>
            <Route>
              <HomePage />
            </Route>
          </Switch>
        </Suspense>
        {/* </Section> */}
      </ComponentsProvider>
    </>
  )
}