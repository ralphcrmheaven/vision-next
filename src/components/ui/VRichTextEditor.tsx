import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const VRichTextEditor = (props:any) => {
    const { id, className, editorState, onEditorStateChange } = props;
    return (
        <Editor
            editorStyle={{ height: '400px' }} 
            {...props}
            editorState={editorState}
            toolbarClassName="v-rte-toolbar"
            wrapperClassName="v-rte-wrapper box-border v-ui-element"
            editorClassName="v-rte-editor"
            onEditorStateChange={onEditorStateChange}
        />
    );
};

export default VRichTextEditor;