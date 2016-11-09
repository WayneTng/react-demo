import React from 'react'
import AddFishForm from './AddFishForm'
import firebase from 'firebase/app'
import { auth, database } from '../db/firebase'
import { observer } from 'mobx-react'
import FishStore from '../stores/Fish'

@observer class Inventory extends React.Component {
  constructor() {
    super()
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentWillMount() {
    this.store = FishStore.getStore(this.props.storeId)
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user){
        this.authHandler({user})
      }
    })
  }

  handleChange(e, key) {
    const fish = this.store.fishes[key]
    const updatedFish = {...fish, [e.target.name]: e.target.value}
    this.store.updateFish(key, updatedFish)
  }

  renderLogin() {
    return (
      <nav className='login'>
        <h2> Inventory </h2>
        <p> Sign in to manage your store inventory </p>
        <button className='github' onClick={() => this.authenticate(new firebase.auth.GithubAuthProvider())}>
          Login with GitHub
        </button>
        <button className='google' onClick={() => this.authenticate('google')}>
          Login with GitHub
        </button>
      </nav>
    )
  }

  authenticate(provider) {
    auth.signInWithPopup(provider).then((authData) => this.authHandler(authData))
  }

  authHandler(authData) {
    const storeRef = database.ref(this.props.storeId)
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}
      if (!data.owner) {
      storeRef.set({
        owner: authData.user.uid
      })}

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  renderInventory(key) {
    const fish = this.store.fishes[key]
    return(
      <div className='fish-edit' key={key}>
        <input type='text' name='name' value={fish.name} placeholder='Fish Name' onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='price' value={fish.price} placeholder='Price' onChange={(e) => this.handleChange(e, key)} />
        <select type='text' name='status' value={fish.status} placeholder='Fish Status' onChange={(e) => this.handleChange(e, key)} >
          <option value='available'> Fresh! </option>
          <option value='unavailable'> Sold Out! </option>
        </select>
        <textarea type='text' name='desc' value={fish.desc} placeholder='Fish Desc' onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='image' value={fish.image} placeholder='image' onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.store.removeFish(key)}> Remove Fish </button>
      </div>
    )
  }

  logout() {
    auth.signOut()
    this.setState({
      uid: null
    })
  }

  render() {
    const { uid, owner } = this.state
    const logout = <button onClick={() => this.logout()}> Log Out! </button>

    if (!uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (uid !== owner) {
      return (
        <div>
          <p> Sorry you are not the owner of this store! </p>
          {logout}
        </div>
      )
    }

    return(
      <div>
        <h2> Inventory </h2>
        {logout}
        {Object.keys(this.store.fishes).map((key) => this.renderInventory(key))}
        <AddFishForm addFish={this.store.addFish} />
        <button onClick={this.store.loadSamples}> Load Sample Fishes </button>
      </div>
    )
  }
}

Inventory.propTypes = {
  storeId: React.PropTypes.string.isRequired
}
export default Inventory
