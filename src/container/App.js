// NPM Modules
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

// Styles
import './App.css';

// Logic
import * as logic from './App-logic';

// Constants
import * as constants from './App-constants';

// Initial State
const initialState = observable({
    dateValue: '',
    dateDiffValue: constants.placeholderDateDiff,
});

export default inject('store')(observer(class App extends Component {
    constructor(props) {
        super(props);

        this.appStore = initialState;
    }

    callUpdateDateValue = (e) => {
        logic.updateDateValue(this.appStore, e.target.value);
    }

    callCalcDateDiff = () => {
        logic.calcDateDiff(this.appStore);
    }

    render() {
        return (
            <div className="ddc__app">
                <p className="ddc__app-intro">
                    Enter a pair of dates between 1900 and 2010 into the field below
                </p>
                <input
                    type="text"
                    className="ddc__app-date-input"
                    placeholder="e.g. 'dd mm yyyy, dd mm yyyy'"
                    onChange={this.callUpdateDateValue}
                    value={this.appStore.dateValue}
                />
                <button className="ddc__app-calculate-btn" onClick={this.callCalcDateDiff}>
                    Calculate
                </button>
                <p className={`ddc__app-date-diff-value${this.appStore.dateDiffValue.length < 49 ? ' --valid' : ''}`}>
                    {this.appStore.dateDiffValue}
                </p>
            </div>
        );
    }
}));
