import React, {useState} from 'react';
import {Input} from 'antd';

interface Props {
    onSetQuery: (value: string) => void
    placeholder: string
}

const TodoInput: React.FC<Props> = ({onSetQuery, placeholder}) => {
    const [value, setValue] = useState("");
    const onAdd = () => onSetQuery(value);
    return (
        <section className="input-wrap">
            <Input
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                className="input"
                onPressEnter={onAdd}
            />
        </section>
    )
}

export default TodoInput;