import React from "react"
import Link from 'gatsby-link'

function sanitizeURLPath (input) {
    return input.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
};
  
function extractProjectName (input) {
    if(input.indexOf('PD-') != -1) {return "product-development"}
    else if(input.indexOf('AD-') != -1) {return "adventure"}
    else if(input.indexOf('AUTO-') != -1) {return "automotive"}
    else if(input.indexOf('BIZ-') != -1) {return "business"}
    else if(input.indexOf('COOK-') != -1) {return "cooking"}
    else if(input.indexOf('BIZ-') != -1) {return "business"}
    else if(input.indexOf('COOK-') != -1) {return "cooking"}
    else if(input.indexOf('DEV-') != -1) {return "devops"}
    else if(input.indexOf('EDU-') != -1) {return "education"}
    else if(input.indexOf('EE-') != -1) {return "Electrical Engineering"}
    else if(input.indexOf('ENT-') != -1) {return "Entertainment"}
    else if(input.indexOf('FIN-') != -1) {return "finance"}
    else if(input.indexOf('GD-') != -1) {return "graphic-design"}
    else if(input.indexOf('HEALTH-') != -1) {return "health"}
    else if(input.indexOf('HOUSE-') != -1) {return "household"}
    else if(input.indexOf('IT-') != -1) {return "it"}
    else if(input.indexOf('LEGAL-') != -1) {return "legal"}
    else if(input.indexOf('MKT-') != -1) {return "marketing"}
    else if(input.indexOf('ME-') != -1) {return "mechanical-engineering"}
    else if(input.indexOf('MUSIC-') != -1) {return "music"}
    else if(input.indexOf('NO-') != -1) {return "network-operations"}
    else if(input.indexOf('PHOTO-') != -1) {return "photography"}
    else if(input.indexOf('PD-') != -1) {return "product-development"}
    else if(input.indexOf('REC-') != -1) {return "recreation"}
    else if(input.indexOf('SALES-') != -1) {return "sales"}
    else if(input.indexOf('SAND-') != -1) {return "sandbox"}
    else if(input.indexOf('SOCIAL-') != -1) {return "social"}
    else if(input.indexOf('BD-') != -1) {return "software-build-and-deploy"}
    else if(input.indexOf('SE-') != -1) {return "software-engineering"}
    else if(input.indexOf('SYSOPS-') != -1) {return "sysops"}
    else if(input.indexOf('SYSENG-') != -1) {return "systems-engineering"}
    else if(input.indexOf('TRAVEL-') != -1) {return "travel"}
    else if(input.indexOf('UIUX-') != -1) {return "ui+ux"}
    else if(input.indexOf('VOL-') != -1) {return "volunteering"}
    else if(input.indexOf('WRITE-') != -1) {return "writing"}
}

class RelatedTasksList extends React.Component {
    render() {
        const taskLinks = this.props.taskLinks
        if (taskLinks != null && taskLinks.length > 0) {
            return (
                <div className="mt-0">
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