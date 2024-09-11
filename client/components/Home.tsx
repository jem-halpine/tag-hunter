import { Link } from 'react-router-dom'
// import Nav from './Nav'
function Home() {
    return (
        <div>
            <div className="content">
                <h2>Get Started!</h2>
                    <Link to="/game">Game Start</Link> {/* Just change the 'Link to="/game" whenever' */}
            </div>
        </div>
    )
}

export default Home