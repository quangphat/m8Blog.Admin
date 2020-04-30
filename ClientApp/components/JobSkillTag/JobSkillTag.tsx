import * as React from 'react';
import * as Utils from '../../infrastructure/Utils'
import { TagDisplay } from '..'
import { IOptionSimple } from '../../Models';
interface JobSkillTagProps {
    skills: IOptionSimple[],
    routePath?: string,
    className?: string,
    onClickItem?: Function
}
interface JobSkillTagStates {
    skills: IOptionSimple[]
}
export class JobSkillTag extends React.Component<JobSkillTagProps, JobSkillTagStates> {
    constructor(props: any) {
        super(props);
        this.state = {
            skills: this.props.skills
        };

    }
    static defaultProps = {
        className: ''
    }
    componentWillReceiveProps(newProps: JobSkillTagProps) {
        if (this.props.skills != newProps.skills) {
            this.setState({ skills: newProps.skills })
        }
    }
    private onClickItem(item: IOptionSimple) {
        if (item == null)
            return;
        if (this.props.onClickItem)
            this.props.onClickItem(item)
    }
    public render() {
        let { skills } = this.state
        if (Utils.isNullOrUndefined(skills)) return null;
        return <div className={`${this.props.className} next-token-list__wrapper`}>
            <ul className='next-token-list'>
                {skills.map(item => {
                    return <li key={'input-tags' + item.id} className='tagit-choice table-break-word' onClick={() => this.onClickItem(item)}>
                        <span className='tagit-label'>{item.display}</span>
                    </li>
                })}
            </ul>
        </div>
    }
}
