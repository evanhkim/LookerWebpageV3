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

const boxStyle = {
  width: '350px',
  height: '330px',
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
                  <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img>
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
                  <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img>
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
                  <img
                    id="dashboards"
                    src="https://marketplace-api.looker.com/visualization-screenshots/report_table_icon.png"
                    height="280"
                    width="350"
                  ></img>
                  <Flex justifyContent="space-around">
                    <Text style={{ color: 'white' }}>
                      Muni Risk Prediction Model {'>'}
                    </Text>
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

export default Model
