import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Spin, Tabs} from 'antd';
import TodoInput from './todoInput';
import TodoList from './todoList';
import {fetchTodos, toggleTodo} from './api';
import {useRequest, useWithLoading} from './hooks';

import "antd/dist/antd.css";
import  "./style/reset.css"
import  "./style/style.css";
const { TabPane } = Tabs;

interface StringsOnly {
    [index: string]: string;
}

const TAB_ALL = 'all';
const TAB_FINISHED = 'finished';
const TAB_UNFINISHED = 'unfinished';
const tabMap : StringsOnly = {
    [TAB_ALL]: '全部',
    [TAB_FINISHED]: '已完成',
    [TAB_UNFINISHED]: '未完成'
}

function App() {
    const [activeTab, setActiveTab] = useState(TAB_ALL);
    const [query, SetQuery] = useState('');
    const [placeholder, setPlaceholder] = useState('');

    const todoResult = useRequest(() => {
        return fetchTodos({query, tab: activeTab});
    }, [query, activeTab]);
    const {
        data: todoList,
        loading: listLoading
    } = todoResult;
    let todos = (todoList as any).result || []

    
    useEffect(() => {
        setPlaceholder(`在${tabMap[activeTab]}内搜索`);
    }, [activeTab])

    // 完成切换toggleTodo逻辑
    const {
        func: onToggleFinished,
        loading: toggleLoading
    } = useWithLoading(
        async id => {
            await toggleTodo(id)
        }
    )

    // !! 将非布尔值转为布尔值
    const loading = !!listLoading || !!toggleLoading;
    return(
        <>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab={tabMap[TAB_ALL]} key={TAB_ALL}></TabPane>
                <TabPane tab={tabMap[TAB_FINISHED]} key={TAB_FINISHED}></TabPane>
                <TabPane tab={tabMap[TAB_UNFINISHED]} key={TAB_UNFINISHED}></TabPane>
            </Tabs>
            <div className="app-wrap">
                <h1 className="app-title">Todo List</h1>
                <TodoInput placeholder={placeholder} onSetQuery={SetQuery}></TodoInput>
                <Spin spinning={loading} tip="waiting·····">
                    <TodoList todos={todos} onToggleFinished={onToggleFinished}></TodoList>
                </Spin>
                
            </div>
        </>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
