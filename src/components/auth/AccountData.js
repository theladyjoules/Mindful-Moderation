import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import Loader from '../global/Loader';
import moment from 'moment'
import { strings } from '../../utilities/strings';
import { importMealData, exportMealData } from '../../actions/utility_actions';

class AccountData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportFileName: 'meals-export-' + moment().format('MM-DD-YYYY') + '.csv'
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleExportClick = this.handleExportClick.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault()
    if(this.fileInput.files.length && validate(this.fileInput.files[0].name)){
      this.props.importMealData(this.fileInput.files[0]);
    }
  }

  handleExportClick(e){
    e.preventDefault()
    this.props.exportMealData()
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="account-section row">
        <div className="col-xs-12">
          <h2>Data</h2>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <h3>Export</h3>
                <p>Export all meal data as a .csv file.</p>
                {this.props.exportFile === '' ? (
                  <div className="btn-wrapper">
                    <a className="btn" onClick={this.handleExportClick}>Generate Export File</a>
                  </div>
                ) : (
                  <div className="btn-wrapper">
                    <a className="btn" href={this.props.exportFile} download={this.state.exportFileName}>Download {this.state.exportFileName}</a>
                  </div>
                )}
              </div>
              <div className="col-xs-12 col-md-6">
                <h3>Import</h3>
                <p>Import meal data from a .csv file.</p>
                <form onSubmit={this.handleFormSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="importFile">Select a File</label>
                      <input
                        name="importFile"
                        id="importFile"
                        type="file"
                        accept=".csv"
                        ref={input => {
                          this.fileInput = input;
                        }}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Import</button>
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

var _validFileExtensions = [".csv"];    
function validate(file) {
  if (file.length > 0) {
    var blnValid = false;
    for (var j = 0; j < _validFileExtensions.length; j++) {
      var sCurExtension = _validFileExtensions[j];
      if (file.substr(file.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
        blnValid = true;
        break;
      }
    }
    if (!blnValid) {
      console.log("Sorry, " + file + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
      return false;
    }
  }
  return true;
}

AccountData = connect(
  state => ({
    import: state.auth.import,
    exportFile: state.utility.exportFile
  }),
  { importMealData, exportMealData }
)(AccountData)

export default AccountData