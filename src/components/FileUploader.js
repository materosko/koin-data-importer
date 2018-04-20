import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const FileUploader = ({ handleFileUpload }) => (
  <Dropzone
    onDrop={handleFileUpload}
    multiple={false}
    className="image-upload-box"
    activeClassName="image-upload-box--active"
    rejectClassName="image-upload-box--reject"
    style={{
      display: 'flex',
      flexGrow: 1,
      width: '100%',
      alignItems: 'center',
      alignContent: 'center',
    }}
  >
    <div style={{ width: '100%', textAlign: 'center' }}>
      Drop your file here
    </div>
  </Dropzone>
);

FileUploader.propTypes = {
  handleFileUpload: PropTypes.func.isRequired,
};

export default FileUploader;
