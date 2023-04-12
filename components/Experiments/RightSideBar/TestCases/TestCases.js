import React from 'react';
import EmptyState from '../EmptyState';

function TestCases(props) {
    const TestCaseList =[];

    return (
        <div>
            {TestCaseList.length==0?(
                <EmptyState />
            ):(null)}
        </div>
    );
}

export default TestCases;