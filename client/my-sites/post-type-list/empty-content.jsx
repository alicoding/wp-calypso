/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import localize from 'lib/mixins/i18n/localize';
import { getPostType } from 'state/post-types/selectors';
import { getSelectedSiteId } from 'state/ui/selectors';
import { getEditorPath } from 'state/ui/editor/selectors';
import QueryPostTypes from 'components/data/query-post-types';
import EmptyContent from 'components/empty-content/empty-content';

function PostTypeListEmptyContent( { siteId, translate, status, typeObject, editPath } ) {
	let title, action;

	if ( 'draft' === status ) {
		title = translate( 'You don\'t have any drafts.' );
	} else if ( typeObject ) {
		title = translate( 'You don\'t have any %s.', {
			args: [ typeObject.label.toLocaleLowerCase() ]
		} );
	}

	if ( typeObject ) {
		action = translate( 'Start a %s', {
			args: [ typeObject.labels.singular_name ]
		} );
	}

	return (
		<div>
			{ siteId && (
				<QueryPostTypes siteId={ siteId } />
			) }
			<EmptyContent
				title={ title }
				line={ translate( 'Would you like to create one?' ) }
				action={ action }
				actionURL={ editPath }
				illustration="/calypso/images/pages/illustration-pages.svg"
				illustrationWidth={ 150 } />
		</div>
	);
}

PostTypeListEmptyContent.propTypes = {
	siteId: PropTypes.number,
	translate: PropTypes.func,
	type: PropTypes.string,
	status: PropTypes.string,
	typeObject: PropTypes.object,
	editPath: PropTypes.string
};

export default connect( ( state, ownProps ) => {
	const siteId = getSelectedSiteId( state );

	return {
		siteId,
		typeObject: getPostType( state, siteId, ownProps.type ),
		editPath: getEditorPath( state, siteId, null, ownProps.type )
	};
} )( localize( PostTypeListEmptyContent ) );
