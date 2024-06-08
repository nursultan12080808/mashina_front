import {Link} from "react-router-dom";


// eslint-disable-next-line react/prop-types
export const PrimaryBtn = ({className = '', children, ...props}) => {
    return <button className={`primary-btn ${className}`} {...props}>{children}</button>
}

// eslint-disable-next-line react/prop-types
export const PrimaryLinkBtn = ({className = '', children, ...props}) => {
    return <Link className={`primary-btn ${className}`} {...props}>{children}</Link>
}


// eslint-disable-next-line react/prop-types
export const PrimaryFetchBtn = ({className = '', isFetching = false, children, ...props}) => {
    return <button className={`primary-btn ${className}`} disabled={isFetching} {...props}>
        {isFetching
            ? <div className='flex justify-center'><img width='20px'/></div>
            : children
        }
    </button>
}