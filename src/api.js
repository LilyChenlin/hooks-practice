const todoList = [
    {
        id : 1,
        text: "todo1",
        finished: true
    },
    {
        id: 2,
        text: "todo2",
        finished: false
    },
    {
        id: 3,
        text: "todo3",
        finished: true
    },
    {
        id: 4,
        text: "todo4",
        finished: false
    },
    {
        id: 5,
        text: "todo5",
        finished: false
    }
];

// new Promise 会生成一个promise实例
const delay = time => {
    new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}


// 将传入的函数延迟一秒执行
const withDelay = fn => 
    async (...args) => {
        await delay(1000); // 延迟一秒后返回成功的promise指令，执行下面的函数
        return fn(...args);
    }

export const fetchTodos = withDelay(params => {
    const {query, tab} = params;
    let result = todoList;

    // 根据选择Tab进行分类
    if(tab) {
        switch (tab) {
            case "finished":
                result = todoList.filter(item => item.finished === true);
                break;
            case "unfinished":
                result = todoList.filter(item => item.finished === false);
                break;
            default:
                break;
        }
    }

    // 根据查询参数返回TodoList
    if (query) {
        result = todoList.filter(item => item.text.includes(query))
    }

    return Promise.resolve({
        tab,
        result
    })
})


export const addTodo = withDelay(todo => {
    todoList.push(todo)
    return Promise.resolve(true)
})

export const toggleTodo = withDelay(id => {debugger
    const todoCurIndex = todoList.findIndex(({id: todoId}) => id === todoId);
    // 如果这个Todo
    if (todoCurIndex !== -1) {
        const todo = todoList[todoCurIndex];
        const newTodo = {
            ...todo,
            finished: !todo.finished
        };
        // 删除todoCurIndex的一个元素，并在这个位置添加newTodo
        todoList.splice(todoCurIndex, 1, newTodo)
    }

    return Promise.resolve(true)
})

