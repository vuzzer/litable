import { Component, Fragment } from 'react'
import AddForm from '../components/AddForm'

export default class AddLitablePage extends Component {
  render() {
    return (
      <Fragment>
        <div className='container'>
          <AddForm/>
        </div>
      </Fragment>
    )
  }
}

