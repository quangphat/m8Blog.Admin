import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IArticleMeta } from '../../Models/IArticleMeta'
import * as Components from '../../components'
import * as Utils from '../../infrastructure/Utils'
import { EditorState, ContentState, RichUtils } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import createHighlightPlugin from './Plugins/highlightPlugin';
import 'react-trumbowyg/dist/trumbowyg.min.css'
import Trumbowyg from 'react-trumbowyg'
//import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import { Editor } from 'react-draft-wysiwyg';
//import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface DraftEditorProps {

}

interface DraftEditorStates {
    editorState: any
}
const highlightPlugin = createHighlightPlugin();
export class DraftEditor extends React.Component<DraftEditorProps, DraftEditorStates> {

    constructor(props: any) {
        super(props);
        const processedHTML = DraftPasteProcessor.processHTML("sdfsdf");
        const contentState = ContentState.createFromBlockArray(processedHTML);


        this.state = {
            editorState: EditorState.createWithContent(contentState)
        };

    }

    componentWillMount() {

    }
    private handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState);
            return;
        }
        return;
    }
    private onItalicClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    private onUnderlineClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }

    private onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }
    private onChange(editorState) {
        this.setState({ editorState: editorState })
    }
    private onHighlight() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
    }
    private onAddLink() {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const link = window.prompt('Paste the link -')
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return 'handled';
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    }
    public render() {
        return <div>
            <Trumbowyg
                editorState={this.state.editorState} wrapperClassName="demo-wrapper" editorClassName="editer-content"
                onEditorStateChange={(e)=>this.onChange(e)}
            />
        </div>
    }
}