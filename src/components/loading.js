import '../App.css';

const Loading = (props) => {
    if (props.loading) {
        return(
            <div className="blinking"></div>
          )
    } 
}

export default Loading;