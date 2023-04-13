import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TestCaseInfo from "./TestCaseInfo";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [testCaseName, setTestCaseName] = useState("Untitled Template");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="variable definations" {...a11yProps(1)} />
          <Tab label="acceptable results" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <input
        className="text-[15px] font-bold opacity-40 outline-none py-[25px]"
        type="text"
        value={testCaseName}
        onChange={(e) => {
          setTestCaseName(e.target.value);
        }}
      />
      <TabPanel value={value} index={0}>
        <TestCaseInfo />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TestCaseInfo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TestCaseInfo />
      </TabPanel>
    </Box>
  );
}
