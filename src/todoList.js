import React from 'react';
import {List} from 'antd';
import classnames from 'classnames';
import {DeleteOutlined} from '@ant-design/icons';
const TodoList = ({todos, onToggleFinished}) => {

    //删除
    const onDelete = e => {
        e.stopPropagation();
    }
    return (
        <div className="list-wrap">
            {
                todos.length === 0 ? (<p>暂无代办事项</p>) : (
                    <List
                        itemLayout="horizontal"
                        dataSource={todos}
                        renderItem={({id, text, finished}, index) => {
                            const className1 = classnames({
                                "list-item": true,
                                "list-item__finished": finished
                            });
                            return(
                                <List.Item className={className1}>
                                    <div
                                        onClick={() => onToggleFinished(id)}
                                        className="list-item-wrap"
                                    > 
                                        <span classnames="list-item-title">{text}</span>
                                        <DeleteOutlined onClick={onDelete}/>
                                    </div>
                                </List.Item>
                            )
                        }}
                    />
                )

            }
        </div>
    )
}

export default TodoList;