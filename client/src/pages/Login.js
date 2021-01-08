import React from 'react'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: {}
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault()
    }

    render() {
        let { email, password, error } = this.state
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1 className="text-center display-4">Login Here</h1>
                    <form onSubmit={this.submitHandler} method="post">
                        <div className="form-group">
                            <label htmlFor="email">E-Mail Address: </label>
                            <input 
                                type="email"
                                className="form-control" 
                                placeholder="Enter your email" 
                                id="email"
                                name="email" 
                                value={email} 
                                onChange={this.changeHandler} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input 
                                type="password"
                                className="form-control" 
                                placeholder="Enter your password" 
                                id="password"
                                name="password" 
                                value={password} 
                                onChange={this.changeHandler} />
                        </div>
                        
                        <button className="btn btn-primary d-block my-3" type="submit">Login</button>
                    </form>
                    Don't have an Account? <Link to="/register">Register here</Link>
                </div>
            </div> 
        )
    }
}
export default Login