import React from 'react'

export const MyHistory = ({history}) => {
    return (
        <div className="history">
        <div className="history__header">
           <h3>Go back in time</h3>
        </div>
        {
            history.map(item => (<button className="button__custom" key={item.date}> {item.date}</button>))
        }
      </div>
    )
}
