import * as React from 'react'
import * as Markdown from 'react-markdown';
import { CodeBlock } from '../CodeBlock/CodeBlock'
import './index.css'
interface PowerEditorProps {
    content: string,
    className?: string
}
interface PowerEditorStates {
    content: string
}
export class PowerEditor extends React.Component<PowerEditorProps, PowerEditorStates>{
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            
        }
    }
    componentWillReceiveProps(newProps: PowerEditorProps) {
        
    }
    static defaultProps = {
        className: ''
    }
    public getContent() {
        return this.state.content
    }
    render() {
        let { className } = this.props
        let { content } = this.state
        return <div className={`col-sm-12 ${className}`} id="main-view">
            <div className='row'>
                <div className='col-sm-6'>
                    <textarea className='w-100' value={content} onChange={(e) => this.setState({ content: e.target.value })}>
                    </textarea>
                </div>
                <div className='col-sm-6'>
                    <Markdown source={content} escapeHtml={false}
                        renderers={{ code: CodeBlock }}
                        skipHtml={false} />
                </div>
            </div>
            
        </div>
    }
}