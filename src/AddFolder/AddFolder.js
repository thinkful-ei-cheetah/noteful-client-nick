import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddFolder.css'
import AppContext from '../AppContext'


export default class AddFolder extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      folderName: '',
      folderNameValid: true,
      validationMessage: ''
    }
  }

  updateFolderName = (folderName) => {
    this.setState ({folderName}, () => { this.validateFolderName(folderName) });
  }

  validateFolderName(folderName) {
    // non-empty
    // min-length = 3 
    // regex for web safe characters ^[a-zA-Z0-9_-]*$
    let message = this.state.validationMessage;
    let hasError = false;

    folderName = folderName.trim();
    if(folderName.length === 0) {
      message = 'Must provide a Folder Name';
      hasError = true;
    } else {
      if(folderName.length < 3) {
        message = 'Folder name must be at least 3 characters long';
        hasError = true;
      } else {
        if (!folderName.match(new RegExp(/^ [a - zA - Z0 -9_ -] * $/))) {
          message = 'Folder name must use alphanumeric characters only'
          hasError = true;
        } else {
          message = '';
          hasError = false;
        }
      }
    }

    this.setState({
      folderNameValid: !hasError,
      validationMessage: message
    })

  }

  addFolderApi = (newFolder) => {
    const BASEURL = "http://localhost:9090";
    fetch(BASEURL + '/folders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder)
    })
      .then( () => console.log('POST Successful!'))
  }

  handleAddFolder = (e, newFolder) => {
    e.preventDefault();

    // grab input

    this.addFolderApi(newFolder);
  }

  render() {
    const newFolder = {
      id: "q2l3kj412;3lk4j",
      name: "Test123"
    }

    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' onChange={ e => this.updateFolderName(e.target.value)}/>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.folderNameValid}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
