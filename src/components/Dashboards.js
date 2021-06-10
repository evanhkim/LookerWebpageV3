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
import { Link as RouterLink, LinkProps, BrowserRouter } from 'react-router-dom'
import Menu from './Menu.js'

export const bgColor = {
    backgroundColor: "#131722"
}

const boxStyle = {
    width: '400px',
    height: '300px',
    borderRadius: '10px',
    backgroundColor: '#1f2436',
}

export const mainTextColor = {
    color: "#9B9EA3"
}

export const buttonLabelFont = {
    color: "#9B9EA3",
    fontSize: "30",
    textAlign: "center",
    lineHeight: "1.38",
    paddingLeft: "13",
    paddingRight: "13"
}

export const iconStyle = {
    color: '#9B9EA3',
}

const menuBackgroundColor = "#1f2436"

const buttonHighlightColor = "#2A2E39"

function highlightBoxButtonBackground(e) {

    let targ;
    let targetName = e.target.className
    switch (targetName) {
        case "Box-sc-5738oh-0 gKGXwr box0":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box1":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box2":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box3":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box4":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box5":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box6":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box7":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box8":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box9":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box10":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box11":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box12":
            targ = e.target;
            break;
        case "Flex-sc-1ak395a-0 dcdUyk":
            targ = e.target.parentNode.parentNode;
            break;
        default:
            targ = e.target.parentNode.parentNode.parentNode;
            break;
    }

    targ.style.backgroundColor = buttonHighlightColor
    if (targ.children.length > 0) {
        for (let i = 0; i < targ.children.length; i++) {
            targ.children[i].style.backgroundColor = buttonHighlightColor
            if (targ.children[i].children.length > 0) {
                for (let j = 0; j < targ.children[i].children.length; j++) {
                    targ.children[i].children[j].style.backgroundColor = buttonHighlightColor
                    if (targ.children[i].children[j].children.length > 0) {
                        for (let k = 0; k < targ.children[i].children[j].children.length; k++) {
                            targ.children[i].children[j].children[k].style.backgroundColor = buttonHighlightColor
                            if (targ.children[i].children[j].children[k].children.length > 0) {
                                for (let m = 0; m < targ.children[i].children[j].children[k].children.length; m++) {
                                    targ.children[i].children[j].children[k].children[m].style.backgroundColor = buttonHighlightColor
                                    if (targ.children[i].children[j].children[k].children[m].children.length > 0) {
                                        for (let n = 0; n < targ.children[i].children[j].children[k].children[m].children.length; n++) {
                                            targ.children[i].children[j].children[k].children[m].children[n].style.backgroundColor = buttonHighlightColor
                                            if (targ.children[i].children[j].children[k].children[m].children[n].children.length > 0) {
                                                for (let p = p; n < targ.children[i].children[j].children[k].children[m].children[n].children.length; p++) {
                                                    targ.children[i].children[j].children[k].children[m].children[n].children[p].style.backgroundColor = buttonHighlightColor
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function unhighlightBoxButtonBackground(e) {

    let targ;
    let targetName = e.target.className
    switch (targetName) {
        case "Box-sc-5738oh-0 gKGXwr box0":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box1":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box2":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box3":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box4":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box5":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box6":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box7":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box8":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box9":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box10":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box11":
            targ = e.target;
            break;
        case "Box-sc-5738oh-0 gKGXwr box12":
            targ = e.target;
            break;
        case "Flex-sc-1ak395a-0 dcdUyk":
            targ = e.target.parentNode.parentNode;
            break;
        default:
            targ = e.target.parentNode.parentNode.parentNode;
            break;
    }

    targ.style.backgroundColor = menuBackgroundColor
    if (targ.children.length > 0) {
        for (let i = 0; i < targ.children.length; i++) {
            targ.children[i].style.backgroundColor = menuBackgroundColor
            if (targ.children[i].children.length > 0) {
                for (let j = 0; j < targ.children[i].children.length; j++) {
                    targ.children[i].children[j].style.backgroundColor = menuBackgroundColor
                    if (targ.children[i].children[j].children.length > 0) {
                        for (let k = 0; k < targ.children[i].children[j].children.length; k++) {
                            targ.children[i].children[j].children[k].style.backgroundColor = menuBackgroundColor
                            if (targ.children[i].children[j].children[k].children.length > 0) {
                                for (let m = 0; m < targ.children[i].children[j].children[k].children.length; m++) {
                                    targ.children[i].children[j].children[k].children[m].style.backgroundColor = menuBackgroundColor
                                    if (targ.children[i].children[j].children[k].children[m].children.length > 0) {
                                        for (let n = 0; n < targ.children[i].children[j].children[k].children[m].children.length; n++) {
                                            targ.children[i].children[j].children[k].children[m].children[n].style.backgroundColor = menuBackgroundColor
                                            if (targ.children[i].children[j].children[k].children[m].children[n].children.length > 0) {
                                                for (let p = p; n < targ.children[i].children[j].children[k].children[m].children[n].children.length; p++) {
                                                    targ.children[i].children[j].children[k].children[m].children[n].children[p].style.backgroundColor = menuBackgroundColor
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function underlineText(e) {
    e.target.style.textDecoration = 'underline'
    e.target.style.textDecorationColor = '#016CC7'
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

class Dashboards extends React.Component {

    render() {
        return (

            <ComponentsProvider>
                <Menu />
                <Space style={bgColor} p="xxxxxlarge" width="100%" height="25vh" around>
                    <Text p="xxxxxlarge" fontSize="xxxxxlarge" color="#9B9EA3">
                        Dashboards
                    </Text>
                </Space>

                <Flex flexDirection="column" mr="10" style={{ backgroundColor: "#131722" }} width="100%">
                    {/*ROW 1*/}
                    <Flex justifyContent="space-around" flexWrap="wrap">
                        {/*BoardEx BUTTON*/}
                        <Box className="box0" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/17?Company%20Name=&filter_config=%7B%22Company%20Name%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%22%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1YDJFLmMSGbaVEu1TGYBJWh6bDP5dsF0V"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont}>
                                        BoardEx
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Bond Intelligence Insights BUTTON*/}
                        <Box className="box1" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/6?CUSIP=035824AN1&filter_config=%7B%22CUSIP%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%22035824AN1%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1tWwdqJYoLk4QEEcLoWDn5i4ZpCJkjbi-"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around" alignContent="center">
                                    <Text style={buttonLabelFont}>
                                        Bond Intelligence Insights
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Corp Forecast BUTTON*/}
                        <Box className="box2" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/29?CUSIP=36962GXZ2&filter_config=%7B%22CUSIP%22:%5B%7B%22type%22:%22advanced%22,%22values%22:%5B%7B%22constant%22:%2236962GXZ2%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >

                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1XqEQsNZQQxO3nsjs8DtCkR6cZ5WdpFUI"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Corp Forecast
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>
                    </Flex>
                    <Space height="10vh" />

                    {/*Row 2*/}
                    <Flex justifyContent="space-around" flexWrap="wrap">
                        {/*Corporate Bond Issuance BUTTON*/}
                        <Box className="box3" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/10?edit=true&Complete%20CUSIP=00077DAF6&filter_config=%7B%22Complete%20CUSIP%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%2200077DAF6%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1px6zqxNbzvbAGIDjT-3-ha-EfIoRFRNI"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Corporate Bond Issuance
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Corporate Bond Redemption BUTTON*/}
                        <Box className="box4" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/7?CUSIP=247367AX3&filter_config=%7B%22CUSIP%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%22247367AX3%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1ZLj6-B9EJ7n1AFCLfSrFeKGR3s_aC5dv"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "10"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Corporate Bond Redemption
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Corporate Bond Trades BUTTON*/}
                        <Box className="box5" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/22?Cusip=02079KAC1&filter_config=%7B%22Cusip%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%2202079KAC1%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=162u8DQ7qWWJYY09kIckzwauaw7q9fH56"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Corporate Bond Trades
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>
                    </Flex>
                    <Space height="10vh" />

                    {/*Row 3*/}
                    <Flex justifyContent="space-around" flexWrap="wrap">
                        {/*Corporate Bond Trades - TRACE BUTTON*/}
                        <Box className="box6" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/9?CUSIP=38259PAB8&filter_config=%7B%22CUSIP%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%2238259PAB8%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1pwT868NRiTszfz09611zihknIgHXnidu"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "10"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Corporate Bond Trades - TRACE
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Corporate Financial Fundamentals BUTTON*/}
                        <Box className="box7" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/12?edit=true&Cusip=000361105&Datadate%20Year=2017&filter_config=%7B%22Cusip%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%22000361105%22%7D,%7B%7D%5D,%22id%22:4%7D%5D,%22Datadate%20Year%22:%5B%7B%22type%22:%22year%22,%22values%22:%5B%7B%22constant%22:%222017%22%7D,%7B%7D%5D,%22id%22:5%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1f1UpVjMlVOtm77CuBAUlh5-uWKYnmidx"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "10"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Corporate Financial Fundamentals
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Corporate Financial Ratios BUTTON*/}
                        <Box className="box8" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/10?Cusip=00036110&filter_config=%7B%22Cusip%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%2200036110%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1-cTb8kbbEbd6P_CHqJ0ddVYVumdcoUwm"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Corporate Financial Ratios
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>
                        <Space height="10vh" />
                    </Flex>

                    {/* ROW 4 */}
                    <Flex justifyContent="space-around" flexWrap="wrap">
                        {/*Muni Forecast BUTTON*/}
                        <Box className="box9" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/28?edit=true&CUSIP%20Parameter=01757LFH4&filter_config=%7B%22CUSIP%20Parameter%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%2201757LFH4%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >

                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1D645Z_qHkun__ejNqG0tGbJYB7I6Esbq"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Muni Forecast
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Municipal Bond Issuances BUTTON*/}
                        <Box className="box10" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/14?edit=true&cusip=09845N&filter_config=%7B%22cusip%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%2209845N%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1LpUx7Z29Yz7o-XT74TfZdk9Mx962bnJe"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Municipal Bond Issuances
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>

                        {/*Municipal Bond Trades BUTTON*/}
                        <Box className="box11" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/16?edit=true&CUSIP=00037CKQ2&filter_config=%7B%22CUSIP%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%2200037CKQ2%22%7D,%7B%7D%5D,%22id%22:2%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1P6RaxlIiAEDGrZjfNNlaXJbZDy2jC9vJ"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Municipal Bond Trades
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>
                        <Space height="10vh" />
                    </Flex>

                    {/* ROW 5 */}
                    <Flex justifyContent="space-around" flexWrap="wrap">
                        {/*Sentiment Analysis BUTTON*/}
                        <Box className="box12" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground}>
                            <Link
                                href="https://bondintelligence.cloud.looker.com/embed/dashboards/11?edit=true&Entity%20Name=%22Texas,%20TX,%20US%22&News%20Story%20ID=&filter_config=%7B%22Entity%20Name%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%22Texas%5C%5C,%20TX%5C%5C,%20US%22%7D,%7B%7D%5D,%22id%22:4%7D%5D,%22News%20Story%20ID%22:%5B%7B%22type%22:%22%3D%22,%22values%22:%5B%7B%22constant%22:%22%22%7D,%7B%7D%5D,%22id%22:5%7D%5D%7D"
                                target="_blank"
                                sandbox="allow-scripts allow-modals allow-popups"
                            >
                                <Flex justifyContent="space-around">
                                    <img
                                        id="BoardEx"
                                        width="360"
                                        height="170"
                                        src="https://drive.google.com/uc?id=1TNXsg07ZvhL5-7y1Lue74ce1zp6j9SSz"
                                        style={{
                                            marginTop: "25",
                                            marginBottom: "30"
                                        }}
                                    />
                                </Flex>
                                <Flex justifyContent="space-around">
                                    <Text style={buttonLabelFont} onMouseOver={underlineText} onMouseLeave={noUnderline}>
                                        Sentiment Analysis
                                    </Text>
                                </Flex>
                            </Link>
                        </Box>
                    </Flex>

                    <Space style={bgColor} height="100px" />
                </Flex>
            </ComponentsProvider>
        )
    }
}

export default Dashboards;