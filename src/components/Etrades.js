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

import React, { useEffect, useState, useMemo, useContext, Component } from 'react'
import { ExtensionContext } from '@looker/extension-sdk-react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { iconStyle } from './HomePage.js';
import { PriceCheck } from '@styled-icons/material';
import { PriceChange } from '@styled-icons/material';
import { Close } from '@styled-icons/evaicons-solid';
import Modal from 'react-modal';
import {
  Select,
  InputText,
  Button,
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

const menuBackgroundColor = "#1f2436"

const buttonHighlightColor = "#2A2E39"

function traverseDescendants(node, highlightColor) {

  node.style.backgroundColor = highlightColor
  if (node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      traverseDescendants(node.children[i], highlightColor)
    }
  }
}

function highlightBoxButtonBackground(e) {

  let targ;
  let targetName = e.target.className
  if (e.target.className.baseVal === undefined) {
    switch (e.target.className.substring((e.target.className.length - 4), e.target.className.length)) {
      case "box0":
        targ = e.target;
        break;
      case "box1":
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
    targ = e.target.parentNode.parentNode.parentNode
  }

  if (targ.className.substring(0, 4) === "Link") {
    targ = targ.parentNode
  }

  traverseDescendants(targ, buttonHighlightColor)
}

function unhighlightBoxButtonBackground(e) {

  let targ;
  let targetName = e.target.className
  if (e.target.className.baseVal === undefined) {
    switch (e.target.className.substring((e.target.className.length - 4), e.target.className.length)) {
      case "box0":
        targ = e.target;
        break;
      case "box1":
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
    targ = e.target.parentNode.parentNode.parentNode
  }

  if (targ.className.substring(0, 4) === "Link") {
    targ = targ.parentNode
  }

  traverseDescendants(targ, menuBackgroundColor)
}

const CUSIP_list = ["036015PL3", "036054BG8", "036054AN4", "036015PN9", "036054BM5", "036054BQ6", "036015PG4", "036090CA4", "036090CH9", "036090BW7", "036054AM6", "036090BV9", "036054BL7", "036015PM1", "036054AK0", "036054BP8", "036015PJ8", "036015PA7", "036015PH2", "036015NV3", "036054AL8", "036054AF1", "036015PD1", "036015PC3", "036054AG9", "036015PK5", "036054AY0", "036054AV6", "036054AJ3", "036054AH7", "036054BD5", "036054BB9", "036054BJ2", "036054AZ7", "036090CC0", "036090CG1", "036054AW4", "036090CJ5", "036090CB2", "036054AX2", "036090BY3", "036054AE4", "033393HG7", "033393HH5", "033393HZ5", "033393HY8", "033393HL6", "033393JN0", "033393JF7", "033393HQ5", "033455BC9", "033393HB8", "033393HF9", "033393HP7", "033393HJ1", "033393FS3", "033393HV4", "033393JJ9", "033393GH6", "033393FT1", "033393FR5", "033393HT9", "033393HR3", "033393HN2", "033452AD5", "033455BB1", "033393HM4", "033393JC4", "033393FY0", "033393JH3", "033455AY2", "033470BB0", "033393HK8", "033393JD2", "033393JG5", "033393GR4", "033393GE3", "033455AS5", "033393JM2", "033455BA3", "033393HX0", "033470BD6", "033393HW2", "033393JE0", "033455AV8", "033393HD4", "033393JL4", "033470BQ7", "033470BM6", "033470BW4", "033470AY1", "033470BP9", "033455BK1", "033470BE4", "033470BK0", "033470BV6", "033470BJ3", "033393GW3", "033393FV6", "033393GU7", "033470BS3", "033470BX2", "033393KD0", "033393JT7", "033393KL2", "033393JX8", "033393KK4", "033393FZ7", "033393KC2", "033393JP5", "033393GL7", "033393KG3", "033393GB9", "033393KB4", "033470BC8", "033393FU8", "033393KJ7", "033393JW0", "033393JR1", "033393JY6", "033393JQ3", "033393KF5", "010399AQ6", "01039WAZ5", "010399CS0", "010399CR2", "01039VAP9", "01039VAJ3", "01039VAD6", "010399BY8", "01039VAM6", "010399BX0", "010399CA9", "010399CQ4", "010230LD0", "010230LB4", "010230LE8", "010230KZ2", "010230KV1", "010230KW9", "010230LH1", "010230KX7", "013122SY3", "013122TC0", "013122TB2", "013122TE6", "013122QR0", "013122TG1", "013122SH0", "013141BM7", "038447ME5", "013122TD8", "013122TH9", "013141BU9", "013122UA2", "013122TF3", "013122SZ0", "013122SE7", "013122ST4", "013122TA4", "013141CV6", "013122SL1", "013141BS4", "013122SQ0", "013122QT6", "013141CZ7", "038447MT2", "013141DH6", "013122NU6", "013141CR5", "038439FH3", "013122TT3", "013122RE8", "013122TY2", "013141BT2", "038429KG0", "013122QY5", "013122TW6", "013122SG2", "013122TX4", "013141BY1", "013122SS6", "013122TS5", "013122QP4", "013141BQ8", "013122SW7", "013122SF4", "013122SM9", "013122SP2", "013122SD9", "013122QM1", "013122QQ2", "013122NN2", "013141BN5", "013122NW2", "013122QF6", "038433AH1", "038447MV7", "013122QU3", "038447MK1", "00072AAA8", "00083G7E8", "00083GRK2", "00083JAE8", "00083JAF5", "00083JDN5", "00083JEF1", "00083JES3", "00083JGR3", "00083JJV1", "00083JKM9", "00083JNP9", "00102EAA4", "00103XAC7", "001055AH5", "00163MAA2", "00175KAC8", "00176LDK4", "00176LDN8", "00176LDP3", "00176LDV0", "00176LEC1", "00185WAB2", "001957BE8", "001957BJ7", "00206RAM4", "00206RCA8", "00206RCC4", "00206RCW0", "00206RGJ5", "00206RHC9", "00209UAD4", "00209UAE2", "00209UAF9", "002546265", "002546349", "002546364", "002546414", "002546554", "00254ELY6", "00254EMT6", "002799AK0", "002824AK6", "002824BJ8", "00287YAG4", "00287YAK5", "00287YAN9", "003669AB4", "003831AG9", "004398AE3", "00439TAE7", "00440EAJ6", "004446AD2", "00507UAM3", "00687BAA3", "00753CAD4", "007634AA6", "00763MAN8", "007643AB5", "00772BAB7", "00817YAL2", "008252AG3", "00826KAC1", "00828DAN1", "00846UAD3", "008674AB9", "00912XAF1", "00912XAH7", "00912XAJ3", "00912XAL8", "00912XAS3", "009363AB8", "009363AG7", "009363AN2", "009367AD5", "01019A344", "01019A476", "01019A567", "01019A583", "01019A617", "01019A690", "01019M561", "01019M777", "01019MAC2", "01020G231", "01020G249", "01020G256", "01020G264", "01020G272", "01020G280", "01020G322", "01020G330", "01020G348", "01020G355", "01020G363", "01020G371", "01020G389", "01020G397", "01020G470", "010392EY0", "011588AB6", "011588AD2", "011588AE0", "014383AA1", "014383AC7", "01447UAA0", "01566MAB1", "016275AN9", "018581AD0", "018606AD5", "018803AE6", "018803AG1", "01958XBD8", "02003MAA2", "02003MBQ6", "020040AB7", "02005NAF7", "02005NAR1", "02005NAT7", "02005NAU4", "02005NBB5", "02051PAC2", "02209SAD5", "02209SAK9", "02265QAA6", "023586AJ9", "023608AE2", "023663AB3", "02376XAA7", "02377AAA6", "02503YAF0", "025537AF8", "025816BA6", "025816BG3", "025816BW8", "025818EM3", "0258M0BY4", "0258M0CW7", "0258M0CZ0", "0258M0DJ5", "0258M0EE5", "0258M0EG0", "02635PSP9", "02635PSQ7", "02635PSS3", "02635PTQ6", "026375AE5", "026375AM7", "02665WAB7", "02665WAC5", "02665WAT8", "02665WAV3", "02665WAW1", "02665WBK6", "02665WCE9", "026874AT4", "02687QBW7", "027126AC5", "029717AM7", "030096AH4", "03027XAC4", "03040WAB1", "03070QAF8", "031042AB0", "031162AG5", "031162AJ9", "032092AC2", "032095AG6", "03234AAC3", "032359AE1", "032420AC5", "032511BD8", "032803AB4", "03444RAA6", "034918AC6", "03512TAC5", "035229CA9", "035242AC0", "035242AD8", "03734PAC5", "037411AT2", "037411AU9", "037735CQ8", "037833AQ3", "037833BN9", "037833BQ2", "037833CB4", "03834AAA1", "038374AB0", "03841XAB0", "038522AG3", "038923AD0", "03938LAS3", "03938LAT1", "03938LAU8", "039483AH5", "04351LAA8", "04420QAD8", "04454CCB0", "04454CCW4"]
const CUSIP_options = [{ value: "036015PL3" }, { value: "036054BG8" }, { value: "036054AN4" }, { value: "036015PN9" }, { value: "036054BM5" }, { value: "036054BQ6" }, { value: "036015PG4" }, { value: "036090CA4" }, { value: "036090CH9" }, { value: "036090BW7" }, { value: "036054AM6" }, { value: "036090BV9" }, { value: "036054BL7" }, { value: "036015PM1" }, { value: "036054AK0" }, { value: "036054BP8" }, { value: "036015PJ8" }, { value: "036015PA7" }, { value: "036015PH2" }, { value: "036015NV3" }, { value: "036054AL8" }, { value: "036054AF1" }, { value: "036015PD1" }, { value: "036015PC3" }, { value: "036054AG9" }, { value: "036015PK5" }, { value: "036054AY0" }, { value: "036054AV6" }, { value: "036054AJ3" }, { value: "036054AH7" }, { value: "036054BD5" }, { value: "036054BB9" }, { value: "036054BJ2" }, { value: "036054AZ7" }, { value: "036090CC0" }, { value: "036090CG1" }, { value: "036054AW4" }, { value: "036090CJ5" }, { value: "036090CB2" }, { value: "036054AX2" }, { value: "036090BY3" }, { value: "036054AE4" }, { value: "033393HG7" }, { value: "033393HH5" }, { value: "033393HZ5" }, { value: "033393HY8" }, { value: "033393HL6" }, { value: "033393JN0" }, { value: "033393JF7" }, { value: "033393HQ5" }, { value: "033455BC9" }, { value: "033393HB8" }, { value: "033393HF9" }, { value: "033393HP7" }, { value: "033393HJ1" }, { value: "033393FS3" }, { value: "033393HV4" }, { value: "033393JJ9" }, { value: "033393GH6" }, { value: "033393FT1" }, { value: "033393FR5" }, { value: "033393HT9" }, { value: "033393HR3" }, { value: "033393HN2" }, { value: "033452AD5" }, { value: "033455BB1" }, { value: "033393HM4" }, { value: "033393JC4" }, { value: "033393FY0" }, { value: "033393JH3" }, { value: "033455AY2" }, { value: "033470BB0" }, { value: "033393HK8" }, { value: "033393JD2" }, { value: "033393JG5" }, { value: "033393GR4" }, { value: "033393GE3" }, { value: "033455AS5" }, { value: "033393JM2" }, { value: "033455BA3" }, { value: "033393HX0" }, { value: "033470BD6" }, { value: "033393HW2" }, { value: "033393JE0" }, { value: "033455AV8" }, { value: "033393HD4" }, { value: "033393JL4" }, { value: "033470BQ7" }, { value: "033470BM6" }, { value: "033470BW4" }, { value: "033470AY1" }, { value: "033470BP9" }, { value: "033455BK1" }, { value: "033470BE4" }, { value: "033470BK0" }, { value: "033470BV6" }, { value: "033470BJ3" }, { value: "033393GW3" }, { value: "033393FV6" }, { value: "033393GU7" }, { value: "033470BS3" }, { value: "033470BX2" }, { value: "033393KD0" }, { value: "033393JT7" }, { value: "033393KL2" }, { value: "033393JX8" }, { value: "033393KK4" }, { value: "033393FZ7" }, { value: "033393KC2" }, { value: "033393JP5" }, { value: "033393GL7" }, { value: "033393KG3" }, { value: "033393GB9" }, { value: "033393KB4" }, { value: "033470BC8" }, { value: "033393FU8" }, { value: "033393KJ7" }, { value: "033393JW0" }, { value: "033393JR1" }, { value: "033393JY6" }, { value: "033393JQ3" }, { value: "033393KF5" }, { value: "010399AQ6" }, { value: "01039WAZ5" }, { value: "010399CS0" }, { value: "010399CR2" }, { value: "01039VAP9" }, { value: "01039VAJ3" }, { value: "01039VAD6" }, { value: "010399BY8" }, { value: "01039VAM6" }, { value: "010399BX0" }, { value: "010399CA9" }, { value: "010399CQ4" }, { value: "010230LD0" }, { value: "010230LB4" }, { value: "010230LE8" }, { value: "010230KZ2" }, { value: "010230KV1" }, { value: "010230KW9" }, { value: "010230LH1" }, { value: "010230KX7" }, { value: "013122SY3" }, { value: "013122TC0" }, { value: "013122TB2" }, { value: "013122TE6" }, { value: "013122QR0" }, { value: "013122TG1" }, { value: "013122SH0" }, { value: "013141BM7" }, { value: "038447ME5" }, { value: "013122TD8" }, { value: "013122TH9" }, { value: "013141BU9" }, { value: "013122UA2" }, { value: "013122TF3" }, { value: "013122SZ0" }, { value: "013122SE7" }, { value: "013122ST4" }, { value: "013122TA4" }, { value: "013141CV6" }, { value: "013122SL1" }, { value: "013141BS4" }, { value: "013122SQ0" }, { value: "013122QT6" }, { value: "013141CZ7" }, { value: "038447MT2" }, { value: "013141DH6" }, { value: "013122NU6" }, { value: "013141CR5" }, { value: "038439FH3" }, { value: "013122TT3" }, { value: "013122RE8" }, { value: "013122TY2" }, { value: "013141BT2" }, { value: "038429KG0" }, { value: "013122QY5" }, { value: "013122TW6" }, { value: "013122SG2" }, { value: "013122TX4" }, { value: "013141BY1" }, { value: "013122SS6" }, { value: "013122TS5" }, { value: "013122QP4" }, { value: "013141BQ8" }, { value: "013122SW7" }, { value: "013122SF4" }, { value: "013122SM9" }, { value: "013122SP2" }, { value: "013122SD9" }, { value: "013122QM1" }, { value: "013122QQ2" }, { value: "013122NN2" }, { value: "013141BN5" }, { value: "013122NW2" }, { value: "013122QF6" }, { value: "038433AH1" }, { value: "038447MV7" }, { value: "013122QU3" }, { value: "038447MK1" }, { value: "00072AAA8" }, { value: "00083G7E8" }, { value: "00083GRK2" }, { value: "00083JAE8" }, { value: "00083JAF5" }, { value: "00083JDN5" }, { value: "00083JEF1" }, { value: "00083JES3" }, { value: "00083JGR3" }, { value: "00083JJV1" }, { value: "00083JKM9" }, { value: "00083JNP9" }, { value: "00102EAA4" }, { value: "00103XAC7" }, { value: "001055AH5" }, { value: "00163MAA2" }, { value: "00175KAC8" }, { value: "00176LDK4" }, { value: "00176LDN8" }, { value: "00176LDP3" }, { value: "00176LDV0" }, { value: "00176LEC1" }, { value: "00185WAB2" }, { value: "001957BE8" }, { value: "001957BJ7" }, { value: "00206RAM4" }, { value: "00206RCA8" }, { value: "00206RCC4" }, { value: "00206RCW0" }, { value: "00206RGJ5" }, { value: "00206RHC9" }, { value: "00209UAD4" }, { value: "00209UAE2" }, { value: "00209UAF9" }, { value: "002546265" }, { value: "002546349" }, { value: "002546364" }, { value: "002546414" }, { value: "002546554" }, { value: "00254ELY6" }, { value: "00254EMT6" }, { value: "002799AK0" }, { value: "002824AK6" }, { value: "002824BJ8" }, { value: "00287YAG4" }, { value: "00287YAK5" }, { value: "00287YAN9" }, { value: "003669AB4" }, { value: "003831AG9" }, { value: "004398AE3" }, { value: "00439TAE7" }, { value: "00440EAJ6" }, { value: "004446AD2" }, { value: "00507UAM3" }, { value: "00687BAA3" }, { value: "00753CAD4" }, { value: "007634AA6" }, { value: "00763MAN8" }, { value: "007643AB5" }, { value: "00772BAB7" }, { value: "00817YAL2" }, { value: "008252AG3" }, { value: "00826KAC1" }, { value: "00828DAN1" }, { value: "00846UAD3" }, { value: "008674AB9" }, { value: "00912XAF1" }, { value: "00912XAH7" }, { value: "00912XAJ3" }, { value: "00912XAL8" }, { value: "00912XAS3" }, { value: "009363AB8" }, { value: "009363AG7" }, { value: "009363AN2" }, { value: "009367AD5" }, { value: "01019A344" }, { value: "01019A476" }, { value: "01019A567" }, { value: "01019A583" }, { value: "01019A617" }, { value: "01019A690" }, { value: "01019M561" }, { value: "01019M777" }, { value: "01019MAC2" }, { value: "01020G231" }, { value: "01020G249" }, { value: "01020G256" }, { value: "01020G264" }, { value: "01020G272" }, { value: "01020G280" }, { value: "01020G322" }, { value: "01020G330" }, { value: "01020G348" }, { value: "01020G355" }, { value: "01020G363" }, { value: "01020G371" }, { value: "01020G389" }, { value: "01020G397" }, { value: "01020G470" }, { value: "010392EY0" }, { value: "011588AB6" }, { value: "011588AD2" }, { value: "011588AE0" }, { value: "014383AA1" }, { value: "014383AC7" }, { value: "01447UAA0" }, { value: "01566MAB1" }, { value: "016275AN9" }, { value: "018581AD0" }, { value: "018606AD5" }, { value: "018803AE6" }, { value: "018803AG1" }, { value: "01958XBD8" }, { value: "02003MAA2" }, { value: "02003MBQ6" }, { value: "020040AB7" }, { value: "02005NAF7" }, { value: "02005NAR1" }, { value: "02005NAT7" }, { value: "02005NAU4" }, { value: "02005NBB5" }, { value: "02051PAC2" }, { value: "02209SAD5" }, { value: "02209SAK9" }, { value: "02265QAA6" }, { value: "023586AJ9" }, { value: "023608AE2" }, { value: "023663AB3" }, { value: "02376XAA7" }, { value: "02377AAA6" }, { value: "02503YAF0" }, { value: "025537AF8" }, { value: "025816BA6" }, { value: "025816BG3" }, { value: "025816BW8" }, { value: "025818EM3" }, { value: "0258M0BY4" }, { value: "0258M0CW7" }, { value: "0258M0CZ0" }, { value: "0258M0DJ5" }, { value: "0258M0EE5" }, { value: "0258M0EG0" }, { value: "02635PSP9" }, { value: "02635PSQ7" }, { value: "02635PSS3" }, { value: "02635PTQ6" }, { value: "026375AE5" }, { value: "026375AM7" }, { value: "02665WAB7" }, { value: "02665WAC5" }, { value: "02665WAT8" }, { value: "02665WAV3" }, { value: "02665WAW1" }, { value: "02665WBK6" }, { value: "02665WCE9" }, { value: "026874AT4" }, { value: "02687QBW7" }, { value: "027126AC5" }, { value: "029717AM7" }, { value: "030096AH4" }, { value: "03027XAC4" }, { value: "03040WAB1" }, { value: "03070QAF8" }, { value: "031042AB0" }, { value: "031162AG5" }, { value: "031162AJ9" }, { value: "032092AC2" }, { value: "032095AG6" }, { value: "03234AAC3" }, { value: "032359AE1" }, { value: "032420AC5" }, { value: "032511BD8" }, { value: "032803AB4" }, { value: "03444RAA6" }, { value: "034918AC6" }, { value: "03512TAC5" }, { value: "035229CA9" }, { value: "035242AC0" }, { value: "035242AD8" }, { value: "03734PAC5" }, { value: "037411AT2" }, { value: "037411AU9" }, { value: "037735CQ8" }, { value: "037833AQ3" }, { value: "037833BN9" }, { value: "037833BQ2" }, { value: "037833CB4" }, { value: "03834AAA1" }, { value: "038374AB0" }, { value: "03841XAB0" }, { value: "038522AG3" }, { value: "038923AD0" }, { value: "03938LAS3" }, { value: "03938LAT1" }, { value: "03938LAU8" }, { value: "039483AH5" }, { value: "04351LAA8" }, { value: "04420QAD8" }, { value: "04454CCB0" }, { value: "04454CCW4" }]

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1c2030",
    color: "#8a8d96",
    fontSize: 20,
    fontWeight: 500,
  },
  body: {
    fontSize: 14,
    color: "#b4b7c0"
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#131722",
    color: "#b4b7c0"
  },
}))(TableRow);

const boxStyle = {
  width: '23vw',
  height: '390px',
  borderRadius: '10px',
  backgroundColor: '#1f2436',
}

function cursorHand(e) {
  e.target.style.cursor = 'pointer'
}

var currentdate = new Date()
var min = currentdate.getMinutes()
if (min < 10) {
  min = '0' + min
}
var sec = currentdate.getSeconds()
if (sec < 10) {
  sec = '0' + sec
}

export const bgColor = {
  backgroundColor: "#131722"
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
  min + ':' + sec

// class Etrade extends React.Component {
const Etrade = () => {

  function displayLiveData() {
    console.log(showCUSIP)
    if (selectedCUSIP.length > 0) {
      setCount(count + 10)
      var livedate = new Date()
      var livemin = livedate.getMinutes()
      var livesec = livedate.getSeconds()
      if (livemin < 10) {
        livemin = '0' + livemin
      }
      if (livesec < 10) {
        livesec = '0' + livesec
      }
      var newDatetime =
        'As of ' +
        (currentdate.getMonth() + 1) +
        '/' +
        currentdate.getDate() +
        '/' +
        currentdate.getFullYear() +
        ' at ' +
        currentdate.getHours() +
        ':' +
        livemin + ':' + livesec
      setLiveTimeStamp(newDatetime)
      console.log("Button_Pressed")
      setShowCUSIP(selectedCUSIP)
    }
  };
  const [priceMaker, setPriceMaker] = useState(false)
  const [priceTaker, setPriceTaker] = useState(false)
  const [showCUSIP, setShowCUSIP] = useState("");
  const [count, setCount] = useState(0);
  const [liveTimestamp, setLiveTimeStamp] = useState("");
  const [selectedCUSIP, setSelectedCUSIP] = useState("");

  function changePriceMaker() {
    setPriceMaker(!priceMaker)
  }

  function changePriceTaker() {
    setPriceTaker(!priceTaker)
  }
  return (
    <>
      <ComponentsProvider>
        <Menu />
        <Space p="large" width="100%" height="25vh" around style={bgColor}>
          <Text p="xxxxxlarge" fontSize="xxxxxlarge" color='#9B9EA3'>
            Etrade Page
            </Text>
        </Space>
        {/* Part 1 */}
        <Box style={bgColor}>
          <Flex justifyContent="center" style={bgColor}>
            <Flex flexDirection="column" pr="xxxlarge" style={bgColor}>
              <Select
                maxWidth={200}
                placeholder="Bond CUSIP Value"
                onChange={setSelectedCUSIP}
                options={CUSIP_options}
                isClearable
                value={selectedCUSIP}
                isFilterable
                showCreate
              />
              <Flex justifyContent="center" style={bgColor}>
                <Box my="medium" >
                  <button
                    style={{
                      border: 'none',
                      backgroundColor: '#2A2E39',
                      fontSize: '16px',
                      color: '#9B9EA3',
                      padding: '15px 32px',
                    }}
                    id="homepage"
                    onClick={displayLiveData}
                    onMouseOver={cursorHand}>View Market Data</button>
                </Box>
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <TableContainer component={Paper}>
                <Table style={{ border: '1px solid white' }}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>CUSIP</StyledTableCell>
                      <StyledTableCell>Bid</StyledTableCell>
                      <StyledTableCell>Ask</StyledTableCell>
                      <StyledTableCell>Timestamp</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell>{showCUSIP}</StyledTableCell>
                      <StyledTableCell>{count}</StyledTableCell>
                      <StyledTableCell>{count}</StyledTableCell>
                      <StyledTableCell>{liveTimestamp}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Flex>
          </Flex>
        </Box>
        <Space height="50px" style={bgColor} />
        {/* Part 2 */}
        <Flex justifyContent="space-around" flexWrap="wrap" style={bgColor}>
          <Box className="box0" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground} >
            <Modal isOpen={priceMaker} style={{ overlay: { backgroundColor: '#1c2030' }, content: { outline: 'none' } }}>
              <Flex justifyContent="flex-end">
                <Button maxwidth color="critical" onClick={changePriceMaker} onMouseOver={cursorHand}><Close /></Button>
              </Flex>
              <Space height="25px" />
              <iframe width="99%" height="100%" frameBorder="0" src="https://testlab.transficc.io/" />
            </Modal>
            <Link
              // href="https://testlab.transficc.io/"
              target="_blank"
              sandbox="allow-scripts allow-modals allow-popups"
              style={{ textDecorationColor: "#3281C5" }}
            >
              <Flex justifyContent="space-around">
                <PriceChange style={iconStyle} size="340" />
              </Flex>
              <Flex justifyContent="space-around">
                <Text style={{ color: '#9B9EA3', fontSize: "30" }}>
                  Price Maker {'>'}
                </Text>
              </Flex>
            </Link>
          </Box>
          <Box className="box1" style={boxStyle} onMouseEnter={highlightBoxButtonBackground} onMouseLeave={unhighlightBoxButtonBackground} >
            <Modal isOpen={priceTaker} style={{ overlay: { backgroundColor: '#1c2030' }, content: { outline: 'none' } }}>
              <Flex justifyContent="flex-end">
                <Button maxwidth color="critical" onClick={changePriceTaker} onMouseOver={cursorHand}><Close /></Button>
              </Flex>
              <Space height="25px" />
              <iframe width="99%" height="100%" frameBorder="0" src="https://testlab.transficc.io/priceTaker" />
            </Modal>
            <Link
              // href="https://testlab.transficc.io/priceTaker"
              target="_blank"
              sandbox="allow-scripts allow-modals allow-popups"
              style={{ textDecorationColor: "#3281C5" }}
            >
              <Flex justifyContent="space-around">
                <PriceCheck style={iconStyle} size="340" />
              </Flex>
              <Flex justifyContent="space-around">
                <Text style={{ color: '#9B9EA3', fontSize: "30" }}>
                  Price Taker {'>'}
                </Text>
              </Flex>
            </Link>
          </Box>
        </Flex>
        {/* Part 3 *Sorry for the formatting* */}
        <Space height="50px" style={bgColor} />
        <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Venue</StyledTableCell>
                  <StyledTableCell>Asset</StyledTableCell>
                  <StyledTableCell>Adaptor</StyledTableCell>
                  <StyledTableCell>Feature</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>BGC CREDIT</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>BGC CREDIT</StyledTableCell>
                  <StyledTableCell>MARKET DATA TOP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BGC CREDIT</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>BGC CREDIT</StyledTableCell>
                  <StyledTableCell>STATIC DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BGC TRADER</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BGC TRADER</StyledTableCell>
                  <StyledTableCell>MARKET DATA TOP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BGC TRADER</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BGC TRADER</StyledTableCell>
                  <StyledTableCell>STATIC DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BITTREX (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Crypto</StyledTableCell>
                  <StyledTableCell>REFINITIV BITTREX BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG BONDS</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BLOOMBERG BONDS PC</StyledTableCell>
                  <StyledTableCell>PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG BONDS</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BLOOMBERG BONDS TRADING</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG BONDS</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BLOOMBERG BONDS TRADING</StyledTableCell>
                  <StyledTableCell>CAT</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG BONDS</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BLOOMBERG BONDS TRADING</StyledTableCell>
                  <StyledTableCell>PROCESS TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG BONDS</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BLOOMBERG BONDS TRADING</StyledTableCell>
                  <StyledTableCell>BOLT</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>COMPRESSIONS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>PROCESS TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>CAT</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS PC</StyledTableCell>
                  <StyledTableCell>PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>MAC IMM ROLL</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>RFM</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>RFS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>BLOOMBERG IRS TRADING</StyledTableCell>
                  <StyledTableCell>FUTURE SPREAD</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BLOOMBERG VCON</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>BLOOMBERG VCON</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BONDEVALUE BRIDGE (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>BONDEVALUE REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BROKERTEC EU</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BROKERTEC EU</StyledTableCell>
                  <StyledTableCell>ORDERS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BROKERTEC EU</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BROKERTEC EU</StyledTableCell>
                  <StyledTableCell>QUOTES</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BROKERTEC EU LEGACY</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BROKERTEC EU LEGACY</StyledTableCell>
                  <StyledTableCell>ORDERS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BROKERTEC EU LEGACY</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>BROKERTEC EU LEGACY</StyledTableCell>
                  <StyledTableCell>QUOTES</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BROKERTEC QUOTE</StyledTableCell>
                  <StyledTableCell>Repo</StyledTableCell>
                  <StyledTableCell>BROKERTEC QUOTE POST TRADE</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BROKERTEC STREAM BRIDGE</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>BROKERTEC STREAM BRIDGE</StyledTableCell>
                  <StyledTableCell>PROTOCOL INTEGRATION</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>BTG PACTUAL (REFINITIV)</StyledTableCell>
                  <StyledTableCell>FX</StyledTableCell>
                  <StyledTableCell>BTG PACTUAL REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>COINMETRIC (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Crypto</StyledTableCell>
                  <StyledTableCell>COINMETRIC REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>COMPASS (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Commodities</StyledTableCell>
                  <StyledTableCell>COMPASS REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>CS INDEX WEIGHTINGS (REFINITIV)</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>REFINITIV CS INDEX WEIGHTINGS BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>CS INDICES (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Crypto</StyledTableCell>
                  <StyledTableCell>CS INDICES REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>DATATEC PERU</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>DATATEC PERU</StyledTableCell>
                  <StyledTableCell>MARKET DATA TOP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>EUREX</StyledTableCell>
                  <StyledTableCell>Government Bond Futures</StyledTableCell>
                  <StyledTableCell>EUREX</StyledTableCell>
                  <StyledTableCell>MARKET DATA UN AGG</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>EUWAX</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>EUWAX TRADING</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>EUWAX</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>EUWAX PC</StyledTableCell>
                  <StyledTableCell>PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>FLIPSIDE CRYPTO (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Crypto</StyledTableCell>
                  <StyledTableCell>FLIPSIDE REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>GFI</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>GFI</StyledTableCell>
                  <StyledTableCell>MARKET DATA TOP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>GFI</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>GFI</StyledTableCell>
                  <StyledTableCell>STATIC DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>GODOT ET FILS (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Commodities</StyledTableCell>
                  <StyledTableCell>REFINITIV GODOT ET FILS BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>HDAT</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>HDAT</StyledTableCell>
                  <StyledTableCell>ORDERS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>HDAT</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>HDAT</StyledTableCell>
                  <StyledTableCell>QUOTES</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>HDAT</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>HDAT</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>ICE</StyledTableCell>
                  <StyledTableCell>Government Bond Futures</StyledTableCell>
                  <StyledTableCell>ICE</StyledTableCell>
                  <StyledTableCell>MARKET DATA UN AGG</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>ISWAP</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>ISWAP MARKET DATA</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>ISWAP</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>ISWAP TRADING</StyledTableCell>
                  <StyledTableCell>ORDERS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>MARKET AXESS EU</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>MARKETAXESS EU TRADING</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>MARKET AXESS EU</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>MARKETAXESS EU PC</StyledTableCell>
                  <StyledTableCell>PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>MARKET AXESS EU</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>MARKETAXESS EU POST TRADE</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>MARKET AXESS US</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>MARKETAXESS US POST TRADE</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>MTS CASH</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>MTS CASH</StyledTableCell>
                  <StyledTableCell>ORDERS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>MTS CASH</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>MTS CASH</StyledTableCell>
                  <StyledTableCell>QUOTES</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>MTS LIVE</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>MTS LIVE</StyledTableCell>
                  <StyledTableCell>MARKET DATA UN AGG</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>NASD NIGERIA (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Listed Equities</StyledTableCell>
                  <StyledTableCell>NASD/NIGERIA REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>NORGES BANK (REFINITIV)</StyledTableCell>
                  <StyledTableCell>FX, Interest Rates</StyledTableCell>
                  <StyledTableCell>NORGES BANK REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>PHILIPPINES BANKERS ASSOC (REFINITIV)</StyledTableCell>
                  <StyledTableCell>MM / FX</StyledTableCell>
                  <StyledTableCell>PHP REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>POLAND CENTRAL BANK (REFINITIV)</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>REFINITIV POLAND CENTRAL BANK BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>REFINITIV</StyledTableCell>
                  <StyledTableCell>Multi Asset</StyledTableCell>
                  <StyledTableCell>REFINITIV MESSAGE API</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>ORDERS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>QUOTES</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>MARKET DATA AGG</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>SENAF</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TP ICAP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TP ICAP</StyledTableCell>
                  <StyledTableCell>MARKET DATA TOP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TP ICAP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TP ICAP</StyledTableCell>
                  <StyledTableCell>STATIC DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB CORI</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB CORI TRADING</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB CORI</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB CORI TRADING</StyledTableCell>
                  <StyledTableCell>PORTFOLIO</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB CORI (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB CORI REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU A2A AI EX</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU A2A AI EX</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING</StyledTableCell>
                  <StyledTableCell>ALL TO ALL</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING</StyledTableCell>
                  <StyledTableCell>PROCESS TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING</StyledTableCell>
                  <StyledTableCell>CAT</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING</StyledTableCell>
                  <StyledTableCell>NON CONTINGENT LIST</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING</StyledTableCell>
                  <StyledTableCell>PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TIERED PC</StyledTableCell>
                  <StyledTableCell>AXES</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP POST TRADE</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING BUYSIDE</StyledTableCell>
                  <StyledTableCell>ALL TO ALL AIEX</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU CORP</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU CORP TRADING</StyledTableCell>
                  <StyledTableCell>PORTFOLIO</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>RFS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>RFM</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>COMPRESSIONS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>PROCESS TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>CAT</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>MAP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS_TIERED PC</StyledTableCell>
                  <StyledTableCell>PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS COMPOSITE PC</StyledTableCell>
                  <StyledTableCell>COMPOSITE PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS POST TRADE</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>RFM FOR COMPRESSIONS</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>FUTURE SPREAD</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>ASSET SWAP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EU IRS</StyledTableCell>
                  <StyledTableCell>IRS</StyledTableCell>
                  <StyledTableCell>TRADEWEB EU IRS TRADING</StyledTableCell>
                  <StyledTableCell>MAC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TRADING</StyledTableCell>
                  <StyledTableCell>RFQ</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TRADING</StyledTableCell>
                  <StyledTableCell>NON CONTINGENT LIST</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TRADING</StyledTableCell>
                  <StyledTableCell>AON</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TRADING</StyledTableCell>
                  <StyledTableCell>TAC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TRADING</StyledTableCell>
                  <StyledTableCell>PROCESS TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TRADING</StyledTableCell>
                  <StyledTableCell>CAT</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TIERED PC</StyledTableCell>
                  <StyledTableCell>PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TIERED PC</StyledTableCell>
                  <StyledTableCell>AXES</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV COMPOSITE PC</StyledTableCell>
                  <StyledTableCell>COMPOSITE PC</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV POST TRADE</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB EUGV</StyledTableCell>
                  <StyledTableCell>Government Bonds</StyledTableCell>
                  <StyledTableCell>TRADEWEB EUGV TRADING</StyledTableCell>
                  <StyledTableCell>RFM</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS</StyledTableCell>
                  <StyledTableCell>MBS</StyledTableCell>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS TRADING</StyledTableCell>
                  <StyledTableCell>NON CONTINGENT LIST</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS</StyledTableCell>
                  <StyledTableCell>MBS</StyledTableCell>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS TRADING</StyledTableCell>
                  <StyledTableCell>AON</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS</StyledTableCell>
                  <StyledTableCell>MBS</StyledTableCell>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS TRADING</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS</StyledTableCell>
                  <StyledTableCell>MBS</StyledTableCell>
                  <StyledTableCell>TRADEWEB MBS SPEC POOLS TRADING</StyledTableCell>
                  <StyledTableCell>SPOT PRICING</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADEWEB REPO</StyledTableCell>
                  <StyledTableCell>Repo</StyledTableCell>
                  <StyledTableCell>TRADEWEB REPO POST TRADE</StyledTableCell>
                  <StyledTableCell>POST TRADE</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADITION</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADITION</StyledTableCell>
                  <StyledTableCell>MARKET DATA TOP</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TRADITION</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>TRADITION</StyledTableCell>
                  <StyledTableCell>STATIC DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#2ca444", color: "#FFFFFF" }}>LIVE</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>TURKISH CENTRAL BANK (REFINITIV)</StyledTableCell>
                  <StyledTableCell>FX, Interest Rates</StyledTableCell>
                  <StyledTableCell>TURKISH CENTRAL BANK REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>UBS BONDPORT (REFINITIV)</StyledTableCell>
                  <StyledTableCell>Corporate Bonds</StyledTableCell>
                  <StyledTableCell>UBS BONDPORT REFINITIV BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>UKRAINE CENTRAL BANK (REFINITIV)</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>REFINITIV UKRAINE CENTRAL BANK BRIDGE</StyledTableCell>
                  <StyledTableCell>MARKET DATA</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#0c7484", color: "#FFFFFF" }}>PLANNING</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table >
          </TableContainer>
        </Box>
      </ComponentsProvider>
    </>
  )
}

export default Etrade
