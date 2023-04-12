import React from 'react';
import styles from '../ExperimentsDetails.module.scss';
import Button from '@mui/material/Button';
import AddIcon from '../../../../assets/Svg/AddIcon';

function TestCases(props) {
    const TestCaseList =[];

    return (
        <div>
            {TestCaseList.length==0?(
                <div className={`relative w-full ${styles.emptyState} flex justify-center items-center `}>
      
                <div className="flex justify-center items-center flex-col">
                  <p className="flex items-center opacity-[60%] text-[15px] leading-[24px] font-[400px] mb-[14px]">
                    Create a new template and get started
                  </p>
                  <Button
                    variant="outlined"
                    sx={{ color: "#2196F3" }}
                    onClick={() => {
                      setCreateNewTemplate(true);
                    }}
                  >
                    <AddIcon className="mr-[11px]" /> new template
                  </Button>
                </div>
              </div>
            ):(null)}
        </div>
    );
}

export default TestCases;