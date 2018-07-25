import React from "react"
import Link from 'gatsby-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks } from '@fortawesome/free-solid-svg-icons'

function sanitizeURLPath (input) {
    return input.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
};
  
function extractProjectName (input) {
    if(input.indexOf('PD-') != -1) {return "product-development"}
    else if(input.indexOf('WRITE-') != -1) {return "writing"}
    else if(input.indexOf('TRAVEL-') != -1) {return "travel"}
}

class RelatedTasksList extends React.Component {
    render() {
        const taskLinks = this.props.taskLinks
        if (taskLinks != null && taskLinks.length > 0) {
            return (
                <div className="mt-0">
                    <FontAwesomeIcon icon={faTasks} className="align-middle mr-1 mt-0 text-secondary" />
                    <span className="text-secondary">Related: </span>
                    {taskLinks.map((link, i) => {
                        if(link.inwardIssue != null) {
                            const key = extractProjectName(link.inwardIssue.key)
                            const summary = sanitizeURLPath(link.inwardIssue.jiraFields.summary)
                            const url = '/' + key + '/' + summary
                            return (
                                <span key={i}>
                                    <Link to={url} className="text-secondary">{link.inwardIssue.jiraFields.summary}</Link>{i != (taskLinks.length - 1) ? ', ' : ' '}
                                </span>
                            );
                        } else if (link.outwardIssue != null) {
                            const key = extractProjectName(link.outwardIssue.key)
                            const summary = sanitizeURLPath(link.outwardIssue.jiraFields.summary)
                            const url = '/' + key + '/' + summary
                            return (
                                <span key={i}>
                                    <Link to={url} className="text-secondary">{link.outwardIssue.jiraFields.summary}</Link>{i != (taskLinks.length - 1) ? ', ' : ' '}
                                </span>
                            );
                        }
                    })}
                </div>
            );
        } else {
            return(null)
        }
    }
}

export default RelatedTasksList;