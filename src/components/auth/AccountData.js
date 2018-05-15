import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import Loader from '../global/Loader';
import moment from 'moment'
import { strings } from '../../utilities/strings';
import { importMealData, exportMealData, setImportMessage } from '../../actions/utility_actions';

class AccountData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exportFileName: 'meals-export-' + moment().format('MM-DD-YYYY') + '.csv'
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleExportClick = this.handleExportClick.bind(this);
  }

  componentWillMount(){
    this.props.setImportMessage('')
  }

  handleFormSubmit(e) {
    e.preventDefault()
    if(this.fileInput.files.length && validate(this.fileInput.files[0].name)){
      this.props.importMealData(document.getElementById('import-form'));
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
            <div className="row account-sub-section-wrapper">
              <div className="account-sub-section col-xs-12 col-md-6">
                <p><strong>Export</strong></p>
                <p>Export all meal data as a .csv file. Click below to generate the file.</p>
                {this.props.exportFile === '' ? (
                  <div className="btn-wrapper">
                    <a className="btn btn-green" onClick={this.handleExportClick}>Generate</a>
                  </div>
                ) : (
                  <div>
                    <p className="export-file-name">{this.state.exportFileName}</p>
                    <div className="btn-wrapper">
                      <a className="btn btn-green" href={this.props.exportFile} download={this.state.exportFileName}>Download</a>
                    </div>
                  </div>
                )}
              </div>
              <div className="account-sub-section col-xs-12 col-md-6">
                <p><strong>Import</strong></p>
                <p>Import meal data from a .csv file.</p>
                {this.props.importMessage === '' ? null : (
                  <p>{this.props.importMessage}</p>
                )}
                <form id="import-form" onSubmit={this.handleFormSubmit}>
                  <div className="row">
                    <div className="col-md-6">
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
                  <div className="btn-wrapper">
                    <button type="submit" className="btn btn-green" onClick={this.handleFormSubmit}>Import</button>
                  </div>
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
    exportFile: state.utility.exportFile,
    importMessage: state.utility.importMessage
  }),
  { importMealData, exportMealData, setImportMessage }
)(AccountData)

export default AccountData