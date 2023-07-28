import React,{Fragment} from 'react'
import spinner from '../../assets/images/spinner.gif';

const Spinner: React.FC = () => {
  return (
    <Fragment>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block", background:'none' }}
      alt="Loading..."
    />
  </Fragment>
  )
}

export default Spinner;