import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'medium-draft/lib/index.css';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import Dante from 'Dante2'
import './index.css'


interface IDanteEditorProps {
    content?: any
}
const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];
export class DanteEditor extends React.Component<IDanteEditorProps, any>{
    ref_dante: Dante
    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }
    componentDidMount() {
    }

    onChange() {
        this.setState({ editorState: '' })
        /* You would normally save this to your database here instead of logging it */

    }
    render() {
        //return <Editor editorClassName="bg-white dante-container"
        //        editorState={this.state.editorState}
        //    onEditorStateChange={(e) => this.onChange(e)} />
        return <Dante
            ref={com => this.ref_dante = com}
            config={{
                data_storage: {
                    debug: true,
                    save_handler: this.onChange
                }
            }}
            content={''}
        />
    }
}