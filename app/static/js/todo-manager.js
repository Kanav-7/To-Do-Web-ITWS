var todoManager = (function () {
    var markDone = function() {
        id = $(this).data('id');
        $.ajax({
            method: 'post',
            url: '/api/todo/' + id + '/done',
            success: function(res) {
                listAll();
            }
        })
    }

    var listAll = function () {
        $.ajax({
            method: 'get',
            url: '/api/todo',
            success: function(res) {
                console.log(res.todos);
                viewManager.render('todos-list', {
                    todos: res.todos,
                }, function($view) {
                    $view.find(".mark-as-done").click(markDone);
                });
            },
            error: function(res) {
                if (res.status == 401) {
                    console.log("Need login");
                    authManager.showLogin();
                }
            }
        });
    };

    var create = function () {
        viewManager.render('todo', {
            formAction: '/api/todo',
        }, function ($view) {
            console.log($view);
            $view.submitViaAjax(function (response) {
                allTodos.push(response.todo);
                page('/');
            });
        });
    };

    var listOne = function (id) {
        console.log(id);
        $.ajax({
            method: 'get',
            url: '/api/todo',
            success: function(res) {
                console.log(res.todos[0]);
                viewManager.render('todo', res.todos[0]);
            }
        })
    };

    var tManager = {};
    tManager.listAll = listAll;
    tManager.listOne = listOne;
    tManager.create = create;
    return tManager;
})();
