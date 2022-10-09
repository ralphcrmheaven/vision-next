import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const VRichTextEditor = (props:any) => {
    const { id, className, editorState, onEditorStateChange } = props;
    return (
        <Editor
            // editorStyle={{ height: '300px' }} //Move outside of component for customizability per usage
            {...props}
            editorState={editorState}
            toolbarClassName="v-rte-toolbar"
            // wrapperClassName="v-rte-wrapper box-border v-ui-element" //Move outside of component for customizability per usage
            editorClassName="v-rte-editor"
            onEditorStateChange={onEditorStateChange}
        />
    );
};

export default VRichTextEditor;
