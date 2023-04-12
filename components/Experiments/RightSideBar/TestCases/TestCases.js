import React from 'react';
import EmptyState from '../../../../assets/Svg/EmptyState';
import Button from '@mui/material/Button';
import AddIcon from '../../../../assets/Svg/AddIcon';

function TestCases(props) {
    const TestCaseList =[];

    return (
        <div>
            {TestCaseList.length==0?(
                <div className="relative w-full">
                <EmptyState className="w-full" />
      
                <div className="flex justify-center items-center flex-col absolute top-[43%] left-[37%]">
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