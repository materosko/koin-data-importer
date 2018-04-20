import React from 'react';
import PropTypes from 'prop-types';
import FileUploader from '../components/FileUploader';

const styles = {
  container: {
    display: 'flex',
    height: 'calc(100% - 65px)',
    width: '100%',
    overflow: 'hidden',
    alignContent: 'center',
  },
};

const Step2 = ({ handleFileUpload }) => (
  <div style={styles.container}>
    <FileUploader handleFileUpload={handleFileUpload} />
  </div>
);

Step2.propTypes = {
  handleFileUpload: PropTypes.func.isRequired,
};

export default Step2;
