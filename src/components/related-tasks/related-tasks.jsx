import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

function sanitizeURLPath(input) {
  return input.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-').toLowerCase();
}

function extractProjectName(input) {
  if (input.indexOf('PD-') !== -1) { return 'product-development'; }
  if (input.indexOf('AD-') !== -1) { return 'adventure'; }
  if (input.indexOf('AUTO-') !== -1) { return 'automotive'; }
  if (input.indexOf('BIZ-') !== -1) { return 'business'; }
  if (input.indexOf('COOK-') !== -1) { return 'cooking'; }
  if (input.indexOf('BIZ-') !== -1) { return 'business'; }
  if (input.indexOf('COOK-') !== -1) { return 'cooking'; }
  if (input.indexOf('DEV-') !== -1) { return 'devops'; }
  if (input.indexOf('EDU-') !== -1) { return 'education'; }
  if (input.indexOf('EE-') !== -1) { return 'Electrical Engineering'; }
  if (input.indexOf('ENT-') !== -1) { return 'Entertainment'; }
  if (input.indexOf('FIN-') !== -1) { return 'finance'; }
  if (input.indexOf('GD-') !== -1) { return 'graphic-design'; }
  if (input.indexOf('HEALTH-') !== -1) { return 'health'; }
  if (input.indexOf('HOUSE-') !== -1) { return 'household'; }
  if (input.indexOf('IT-') !== -1) { return 'it'; }
  if (input.indexOf('LEGAL-') !== -1) { return 'legal'; }
  if (input.indexOf('MKT-') !== -1) { return 'marketing'; }
  if (input.indexOf('ME-') !== -1) { return 'mechanical-engineering'; }
  if (input.indexOf('MUSIC-') !== -1) { return 'music'; }
  if (input.indexOf('NO-') !== -1) { return 'network-operations'; }
  if (input.indexOf('PHOTO-') !== -1) { return 'photography'; }
  if (input.indexOf('PD-') !== -1) { return 'product-development'; }
  if (input.indexOf('REC-') !== -1) { return 'recreation'; }
  if (input.indexOf('SALES-') !== -1) { return 'sales'; }
  if (input.indexOf('SAND-') !== -1) { return 'sandbox'; }
  if (input.indexOf('SOCIAL-') !== -1) { return 'social'; }
  if (input.indexOf('BD-') !== -1) { return 'software-build-and-deploy'; }
  if (input.indexOf('SE-') !== -1) { return 'software-engineering'; }
  if (input.indexOf('SYSOPS-') !== -1) { return 'sysops'; }
  if (input.indexOf('SYSENG-') !== -1) { return 'systems-engineering'; }
  if (input.indexOf('TRAVEL-') !== -1) { return 'travel'; }
  if (input.indexOf('UIUX-') !== -1) { return 'ui+ux'; }
  if (input.indexOf('VOL-') !== -1) { return 'volunteering'; }
  if (input.indexOf('WRITE-') !== -1) { return 'writing'; }
  return '';
}

export default function RelatedTasksList({ taskLinks }) {
  if (taskLinks !== null && taskLinks.length > 0) {
    return (
      <div className="mt-0">
        <span className="text-secondary">Related: </span>
        {taskLinks.map((link, i) => {
          if (link.inwardIssue !== null) {
            const key = extractProjectName(link.inwardIssue.key);
            const summary = sanitizeURLPath(link.inwardIssue.jiraFields.summary);
            const url = `/${key}/${summary}`;
            return (
              <span key={link.id}>
                <Link to={url} className="text-secondary">{link.inwardIssue.jiraFields.summary}</Link>
                {i !== (taskLinks.length - 1) ? ', ' : ' '}
              </span>
            );
          }
          if (link.outwardIssue !== null) {
            const key = extractProjectName(link.outwardIssue.key);
            const summary = sanitizeURLPath(link.outwardIssue.jiraFields.summary);
            const url = `/${key}/${summary}`;
            return (
              <span key={link.id}>
                <Link to={url} className="text-secondary">{link.outwardIssue.jiraFields.summary}</Link>
                {i !== (taskLinks.length - 1) ? ', ' : ' '}
              </span>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return (null);
}

RelatedTasksList.propTypes = {
  taskLinks: PropTypes.string.isRequired,
};
